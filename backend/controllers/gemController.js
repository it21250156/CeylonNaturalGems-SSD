const Gem = require('../models/gemModel');
const mongoose = require('mongoose');
const { response, json } = require('express');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// get all gems
const getGems = async (req, res) => {
  const gems = await Gem.find({}).sort({ createdAt: -1 });

  res.status(200).json(gems);
};

// get a single gem
const getGem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such gem' });
  }

  const gem = await Gem.findById(id);

  if (!gem) {
    return res.status(404).json({ error: 'No such gem' });
  }

  res.status(200).json(gem);
};

// create a new gem
const createGem = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new gem
    const gem = await Gem.create({
      name: req.body.name,
      type: req.body.type,
      shape: req.body.shape,
      size: req.body.size,
      price: req.body.price,
      color: req.body.color,
      quantity: req.body.quantity,
      description: req.body.description,
      gem_img: result.secure_url,
      cloudinary_id: result.public_id
    });

    res.status(200).json(gem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// delete a gem
const deleteGem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such gem' });
  }

  try {
    // Find gem by id
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
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

//Update Gems
const updateGem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such gem' });
  }

  try {
    // Find gem by id
    let gem = await Gem.findById(id);

    if (!gem) {
      return res.status(404).json({ error: 'No such gem' });
    }

    // Delete previous image from Cloudinary
    await cloudinary.uploader.destroy(gem.cloudinary_id);

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Update gem data
    gem.name = req.body.name || gem.name;
    gem.type = req.body.type || gem.type;
    gem.shape = req.body.shape || gem.shape;
    gem.size = req.body.size || gem.size;
    gem.price = req.body.price || gem.price;
    gem.color = req.body.color || gem.color;
    gem.quantity = req.body.quantity || gem.quantity;
    gem.description = req.body.description || gem.description;
    gem.gem_img = result.secure_url || gem.gem_img;
    gem.cloudinary_id = result.public_id || gem.cloudinary_id;

    // Save updated gem
    gem = await gem.save();

    res.status(200).json(gem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = updateGem;

module.exports = {
  getGems,
  getGem,
  createGem,
  deleteGem,
  updateGem
};