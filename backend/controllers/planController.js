const Plan = require('../models/planModel')
const mongoose = require('mongoose')

//get all plans
const getPlans = async (req, res) => {
    const plans = await Plan.find({}).sort( {month: -1})

    res.status(200).json(plans)
}

//get a single plan
const getPlan = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such plan'})
    }

    const plan = await Plan.findById(id)

    if (!plan) {
        return res.status(404).json({error: 'No such plan'})
    }
    
    res.status(200).json(plan)
}

//create a new plan
const createPlan = async (req, res) => {
    const{ name, months, initialPayment } = req.body

    //add doc to db
    try{
        const plan = await Plan.create({ name, months, initialPayment })
        res.status(200).json(plan)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//delete a plan
const deletePlan = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such plan'})
    }

    const plan = await Plan.findOneAndDelete({_id: id})

    if (!plan) {
        return res.status(404).json({error: 'No such plan'})
    }
    
    res.status(200).json(plan)
}

//update a plan
const updatePlan = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such plan'})
    }

    const plan = await Plan.findOneAndUpdate({_id: id} , {
        ...req.body
    })

    if (!plan) {
        return res.status(404).json({error: 'No such plan'})
    }
    
    res.status(200).json(plan)
}



module.exports = {
    getPlans,
    getPlan,
    createPlan,
    deletePlan,
    updatePlan
}
