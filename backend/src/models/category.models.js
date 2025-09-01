const mongoose = require('mongoose');

// Define the schema for Category
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // optional, if you want each category name unique
    trim: true
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

// Create and export the model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
