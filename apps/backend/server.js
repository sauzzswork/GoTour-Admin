const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* =======================
   CORRECT CORS CONFIG
   ======================= */
app.use(cors({
  origin: '*', // ✅ allow all origins (safe because JWT is used)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight
app.options('*', cors());

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
