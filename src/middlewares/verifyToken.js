const jwt = require('jsonwebtoken');

// Constants
const { INVALID_TOKEN } = require('@/constants/errors');


const { TOKEN_SECRET } = process.env;
const JWT_EXPIRED_ERROR = 'jwt expired';

const verifyToken = (req, res, next) => {
  const {
    authorization: token,
  } = req.cookies;

  try {
    if (!token) {
      res.status(401);
      throw new Error(INVALID_TOKEN);
    }

    const tokenVerified = jwt.verify(token, TOKEN_SECRET, (err) => {
      if (err) {
        res.status(403);
        throw new Error(err.message);
      }
      return true;
    });

    req.body.isVerified = tokenVerified;

    return next();
  } catch ({ message }) {
    if (message === JWT_EXPIRED_ERROR) {
      return res.redirect('/token');
    }

    return res
      .status(403)
      .send({ message });
  }
};


module.exports = verifyToken;
