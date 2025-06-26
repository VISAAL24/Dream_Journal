import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // adjust path if needed

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username.length > 15) {
    return res.status(400).json({ message: 'Username must be at most 15 characters' });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  const { password: pwd, ...userWithoutPassword } = user.toObject();
  res.json({ token, user: userWithoutPassword });
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username.length > 15) {
      return res.status(400).json({ message: 'Username must be at most 15 characters' });
    }
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user (make sure to use the hashed password and include email)
    const user = await User.create({ username, email, password: hashedPassword });
    // Create JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    // Exclude password from user object
    const { password: pwd, ...userWithoutPassword } = user.toObject();
    res.status(201).json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: err.message || 'Registration failed' });
  }
});

router.get('/test', (req, res) => {
  res.json({ status: 'authRoutes loaded' });
});

router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

export default router;