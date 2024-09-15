require("dotenv").config();
const nodemailer = require("nodemailer");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const passport = require('passport');
const session = require('express-session');
require('./passport-setup'); // Add this line
const authRoutes = require('./routes/authRoutes.js');


//Kalinga
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const deletedUserRoutes = require('./routes/deletedUserRoutes.js');
const userModel = require('./models/users.model.js');
const deletedUserModel = require('./models/deletedUsersModel.js')
// malika
const feedbackRoutes = require('./routes/feedbacks');

//janith
const gemRoutes = require('./routes/gems');
const cartRoutes = require('./routes/cartRoutes.js');

//Daham

//bimsara
const RequestModel = require('./models/RequestModel.js');
const ReplyModel = require('./models/Replies');

//Vidxni
const paymentRoutes = require('./routes/payments');

// Ruchira
const jewelleryRoutes = require('./routes/jewelleryes');

// vihangi
const planRoutes = require('./routes/plans');
const installmentsRoutes = require('./routes/installments');

//daham
const jwellRoutes = require('./routes/jewellers');

//ammaar
const gemAdminRoutes = require('./routes/gemsAdmin');

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Express session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and restore session
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

// routes

//malika
app.use('/api/feedbacks', feedbackRoutes);

//bimsara
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
  const { _id } = req?.params;
  RequestModel.find({ user: _id }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post('/createUser', async (req, res) => {
  const user = req.body;
  const newUser = new RequestModel(user);
  await newUser.save();
  res.json(user);
});

app.get('/getReply', (req, res) => {
  ReplyModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get('/getReply/:reqId', (req, res) => {
  const { reqId } = req?.params;
  ReplyModel.find({ reqId }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get('/getReplyByUser/:uid', (req, res) => {
  const { uid } = req?.params;
  RequestModel.find({ user: uid }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      result?.data?.map((r) => {
        ReplyModel.countDocuments({ reqId: r?._id }, (err, result2) => {
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

app.post('/createReply', async (req, res) => {
  const user = req.body;
  const newUser = new ReplyModel(user);
  await newUser.save();

  res.json(user);
});

app.put('/updateGshape', async (req, res) => {
  const newGemShape = req.body.newGemShape;
  const id = req.body.id;

  try {
    await RequestModel.findById(id, (err, updatedShape) => {
      updatedShape.GemShape = newGemShape;
      updatedShape.save();
      res.send('update');
    });
  } catch (err) {
    console.log(err);
  }
});

app.put('/updateGsCl', async (req, res) => {
  const newGemColour = req.body.newGemColour;
  const id = req.body.id;

  try {
    await RequestModel.findById(id, (err, updatedColor) => {
      updatedColor.GemColor = newGemColour;
      updatedColor.save();
      res.send('update');
    });
  } catch (err) {
    console.log(err);
  }
});

app.put('/updateDes', async (req, res) => {
  const newGemDescription = req.body.newGemDescription;
  const id = req.body.id;

  try {
    await RequestModel.findById(id, (err, updatedDescrition) => {
      updatedDescrition.Description = newGemDescription;
      updatedDescrition.save();
      res.send('update');
    });
  } catch (err) {
    console.log(err);
  }
});

// app.put('/updateWt', async (req, res) => {
//   const newGemWeight = req.body.newGemWeight;
//   const id = req.body.id;

//   try {
//     await UserModel.findById(id, (err, updatedWeight) => {
//       updatedWeight.Weight = newGemWeight;
//       updatedWeight.save();
//       res.send('update');
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

app.put('/updateQt', async (req, res) => {
  const newGemQuantity = req.body.newGemQuantity;
  const id = req.body.id;

  try {
    await RequestModel.findById(id, (err, updatedQuantity) => {
      updatedQuantity.Quantity = newGemQuantity;
      updatedQuantity.save();
      res.send('update');
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  await RequestModel.findByIdAndRemove(id).exec();
  res.send('deleted');
});

app.delete('/deleteReply/:id', async (req, res) => {
  const { id } = req.params;
  await ReplyModel.findByIdAndDelete(id);
  res.json({ message: 'Reply deleted successfully' });
});

app.put('/updateReply', async (req, res) => {
  const { _id, reply } = req.body;

  try {
    await ReplyModel.findById(_id, (err, upd) => {
      upd.reply = reply;
      upd.save();
      res.send('updated');
    });
  } catch (err) {
    console.log(err);
  }
});

//Kalinga
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/deletedusers', deletedUserRoutes);

app.get('/api/allCurrentAndDeletedUsers' , async (req , res ) => {
  try {
    const userData = await userModel.find();
    const deletedUserData = await deletedUserModel.find();
    res.json({userData,deletedUserData});
  } catch (error) {
    res.status(500).json({error: 'An error occurred'});
  }
})

//janith
app.use('/api/gems&jewelleries', gemRoutes);
app.use('/api/cart', cartRoutes);

//Vidxni
app.use('/api/payments', paymentRoutes);

// Ruchira
app.use('/api/jewelleryes', jewelleryRoutes);

// vihangi
app.use('/api/plans', planRoutes);
app.use('/api/installments', installmentsRoutes);

//daham

app.use('/api/jewells', jwellRoutes);
app.use('/api/jewelleryes', jwellRoutes);
// app.use('/api/jewelleryes', jwellRoutes);
// app.use("/api/jewelleryes", jwellRoutes);

//ammaar
app.use('/api/gems', gemAdminRoutes);

//routes

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;
