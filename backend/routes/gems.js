const express = require('express')
const {
    getGems,
    getGem
} = require('../controllers/gemController')

const router = express.Router()

//GET all gems
router.get('/gems', getGems)

//GET single gem
router.get('/gems/:id', getGem)

module.exports = router