const express = require('express')
const {
    getjwll,
    getjewell,
    getJewelleryByGender
} = require('../controllers/jwellController')

const router = express.Router()

//GET all jwells
router.get('/', getjwll)

//GET single jwells
router.get('/:id', getjewell)
//GET jwells by gender
router.get('/gender/:gender', getJewelleryByGender)

module.exports = router