const express = require('express')
const {
  getJewelleryes, 
  getJewellery, 
  createJewellery, 
  deleteJewellery, 
  updateJewellery,
 
} = require('../controllers/jewelleryController')

const router = express.Router()

// GET all jewellery
router.get('/', getJewelleryes)



// GET a single jewellery
router.get('/:id', getJewellery)

// POST a new jewellery
router.post('/', createJewellery)

// DELETE a jewellery
router.delete('/:id', deleteJewellery)

// UPDATE a jewellery
router.patch('/:id', updateJewellery)

module.exports = router