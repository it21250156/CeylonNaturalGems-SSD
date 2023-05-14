const Gem = require('../models/gemModel')
const mongoose = require('mongoose');
const { response, json } = require('express');

// get all gems
const getGems = async (req, res) => {
  const gems = await Gem.find({}).sort({createdAt: -1})

  res.status(200).json(gems)
}

// get a single gem
const getGem = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such gem'})
  }

  const gem = await Gem.findById(id)

  if (!gem) {
    return res.status(404).json({error: 'No such gem'})
  }

  res.status(200).json(gem)
}

// create a new gem
const createGem = async (req, res) => {
  const {name, type, shape, size, price, color, quantity, description} = req.body


  // add to the database
  try {
    const gem = await Gem.create({ name, type, shape, size, price, color, quantity, description })
    res.status(200).json(gem)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a gem
const deleteGem = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such gem'})
  }

  const gem = await Gem.findOneAndDelete({_id: id})

  if (!gem) {
    return res.status(404).json({error: 'No such gem'})
  }

  res.status(200).json(gem)
}

// update a gem
const updateGem = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such gem'})
  }

  const gem = await Gem.findByIdAndUpdate({_id: id}, {
    ...req.body
  })

  if (!gem) {
    return res.status(404).json({error: 'No such gem'})
  }

  res.status(200).json(gem)
}

module.exports = {
  getGems,
  getGem,
  createGem,
  deleteGem,
  updateGem
}