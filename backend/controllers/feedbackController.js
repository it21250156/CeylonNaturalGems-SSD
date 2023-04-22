const Feedback = require('../models/feedbackModel')
const mongoose = require('mongoose')

//get all feedbacks
const getFeedbacks = async (req, res) => {

    const feedbacks = await Feedback.find({}).sort({createdAt: -1})

    res.status(200).json(feedbacks)
}

//get a single feedback
const getFeedback = async (req, res) => {
 
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error: 'No such Feedback'})
    }

    const feedback = await Feedback.findById(id)

    if(!feedback) {
        return res.status(404).json({error: 'No such feedback'})
    }

    res.status(200).json(feedback)
}

//create a new feedback
const createFeedback = async (req,res) => {

    const{gemType, gemQty, fbInfo, rating} = req.body

    let emptyFields = []

    if(!gemType) {
      emptyFields.push('gemType')
    }
    if(!gemQty) {
      emptyFields.push('gemQty')
    }
    if(!fbInfo) {
      emptyFields.push('fbInfo')
    }
    if(!rating) {
      emptyFields.push('rating')
    }
    if(emptyFields.length > 0){
      return res.status(400).json({error: 'Please fill in all the fields', emptyFields})

    }

    //add doc to DB
    try{

        const feedback = await Feedback.create({gemType, gemQty, fbInfo, rating})
        res.status(200).json(feedback)

    }catch(error){

        res.status(400).json({error: error.message})
    }

}


//delete a feedback
const deleteFeedback = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){

    return res.status(404).json({error: 'No such Feedback'})
  }

  const feedback = await Feedback.findOneAndDelete({_id: id})

  if(!feedback) {
    return res.status(400).json({error: 'No such feedback'})
  }

  res.status(200).json(feedback)

  

}

//update a feedback
const updateFeedback = async(req, res) => {
    const { id } = req.params
    console.log(req.body.reply)

  if(!mongoose.Types.ObjectId.isValid(id)){

    return res.status(404).json({error: 'No such Feedback'})
  }

  const feedback = await Feedback.findOneAndUpdate({_id: id}, {
    ...req.body
  },{new:true})
  
  if(!feedback) {
    return res.status(400).json({error: 'No such feedback'})
  }

  res.status(200).json(feedback)


}

module.exports = {

    getFeedbacks,
    getFeedback,
    createFeedback,
    deleteFeedback,
    updateFeedback
}