const Jewellery = require('../models/jewelleryModel')
const mongoose = require('mongoose');
const { response, json } = require('express');

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

// create a new jewellery
const createJewellery = async (req, res) => {
  const {name, type, gender, gemstone, metal, description, price} = req.body

  // let emptyFields = []

  // if(!name){
  //   emptyFields.push('name')
  // }

  // if(!type){
  //   emptyFields.push('type')
  // }

  // if(!gender){
  //   emptyFields.push('gender')
  // }

  // if(!gemstone){
  //   emptyFields.push('gemstone')
  // }

  // if(!metal){
  //   emptyFields.push('metal')
  // }

  // if(!description){
  //   emptyFields.push('description')
  // }

  // if(!price){
  //   emptyFields.push('price')
  // }
  
  // if(emptyFields.length > 0){
  //   return res.status(400).json({error: 'Please fill in all the required fields', emptyFields})
  // }

  // add to the database
  try {
    const jewellery = await Jewellery.create({ name, type, gender, gemstone, metal, description, price })
    res.status(200).json(jewellery)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a jewellery
const deleteJewellery = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such jewellery'})
  }

  const jewellery = await Jewellery.findOneAndDelete({_id: id})

  if (!jewellery) {
    return res.status(404).json({error: 'No such jewellery'})
  }

  res.status(200).json(jewellery)
}

// update a jewellery
const updateJewellery = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such jewellery'})
  }

  const jewellery = await Jewellery.findByIdAndUpdate({_id: id}, {
    ...req.body
  })

  if (!jewellery) {
    return res.status(404).json({error: 'No such jewellery'})
  }

  res.status(200).json(jewellery)
}

module.exports = {
  getJewelleryes,
  getJewellery,
  createJewellery,
  deleteJewellery,
  updateJewellery
}