const express = require('express');
const upload = require("../utils/multer");
const {
  getGems,
  getGem,
  createGem,
  deleteGem,
  updateGem
} = require('../controllers/gemController');
const { protect } = require('../middleware/authMiddleware'); // Correct JWT authentication middleware

const router = express.Router();

// Apply JWT authentication for protected routes
router.get('/', protect, getGems);
router.get('/:id', protect, getGem);
router.post('/', protect, upload.single("image"), createGem);
router.delete('/:id', protect, deleteGem);
router.patch('/:id', protect, upload.single("image"), updateGem);

module.exports = router;
