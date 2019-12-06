const router = require('express').Router();
const jwt = require('jsonwebtoken');

// Models
const User = require('@/models/user');

// TOKENS
const generateTokens = require('@/utils/generateTokens');


const { REFRESH_TOKEN_SECRET } = process.env;

/*
TODO: add refresh token comparison with the one from DB
*/

router.get('/', async (req, res) => {
  if (!req.signedCookies) {
    res.redirect('/login');
  }

  const {
    refresh_token: tokenFromCookies,
  } = req.signedCookies;

  const refreshTokenVerified = jwt.verify(
    tokenFromCookies,
    REFRESH_TOKEN_SECRET
  );

  if (!refreshTokenVerified) {
    return res.redirect('/login');
  }

  const { _id: userID, name } = refreshTokenVerified;

  const [
    accessToken,
    refreshToken,
  ] = generateTokens({ _id: userID, name });

  return res.send({
    accessToken,
    refreshToken,
  });
});


module.exports = router;
