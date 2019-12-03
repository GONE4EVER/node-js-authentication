const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');

// DB Connection
mongoose.connect(
  process.env.MONGO_DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => { console.log('Mongo connected'); }
);

const app = express();

// Import Routes
const authRoute = require('./routes/auth');


// Middlewares
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);


module.exports = app;
