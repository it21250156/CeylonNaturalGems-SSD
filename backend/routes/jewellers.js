const express = require('express')
const {
    getjwll,
    getjewell
} = require('../controllers/jwellController')

const router = express.Router()

//GET all gems
router.get('/jewells', getjwll)

//GET single gem
router.get('/jewells/:id', getjewell)

module.exports = router