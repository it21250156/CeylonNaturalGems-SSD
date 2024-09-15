const Jewellery = require('../models/jewelleryModel');
const mongoose = require('mongoose');
const { response, json } = require('express');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const validator = require('validator');
const winston = require('winston');

// get all jewellery
const getJewelleryes = async (req, res) => {
  try {
    const jewelleryes = await Jewellery.find({}).sort({ createdAt: -1 });
    res.status(200).json(jewelleryes);
  } catch (error) {
    winston.error(error.message, error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// get a single jewellery
const getJewellery = async (req, res) => {
  const { id } = req.params;

  // Validate ID to prevent NoSQL injection
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid ID' });
  }
  try {
    const jewellery = await Jewellery.findById(id);
    if (!jewellery) {
      return res.status(404).json({ error: 'No such jewellery' });
    }
    res.status(200).json(jewellery);
  } catch (error) {
    winston.error(error.message, error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// create a new jewellery
const createJewellery = async (req, res) => {
  try {
    // Validate input
    if (!validator.isNumeric(req.body.price)) {
      return res.status(400).json({ error: 'Invalid price' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new gem with validated inputs
    const jewellery = await Jewellery.create({
      name: validator.escape(req.body.name),
      type: validator.escape(req.body.type),
      gender: validator.escape(req.body.gender),
      gemstone: validator.escape(req.body.gemstone),
      metal: validator.escape(req.body.metal),
      price: req.body.price,
      description: validator.escape(req.body.description),
      jewellery_img: result.secure_url,
      cloudinary_id: result.public_id,
    });

    res.status(200).json(jewellery);
  } catch (error) {
    winston.error(error.message, error);
    res.status(400).json({ error: 'Error creating a Jewellery' });
  }
};

// delete a jeewellery
const deleteJewellery = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid ID' });
  }

  try {
    // Find jewellery by id
    const jewellery = await Jewellery.findById(id);

    if (!jewellery) {
      return res.status(404).json({ error: 'No such jewellery' });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(jewellery.cloudinary_id);

    // Delete gem from the database
    await jewellery.remove();

    res.status(200).json(jewellery);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// update a jewellery
const updateJewellery = async (req, res) => {
  const { id } = req.params;

  // Validate ID to prevent NoSQL injection attacks
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid ID' });
  }

  try {
    // Find the jewellery by ID
    let jewellery = await Jewellery.findById(id);

    if (!jewellery) {
      return res.status(404).json({ error: 'No such jewellery' });
    }

    // Input validation for numeric fields (like price)
    if (req.body.price && !validator.isNumeric(req.body.price)) {
      return res.status(400).json({ error: 'Invalid price' });
    }

    // Delete previous image from Cloudinary if new image is uploaded
    if (req.file) {
      await cloudinary.uploader.destroy(jewellery.cloudinary_id);

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader
        .upload(req.file.path)
        .catch((err) => {
          throw new Error('Image upload failed');
        });

      // Update image fields in the jewellery model
      jewellery.jewellery_img = result.secure_url;
      jewellery.cloudinary_id = result.public_id;
    }

    // Update jewellery data with validated input
    jewellery.name = req.body.name
      ? validator.escape(req.body.name)
      : jewellery.name;
    jewellery.type = req.body.type
      ? validator.escape(req.body.type)
      : jewellery.type;
    jewellery.gender = req.body.gender
      ? validator.escape(req.body.gender)
      : jewellery.gender;
    jewellery.metal = req.body.metal
      ? validator.escape(req.body.metal)
      : jewellery.metal;
    jewellery.price = req.body.price || jewellery.price;
    jewellery.gemstone = req.body.gemstone
      ? validator.escape(req.body.gemstone)
      : jewellery.gemstone;
    jewellery.description = req.body.description
      ? validator.escape(req.body.description)
      : jewellery.description;

    // Save updated jewellery item
    jewellery = await jewellery.save();

    res.status(200).json(jewellery);
  } catch (error) {
    // Log error using winston for better tracking
    winston.error(error.message, error);
    res
      .status(500)
      .json({ error: 'Server error. Could not update jewellery.' });
  }
};

module.exports = {
  getJewelleryes,
  getJewellery,
  createJewellery,
  deleteJewellery,
  updateJewellery,
};
