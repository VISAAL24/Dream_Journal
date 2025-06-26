import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import dreamRoutes from './routes/dreamRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://dream-journal-2qbe.vercel.app'
  ],
  credentials: true
}));

// Debug: Log loaded routes
console.log('Loaded authRoutes:', typeof authRoutes);
console.log('Loaded dreamRoutes:', typeof dreamRoutes);

// Routes
app.use('/api/auth', authRoutes); // Handles /api/auth/login, /api/auth/register
app.use('/api/dreams', dreamRoutes); // Handles /api/dreams

app.get('/api/test', (req, res) => {
  res.json({ status: 'ok' });
});

// Database Connection and Server Start
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });