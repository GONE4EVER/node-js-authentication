const jwt = require('jsonwebtoken');

// Constants
const {
  messages: {
    INVALID_TOKEN,
    JWT_EXPIRED_ERROR,
  },
} = require('@/constants/errors');

// Error handling
const generateError = require('@/utils/generateError');


const { TOKEN_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const {
    authorization: token,
  } = req.cookies;

  try {
    if (!token) {
      const error = generateError(INVALID_TOKEN);
      throw error;
    }

    const tokenVerified = jwt.verify(token, TOKEN_SECRET, (err) => {
      if (err) {
        const error = generateError(err.message);
        throw error;
      }

      return true;
    });

    req.locals.isVerified = tokenVerified;

    return next();
  } catch (error) {
    if (error.message.includes(JWT_EXPIRED_ERROR)) {
      return res.redirect('/token');
    }

    return next(error);
  }
};


module.exports = verifyToken;
