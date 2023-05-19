const { default: mongoose } = require('mongoose');
const deletedUser = require('../models/deletedUsersModel');

const addDeletedUser = async(req , res) => {
    const{ userID ,title , userType , firstName , lastName , email, phone } = req.body

    //add data to db
    try{
        const dUser = await deletedUser.create({ userID , title , userType , firstName , lastName , email, phone })
        res.status(200).json(dUser)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//get all deleted users
const getDeletedUsers = async(req , res) => {
    const  deletedUsers =  await deletedUser.find({})

    res.status(200).json(deletedUsers)
}

// get single deleted user
const getDeletedUser = async(req , res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such dletedUser'})
    }

    const deletedUser = await deletedUser.findById(id)

    if(!deletedUser) {
        return res.status(404).json({error: 'No such dletedUser'})
    }

    res.status(200).json(deletedUser)
}

module.exports = {
    addDeletedUser,
    getDeletedUsers,
    getDeletedUser
}