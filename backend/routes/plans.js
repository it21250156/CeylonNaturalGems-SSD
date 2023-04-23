const express = require('express')
const{
    createPlan,
    getPlans,
    getPlan,
    deletePlan,
    updatePlan,
} = require( '../controllers/planController')

const router = express.Router()

//GET all plans
router.get('/', getPlans)


//GET a single plan 
router.get('/:id', getPlan)

//POST a new plan
router.post('/', createPlan )

//DELETE a plan 
router.delete('/:id', deletePlan)

//UPDATE a plan 
router.patch('/:id', updatePlan)

module.exports = router