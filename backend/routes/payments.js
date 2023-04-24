const express = require('express')
const {
    createPayment,
    getPayment,
    getPayments,
    deletePayment,
    updatePayment
} = require('../controllers/paymentController')

const router = express.Router()

//GET all payments
router.get('/' , getPayments)

//GET a single payment
router.get('/:id' , getPayment)

//POST a new payment
router.post('/' , createPayment)

//DELETE a payment
router.delete('/:id' , deletePayment)

//UPDATE a payment
router.patch('/:id' , updatePayment)
 
module.exports = router