const Feedback = require('../models/feedbackModel')
const mongoose = require('mongoose')
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

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
const createFeedback = async (req, res) => {
  try {
    let feedbackData = {
      gemType: req.body.gemType,
      gemQty: req.body.gemQty,
      fbInfo: req.body.fbInfo,
      rating: req.body.rating,
      user: req.body.user
    };

    if (req.file) {
      // Upload image to Cloudinary if it exists
      const result = await cloudinary.uploader.upload(req.file.path);
      feedbackData.feedback_img = result.secure_url;
      feedbackData.cloudinary_id = result.public_id;
    }

    const feedback = await Feedback.create(feedbackData);
    res.status(200).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



//delete a feedback
const deleteFeedback = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(404).json({ error: 'No such Feedback' });
  }
  
  const feedback = await Feedback.findOneAndDelete({ _id: id });
  
  if (!feedback) {
  return res.status(400).json({ error: 'No such feedback' });
  }
  
  if (feedback.cloudinary_id) {
  await cloudinary.uploader.destroy(feedback.cloudinary_id);
  }
  
  res.status(200).json(feedback);
  };


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

//GET feedbacks for a specific user
const getUserFeedbacks = async (req, res) => {
  const {user} = req.params

  if(!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(404).json({error:'User Not Found',user})
  }

  const feedback = await Feedback.find({user:user})

  if (!feedback) {
      return res.status(404).json({error: 'No Feedbacks'})
  }
  
  res.status(200).json(feedback)
}


module.exports = {

    getFeedbacks,
    getFeedback,
    createFeedback,
    deleteFeedback,
    updateFeedback,

    getUserFeedbacks
}