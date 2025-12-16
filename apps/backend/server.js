const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* =======================
   FIXED CORS CONFIG
   ======================= */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://go-tour-admin-frontend.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

/* ========= ROUTES ========= */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tours', require('./routes/tours'));

/* ========= HEALTH ========= */
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running' });
});

/* ========= DATABASE ========= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

/* ========= SERVER ========= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
