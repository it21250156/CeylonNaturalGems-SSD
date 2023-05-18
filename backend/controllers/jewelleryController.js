const Jewellery = require('../models/jewelleryModel')
const mongoose = require('mongoose');
const { response, json } = require('express');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// get all jewellery
const getJewelleryes = async (req, res) => {
  const jewelleryes = await Jewellery.find({}).sort({createdAt: -1})

  res.status(200).json(jewelleryes)
}


// get a single jewellery
const getJewellery = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such jewellery'})
  }

  const jewellery = await Jewellery.findById(id)

  if (!jewellery) {
    return res.status(404).json({error: 'No such jewellery'})
  }

  res.status(200).json(jewellery)
}

// // create a new jewellery
// const createJewellery = async (req, res) => {
//   const {name, type, gender, gemstone, metal, description, price} = req.body

//   // let emptyFields = []

//   // if(!name){
//   //   emptyFields.push('name')
//   // }

//   // if(!type){
//   //   emptyFields.push('type')
//   // }

//   // if(!gender){
//   //   emptyFields.push('gender')
//   // }

//   // if(!gemstone){
//   //   emptyFields.push('gemstone')
//   // }

//   // if(!metal){
//   //   emptyFields.push('metal')
//   // }

//   // if(!description){
//   //   emptyFields.push('description')
//   // }

//   // if(!price){
//   //   emptyFields.push('price')
//   // }
  
//   // if(emptyFields.length > 0){
//   //   return res.status(400).json({error: 'Please fill in all the required fields', emptyFields})
//   // }

//   // add to the database
//   try {
//     const jewellery = await Jewellery.create({ name, type, gender, gemstone, metal, description, price })
//     res.status(200).json(jewellery)
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// }

const createJewellery = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new gem
    const jewellery = await Jewellery.create({
      name: req.body.name,
      type: req.body.type,
      gender: req.body.gender,
      gemstone: req.body.gemstone,
      metal: req.body.metal,
      price: req.body.price,
      description: req.body.description,
      jewellery_img: result.secure_url,
      cloudinary_id: result.public_id
    });

    res.status(200).json(jewellery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a jeewellery
const deleteJewellery = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such jewellery' });
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such jewellery' });
  }

  try {
    // Find gem by id
    let jewellery = await Jewellery.findById(id);

    if (!jewellery) {
      return res.status(404).json({ error: 'No such jewellery' });
    }

    // Delete previous image from Cloudinary
    await cloudinary.uploader.destroy(jewellery.cloudinary_id);

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Update gem data
    jewellery.name = req.body.name || jewellery.name;
    jewellery.type = req.body.type || jewellery.type;
    jewellery.gender = req.body.gender || jewellery.gender;
    jewellery.metal = req.body.metal || jewellery.metal;
    jewellery.price = req.body.price || jewellery.price;
    jewellery.gemstone = req.body.gemstone || jewellery.gemstone;
    jewellery.description = req.body.description || jewellery.description;
    jewellery.jewellery_img = result.secure_url || jewellery.jewellery_img;
    jewellery.cloudinary_id = result.public_id || jewellery.cloudinary_id;

    // Save updated gem
    jewellery = await jewellery.save();

    res.status(200).json(jewellery);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getJewelleryes,
  getJewellery,
  createJewellery,
  deleteJewellery,
  updateJewellery
}