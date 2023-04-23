const express = require('express')
const{
    getInstallments,
    getInstallment,
    createInstallment,
    deleteInstallment,
    updateInstallment,

    getUserInstallment, 
} = require( '../controllers/installmentController')

const router = express.Router()

//GET all installments
router.get('/', getInstallments)

//GET a single installment 
//router.get('/:id', getInstallment)


//POST a new installment
router.post('/', createInstallment )

//DELETE a installment 
router.delete('/:id', deleteInstallment)

//UPDATE a installment 
router.patch('/:id', updateInstallment)



//GET installments for a specific user
router.get('/:user', getUserInstallment)

module.exports = router