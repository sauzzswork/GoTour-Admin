const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a tour title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    destination: {
      type: String,
      required: [true, 'Please provide a destination'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide a start date'],
    },
    duration: {
      type: Number, // in days
      required: [true, 'Please provide duration'],
      min: [1, 'Duration must be at least 1 day'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    description: {
      type: String,
      default: 'Amazing tour experience',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tour', tourSchema);
