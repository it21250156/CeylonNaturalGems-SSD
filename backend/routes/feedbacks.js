const express = require('express')
const upload = require("../utils/multer");
const {
  createFeedback,
  getFeedback,
  getFeedbacks,
  deleteFeedback,
  updateFeedback,
  getUserFeedbacks

} = require('../controllers/feedbackController')
const Feedback = require('../models/feedbackModel')
const { json } = require('body-parser')
const router = express.Router()


//GET all feedbacks
router.get('/', getFeedbacks)

//GET a single feedback
router.get('/:id', getFeedback)

//GET feedbacks to a single user
router.get('/user/:user', getUserFeedbacks)

//POST a new feedback
router.post('/',upload.single("image"), createFeedback)

//DELETE a new feedback
router.delete('/:id', deleteFeedback)

//UPDATE a feedback
router.patch('/:id', updateFeedback)

module.exports = router