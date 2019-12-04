const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');

// Import Routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');


// DB Connection
mongoose.connect(
  process.env.MONGO_DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  // eslint-disable-next-line
  () => console.log('Mongo connected')
);

const app = express();

// Middlewares
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/posts', postsRoute);

// Error handling middleware
// eslint-disable-next-line
app.use((error, req, res, next) => {
  res.status(400).send({ error });
});


module.exports = app;
