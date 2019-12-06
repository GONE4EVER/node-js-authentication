const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const passport = require('passport');

// Import Routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const tokenRoute = require('./routes/token');

// DB Connection
mongoose.set('useFindAndModify', false);
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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost: 8000');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Accept, If-Modified-Since, ETag, Authorization'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, PATCH, OPTIONS'
  );

  res.type('json');

  next();
});

app.use(cookieParser('secret'));
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/posts', postsRoute);
app.use('/token', tokenRoute);

// Error handling middleware
// eslint-disable-next-line
app.use((error, req, res, next) => {
  res.status(400).send({ error });
});


module.exports = app;
