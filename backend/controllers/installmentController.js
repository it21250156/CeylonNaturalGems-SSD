const Installment = require('../models/installmentModel')
const mongoose = require('mongoose')

//get all installments
const getInstallments = async (req, res) => {
    const installments = await Installment.find({})

    res.status(200).json(installments)
}

//get a single installment
const getInstallment = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such installment'})
    }

    const installment = await Installment.findById(id)

    if (!installment) {
        return res.status(404).json({error: 'No such installment'})
    }
    
    res.status(200).json(installment)
}

//create a new installment
const createInstallment = async (req, res) => {
    const{ user, gemID, monthlyPayment } = req.body

    //add doc to db
    try{
        // const user_id = req.user._id
        const installment = await Installment.create({ user, gemID, monthlyPayment })
        res.status(200).json(installment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//delete a installment
const deleteInstallment = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such installment'})
    }

    const installment = await Installment.findOneAndDelete({_id: id})

    if (!installment) {
        return res.status(404).json({error: 'No such installment'})
    }
    
    res.status(200).json(installment)
}

//update a intallment
const updateInstallment = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such installment'})
    }

    const installment = await Installment.findOneAndUpdate({_id: id} , {
        ...req.body
    })

    if (!installment) {
        return res.status(404).json({error: 'No such installment'})
    }
    
    res.status(200).json(installment)
}



/*****************************/

//GET installments for a specific user
const getUserInstallment = async (req, res) => {
    const {user} = req.params

    if(!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(404).json({error:'No such user'})
    }

    const installment = await Installment.find({user:user})

    if (!installment) {
        return res.status(404).json({error: 'No installments'})
    }
    
    res.status(200).json(installment)
}


module.exports = {
    getInstallments,
    getInstallment,
    createInstallment,
    deleteInstallment,
    updateInstallment,

    getUserInstallment
}
