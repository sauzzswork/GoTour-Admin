const express = require('express');
const Tour = require('../models/Tour');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tours (public)
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single tour (public)
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create tour (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, destination, price, startDate, duration, imageUrl, description } = req.body;

    // Validation
    if (!title || !destination || !price || !startDate || !duration || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const tour = new Tour({
      title,
      destination,
      price,
      startDate,
      duration,
      imageUrl,
      description: description || 'Amazing tour experience',
    });

    const savedTour = await tour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update tour (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, destination, price, startDate, duration, imageUrl, description } = req.body;

    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      {
        title,
        destination,
        price,
        startDate,
        duration,
        imageUrl,
        description,
      },
      { new: true, runValidators: true }
    );

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.json(tour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete tour (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
