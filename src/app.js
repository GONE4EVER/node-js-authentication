const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const statusCodes = require('http-status');

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
  const errorStatus = isInternal
    ? statusCodes.BAD_REQUEST
    : statusCodes.INTERNAL_SERVER_ERROR;

  /*
  * Checking wheather status code was already set
  * (code 200 is default)
  */
  if (res.statusCode === statusCodes.OK) {
    res.status(errorStatus);
  }

  if (!isInternal) {
  /* eslint no-console: 0 */
    console.error(`${'!!!!'.bgRed}${`${error}`.red}${'!!!!'.bgRed}`);
    console.error(`${error.stack}`.red);

    return res.send({ error: 'Internal error has occured' });
  }

  return res.send({
    error: error.message,
    type: error.type,
  });
});


module.exports = app;
