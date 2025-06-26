import express from 'express';
import { getDreams } from '../controllers/dreamController.js';
import { protect } from '../middlewares/authMiddleware.js';
import Dream from '../models/Dream.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getDreams)
  .post(async (req, res) => {
    try {
      const { title, description, date, mood, isLucid } = req.body;
      // Validate required fields
      if (!title || !description || !date) {
        return res.status(400).json({ message: 'Title, description, and date are required.' });
      }
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'User not authenticated.' });
      }
      // Parse and validate date
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format.' });
      }
      // Save dream
      const dream = new Dream({
        user: req.user._id,
        title,
        description,
        date: parsedDate,
        mood,
        isLucid
      });
      await dream.save();
      res.status(201).json({
        message: 'Dream saved',
        dream
      });
    } catch (err) {
      console.error('Error saving dream:', err);
      res.status(500).json({ message: err.message || 'Failed to save dream' });
    }
  });

export default router;