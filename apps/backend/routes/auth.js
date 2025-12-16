const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find admin (IMPORTANT FIX)
    const admin = await Admin
      .findOne({ email: email.toLowerCase() })
      .select('+password');

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2️⃣ Compare password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3️⃣ Generate token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
