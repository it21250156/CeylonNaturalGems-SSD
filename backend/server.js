require('dotenv').config();

const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');

//Kalinga
const userRoutes = require('./routes/userRoutes.js');

// malika
const feedbackRoutes = require('./routes/feedbacks')

//janith
const gemRoutes = require('./routes/gems');
const cartRoutes = require('./routes/cartRoutes.js');

//bimsara
const UserModel = require('./models/Users');

const ReplyModel = require('./models/reply');

//Vidxni
const paymentRoutes = require('./routes/payments')

// Ruchira
const jewelleryRoutes = require('./routes/jewelleryes');


// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes

//malika
app.use('/api/feedbacks',feedbackRoutes)

//bimsara
app.get('/getUsers', (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post('/createUser', async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
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

app.post('/createReply', async (req, res) => {
  const Reply = req.body;
  const newReply = new ReplyModel(Reply);
  await newReply.save();

  res.json(Reply);
});

app.put('/updateGshape', async (req, res) => {
  const newGemShape = req.body.newGemShape;
  const id = req.body.id;

  try {
    await UserModel.findById(id, (err, updatedShape) => {
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
    await UserModel.findById(id, (err, updatedColor) => {
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
    await UserModel.findById(id, (err, updatedDescrition) => {
      updatedDescrition.Description = newGemDescription;
      updatedDescrition.save();
      res.send('update');
    });
  } catch (err) {
    console.log(err);
  }
});

app.put('/updateWt', async (req, res) => {
  const newGemWeight = req.body.newGemWeight;
  const id = req.body.id;

  try {
    await UserModel.findById(id, (err, updatedWeight) => {
      updatedWeight.Weight = newGemWeight;
      updatedWeight.save();
      res.send('update');
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  await UserModel.findByIdAndRemove(id).exec();
  res.send('deleted');
});

//Kalinga
app.use('/api/users', userRoutes);

//janith
app.use('/api/gems&jewelleries', gemRoutes);
app.use('/api/cart', cartRoutes);

//Vidxni
app.use('/api/payments' , paymentRoutes)

// Ruchira
app.use('/api/jewelleryes', jewelleryRoutes);


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

  process.env
