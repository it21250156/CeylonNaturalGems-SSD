const mongoose = require('mongoose')

const Schema = mongoose.Schema

const feedbackSchema = new Schema({

    gemType:{
        type:String,
        required: true
    },
    
    gemQty: {

        type:Number,
        required: true
    },

    fbInfo: {

        type:String,
        required: true
    },

    rating: {

        type:Number,
        required: true
    },

    reply: {

        type:String,
        required: false
    },

    // user_id: {

    //     type:String,
    //     required: true
    // },

}, {timestamps: true})

module.exports = mongoose.model('Feedback', feedbackSchema)

