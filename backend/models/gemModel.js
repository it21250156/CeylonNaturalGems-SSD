const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  shape: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  gem_img: {
    type: String
  },
  cloudinary_id: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Gem', gemSchema);