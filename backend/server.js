require('dotenv').config()


const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes.js');

//janith
const gemRoutes = require('./routes/gems');

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

//kalinga
app.use('/api/users', userRoutes);

//janith
app.use('/api/gems&jewelleries', gemRoutes);

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
