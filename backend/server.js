require('dotenv').config(); // Load environment variables from .env file
const nodemailer = require('nodemailer'); // Nodemailer for sending emails
const cors = require('cors'); // CORS middleware to handle cross-origin requests
const express = require('express'); // Express framework
const mongoose = require('mongoose'); // MongoDB ORM

// Importing routes for various functionalities
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const deletedUserRoutes = require('./routes/deletedUserRoutes.js');
const feedbackRoutes = require('./routes/feedbacks');
const gemRoutes = require('./routes/gems');
const cartRoutes = require('./routes/cartRoutes.js');
const paymentRoutes = require('./routes/payments');
const jewelleryRoutes = require('./routes/jewelleryes');
const planRoutes = require('./routes/plans');
const installmentsRoutes = require('./routes/installments');
const jwellRoutes = require('./routes/jewellers');
const gemAdminRoutes = require('./routes/gemsAdmin');

// Importing models
const userModel = require('./models/users.model.js');
const deletedUserModel = require('./models/deletedUsersModel.js');
const RequestModel = require('./models/RequestModel.js');
const ReplyModel = require('./models/Replies.js');

// Initialize express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Feedback route (Malika's feature)
app.use('/api/feedbacks', feedbackRoutes);

// Routes for managing requests and replies (Bimsara's feature)
app.get('/getUsers', (req, res) => {
  RequestModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get('/getUsersRequests/:_id', (req, res) => {
  const { _id } = req.params;
  RequestModel.find({ user: _id }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// Create a new user request
app.post('/createUser', async (req, res) => {
  const user = req.body;
  const newUser = new RequestModel(user);
  await newUser.save();
  res.json(user);
});

// Get all replies
app.get('/getReply', (req, res) => {
  ReplyModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// Get replies by request ID
app.get('/getReply/:reqId', (req, res) => {
  const { reqId } = req.params;
  ReplyModel.find({ reqId }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// Get replies by user ID
app.get('/getReplyByUser/:uid', (req, res) => {
  const { uid } = req.params;
  RequestModel.find({ user: uid }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      result?.data?.map((r) => {
        ReplyModel.countDocuments({ reqId: r._id }, (err, result2) => {
          if (err) {
            res.json(err);
          } else {
            res.json({ requests: result, replies: result2 });
          }
        });
      });
    }
  });
});

// Create a reply
app.post('/createReply', async (req, res) => {
  const user = req.body;
  const newUser = new ReplyModel(user);
  await newUser.save();
  res.json(user);
});

// Update gem shape by ID
app.put('/updateGshape', async (req, res) => {
  const newGemShape = req.body.newGemShape;
  const id = req.body.id;

  try {
    await RequestModel.findById(id, (err, updatedShape) => {
      updatedShape.GemShape = newGemShape;
      updatedShape.save();
      res.send('Updated');
    });
  } catch (err) {
    console.log(err);
  }
});

// Update gem color by ID
app.put('/updateGsCl', async (req, res) => {
  const newGemColour = req.body.newGemColour;
  const id = req.body.id;

  try {
    await RequestModel.findById(id, (err, updatedColor) => {
      updatedColor.GemColor = newGemColour;
      updatedColor.save();
      res.send('Updated');
    });
  } catch (err) {
    console.log(err);
  }
});

// Update gem description by ID
app.put('/updateDes', async (req, res) => {
  const newGemDescription = req.body.newGemDescription;
  const id = req.body.id;

  try {
    await RequestModel.findById(id, (err, updatedDescription) => {
      updatedDescription.Description = newGemDescription;
      updatedDescription.save();
      res.send('Updated');
    });
  } catch (err) {
    console.log(err);
  }
});

// Update gem quantity by ID
app.put('/updateQt', async (req, res) => {
  const newGemQuantity = req.body.newGemQuantity;
  const id = req.body.id;

  try {
    await RequestModel.findById(id, (err, updatedQuantity) => {
      updatedQuantity.Quantity = newGemQuantity;
      updatedQuantity.save();
      res.send('Updated');
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete a request by ID
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  await RequestModel.findByIdAndRemove(id).exec();
  res.send('Deleted');
});

// Delete a reply by ID
app.delete('/deleteReply/:id', async (req, res) => {
  const { id } = req.params;
  await ReplyModel.findByIdAndDelete(id);
  res.json({ message: 'Reply deleted successfully' });
});

// Update a reply
app.put('/updateReply', async (req, res) => {
  const { _id, reply } = req.body;

  try {
    await ReplyModel.findById(_id, (err, upd) => {
      upd.reply = reply;
      upd.save();
      res.send('Updated');
    });
  } catch (err) {
    console.log(err);
  }
});

// User management routes (Kalinga's feature)
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/deletedusers', deletedUserRoutes);

// Get all current and deleted users
app.get('/api/allCurrentAndDeletedUsers', async (req, res) => {
  try {
    const userData = await userModel.find();
    const deletedUserData = await deletedUserModel.find();
    res.json({ userData, deletedUserData });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Gem and jewelry management routes (Janith's and Ruchira's features)
app.use('/api/gems&jewelleries', gemRoutes);
app.use('/api/cart', cartRoutes);

// Payment management routes (Vidxni's feature)
app.use('/api/payments', paymentRoutes);

// Plan and installment routes (Vihangi's feature)
app.use('/api/plans', planRoutes);
app.use('/api/installments', installmentsRoutes);

// Jeweler management routes (Daham's feature)
app.use('/api/jewells', jwellRoutes);

// Admin routes for gem management (Ammar's feature)
app.use('/api/gems', gemAdminRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
