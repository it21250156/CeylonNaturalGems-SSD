const Gems = require('../models/gemModel')
const mongoose = require('mongoose')

//get all gems
const getGems = async(req,res) => {
    const gems = await Gems.find({}).sort({ceratedAt: -1})

    res.status(200).json(gems)
}



//get a single gem
const getGem = async (req,res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such gem"})
    }

    const gem = await Gems.findById(id)

    if(!gem) {
        return res.status(404).json({error: 'No such gem'})
    }

    res.status(200).json(gem)
}

module.exports = {
    getGems,
    getGem
}