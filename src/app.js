const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Import Routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const tokenRoute = require('./routes/token');

// Errors handling
const isErrorInternal = require('@/utils/isErrorInternal');

// DB Connection
mongoose.set('useFindAndModify', false);
mongoose.connect(
  process.env.MONGO_DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  // eslint-disable-next-line
  () => console.log('Mongo connected'.magenta)
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

// Routes
app.use('/api/user', authRoute);
app.use('/posts', postsRoute);
app.use('/token', tokenRoute);

// Error handling middleware
// eslint-disable-next-line
app.use((error, req, res, next) => {
  const isInternal = isErrorInternal(error);
  const errorStatus = isInternal ? 500 : 400;

  /*
  * Checking wheather status code was already set
  * (code 200 is default)
  */
  if (res.statusCode !== 200) {
    res.status(errorStatus);
  }

  if (isInternal) {
    console.log('---------------------------!!!!---------------------------'.bgRed);
    console.log(`${error}`.red);
    console.log('---------------------------!!!!---------------------------'.bgRed);
  }

  return res.send({ error });
});


module.exports = app;
