const router = require('express').Router();
const jwt = require('jsonwebtoken');

// Models
const User = require('@/models/user');

// TOKENS
const generateTokens = require('@/utils/generateTokens');

// Constants
const { INVALID_TOKEN } = require('@/constants/errors');

const { REFRESH_TOKEN_SECRET } = process.env;


router.get('/', async (req, res, next) => {
  try {
    if (!req.cookies) {
      throw new Error(INVALID_TOKEN);
    }

    const {
      refresh_token: tokenFromCookies,
    } = req.cookies;

    const refreshTokenVerified = jwt.verify(
      tokenFromCookies,
      REFRESH_TOKEN_SECRET
    );

    if (!refreshTokenVerified) {
      throw new Error(INVALID_TOKEN);
    }

    const { _id: userID, name } = refreshTokenVerified;
    const userData = await User
      .findOne({ _id: userID })
      .select('_id name token')
      .populate('token', '-_id -__v');

    if (tokenFromCookies !== userData.token.refresh) {
      throw new Error(INVALID_TOKEN);
    }

    const [
      accessToken,
      refreshToken,
    ] = generateTokens({ _id: userID, name });

    return res.send({
      accessToken,
      refreshToken,
    });
  } catch ({ message }) {
    res.status(403);
    return next(message);
  }
});


module.exports = router;
