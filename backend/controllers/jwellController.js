const Jewell = require('../models/jewelleryModel')
const Jewellw = require('../models/jewelleryModelW')
const mongoose = require('mongoose')

//get all gems
const getjwll = async(req,res) => {
    const Jewel = await Jewell.find({}).sort({ceratedAt: -1})

    res.status(200).json(Jewel)
}



//get a single gem
const getjewell = async (req,res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such jewellery"})
    }

    const Jwl = await Jewell.findById(id)

    if(!Jwl) {
        return res.status(404).json({error: 'No such jewellery'})
    }

    res.status(200).json(Jwl)
}

module.exports = {
    getjwll,
    getjewell
}