const router = require('express').Router();
const jwt = require('jsonwebtoken');

// Models
const User = require('@/models/user');

// TOKENS
const generateTokens = require('@/utils/generateTokens');

// Error handling
const generateError = require('@/utils/generateError');

// Constants
const { messages: { INVALID_TOKEN } } = require('@/constants/errors');

const { REFRESH_TOKEN_SECRET } = process.env;


router.get('/', async (req, res, next) => {
  try {
    if (!req.cookies) {
      const error = generateError(INVALID_TOKEN);
      throw error;
    }

    const {
      refresh_token: tokenFromCookies,
    } = req.cookies;

    const refreshTokenVerified = jwt.verify(tokenFromCookies, REFRESH_TOKEN_SECRET,
      (err) => {
        if (err) {
          const error = generateError(err.message);
          throw error;
        }

        return true;
      });

    if (!refreshTokenVerified) {
      const error = generateError(INVALID_TOKEN);
      throw error;
    }

    const {
      _id: userID,
      name,
    } = refreshTokenVerified;
    const { token } = await User
      .findOne({ _id: userID })
      .select('_id name token')
      .populate('token', '-_id -__v');

    if (tokenFromCookies !== token.refresh) {
      const error = generateError(INVALID_TOKEN);
      throw error;
    }

    const [
      accessToken,
      refreshToken,
    ] = generateTokens({ _id: userID, name });

    return res.send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(401);
    return next(error);
  }
});


module.exports = router;
