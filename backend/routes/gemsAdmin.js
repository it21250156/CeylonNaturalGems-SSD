const express = require('express')
const {
  getGems, 
  getGem, 
  createGem, 
  deleteGem, 
  updateGem
} = require('../controllers/gemController')

const router = express.Router()

// GET all gems
router.get('/', getGems)

// GET a single gem
router.get('/:id', getGem)

// POST a new gem
router.post('/', createGem)

// DELETE a gem
router.delete('/:id', deleteGem)

// UPDATE a gem
router.patch('/:id', updateGem)

module.exports = router