const Gem = require('../models/gemModel');
const mongoose = require('mongoose');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const validator = require('validator'); // Validator for input sanitization
const winston = require('winston'); // Logger for better error handling

// get all gems
const getGems = async (req, res) => {
  try {
    const gems = await Gem.find({}).sort({ createdAt: -1 });
    res.status(200).json(gems);
  } catch (error) {
    winston.error(error.message, error); // Log error without exposing details
    res.status(500).json({ error: 'Server error' });
  }
};

// get a single gem
const getGem = async (req, res) => {
  const { id } = req.params;

  // Validate ID to prevent NoSQL injection
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid ID' });
  }

  try {
    const gem = await Gem.findById(id);

    if (!gem) {
      return res.status(404).json({ error: 'No such gem' });
    }

    res.status(200).json(gem);
  } catch (error) {
    winston.error(error.message, error);
    res.status(500).json({ error: 'Server error' });
  }
};

// create a new gem
const createGem = async (req, res) => {
  try {
    // Validate inputs using validator library
    if (
      !validator.isNumeric(req.body.size) ||
      !validator.isNumeric(req.body.price) ||
      !validator.isNumeric(req.body.quantity)
    ) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new gem with validated inputs
    const gem = await Gem.create({
      name: validator.escape(req.body.name),
      type: validator.escape(req.body.type),
      shape: validator.escape(req.body.shape),
      size: req.body.size,
      price: req.body.price,
      color: validator.escape(req.body.color),
      quantity: req.body.quantity,
      description: validator.escape(req.body.description),
      gem_img: result.secure_url,
      cloudinary_id: result.public_id
    });

    res.status(200).json(gem);
  } catch (error) {
    winston.error(error.message, error);
    res.status(400).json({ error: 'Error creating gem' });
  }
};

// delete a gem
const deleteGem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid ID' });
  }

  try {
    const gem = await Gem.findById(id);

    if (!gem) {
      return res.status(404).json({ error: 'No such gem' });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(gem.cloudinary_id);

    // Delete gem from the database
    await gem.remove();

    res.status(200).json(gem);
  } catch (err) {
    winston.error(err.message, err);
    res.status(500).json({ error: 'Server error' });
  }
};

// update gem
const updateGem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid ID' });
  }

  try {
    let gem = await Gem.findById(id);

    if (!gem) {
      return res.status(404).json({ error: 'No such gem' });
    }

    if (req.file && req.file.path) {
      // Delete previous image from Cloudinary
      await cloudinary.uploader.destroy(gem.cloudinary_id);

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Update gem with sanitized input
      gem.name = validator.escape(req.body.name) || gem.name;
      gem.type = validator.escape(req.body.type) || gem.type;
      gem.shape = validator.escape(req.body.shape) || gem.shape;
      gem.size = req.body.size || gem.size;
      gem.price = req.body.price || gem.price;
      gem.color = validator.escape(req.body.color) || gem.color;
      gem.quantity = req.body.quantity || gem.quantity;
      gem.description = validator.escape(req.body.description) || gem.description;
      gem.gem_img = result.secure_url || gem.gem_img;
      gem.cloudinary_id = result.public_id || gem.cloudinary_id;
    } else {
      // Update gem without changing the image
      gem.name = validator.escape(req.body.name) || gem.name;
      gem.type = validator.escape(req.body.type) || gem.type;
      gem.shape = validator.escape(req.body.shape) || gem.shape;
      gem.size = req.body.size || gem.size;
      gem.price = req.body.price || gem.price;
      gem.color = validator.escape(req.body.color) || gem.color;
      gem.quantity = req.body.quantity || gem.quantity;
      gem.description = validator.escape(req.body.description) || gem.description;
    }

    gem = await gem.save();

    res.status(200).json(gem);
  } catch (err) {
    winston.error(err.message, err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getGems,
  getGem,
  createGem,
  deleteGem,
  updateGem
};
