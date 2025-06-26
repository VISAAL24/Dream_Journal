import Dream from '../models/Dream.js';

export const getDreams = async (req, res) => {
  try {
    const dreams = await Dream.find();
    res.json(dreams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDream = async (req, res) => {
  try {
    const dream = await Dream.create(req.body);
    res.status(201).json(dream);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};