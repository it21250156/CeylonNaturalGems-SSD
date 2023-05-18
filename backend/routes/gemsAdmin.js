const express = require('express');
const upload = require("../utils/multer");
const {
  getGems,
  getGem,
  createGem,
  deleteGem,
  updateGem
} = require('../controllers/gemController');

const router = express.Router();

// GET all gems
router.get('/', getGems);

// GET a single gem
router.get('/:id', getGem);

// POST a new gem
router.post('/', upload.single("image"), createGem);

// DELETE a gem
router.delete('/:id', deleteGem);

// UPDATE a gem
router.patch('/:id', upload.single("image"), updateGem);

module.exports = router

