const jwt = require('jsonwebtoken');


// Constants
const { AUTH_HEADER } = require('@/constants/headers');
const {
  ACCESS_DENIED,
  INVALID_TOKEN,
} = require('@/constants/errors');

const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.header(AUTH_HEADER);

  try {
    if (!token) {
      throw new Error(INVALID_TOKEN);
    }

    const tokenVerified = jwt.verify(token, JWT_SECRET, (err) => {
      if (err) {
        throw new Error(err.message);
      }
      return true;
    });

    if (!tokenVerified) {
      throw new Error(ACCESS_DENIED);
    }

    req.body.isVerified = tokenVerified;
    return next();
  } catch ({ message }) {
    return res
      .status(403)
      .send(message);
  }
};


module.exports = verifyToken;
