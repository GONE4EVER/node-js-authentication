const router = require('express').Router();
const jwt = require('jsonwebtoken');

// Models
const User = require('@/models/user');
const Token = require('@/models/token');

// Auth helpers
const generateTokens = require('@/utils/generateTokens');
const getResponseWithAuth = require('@/utils/getResponseWithAuth');

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
      (err, decodedData) => {
        if (err) {
          const error = generateError(err.message);
          throw error;
        }

        return decodedData;
      });

    if (!refreshTokenVerified) {
      const error = generateError(INVALID_TOKEN);
      throw error;
    }

    const {
      _id,
    } = refreshTokenVerified;

    console.log(refreshTokenVerified);

    const {
      _id: userID,
      name,
      token: {
        _id: tokenID,
        refresh,
      },
    } = await User
      .findOne({ _id })
      .select('_id name token')
      .populate('token', '-__v');

    if (tokenFromCookies !== refresh) {
      const error = generateError(INVALID_TOKEN);
      throw error;
    }

    const [ accessToken, refreshToken ] = generateTokens({ _id: userID, name });

    await Token.findByIdAndUpdate(
      tokenID,
      { access: accessToken, refresh: refreshToken }
    );

    const response = getResponseWithAuth(res, [ accessToken, refreshToken ]);

    return response.send({
      accessToken, refreshToken,
    });
  } catch (error) {
    res.status(401);
    return next(error);
  }
});


module.exports = router;
