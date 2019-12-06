const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('@/models/user');
const Token = require('@/models/token');

// Constants
const {
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} = require('@/constants/errors');
const {
  TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} = require('@/constants/request');

// TOKENS
const generateTokens = require('@/utils/generateTokens');


const loginHandler = async (req, res, next) => {
  const {
    error,
    existingUser,
    user,
  } = req.body;

  try {
    if (error) {
      throw new Error(error);
    }
    if (!existingUser) {
      throw new Error(USER_NOT_FOUND);
    }

    const { password: incomingPassword } = user;
    const {
      _id: userID,
      name,
      password: existingPassword,
      token,
    } = existingUser;

    const isValid = await bcrypt
      .compare(incomingPassword, existingPassword);

    if (!isValid) {
      throw new Error(WRONG_PASSWORD);
    }

    const [
      accessToken,
      refreshToken,
    ] = generateTokens({ _id: userID, name });


    let tokenID;

    if (!token) {
      const { _id } = await new Token({
        access: accessToken,
        refresh: refreshToken,
      }).save();

      tokenID = _id;
    } else {
      const { _id } = await Token.findByIdAndUpdate(
        token,
        { access: accessToken, refresh: refreshToken }
      );

      tokenID = _id;
    }
    await User.findByIdAndUpdate(userID, { token: tokenID });

    const cookieConfig = {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      signed: true,
    };

    return res
      .status(200)
      .cookie(TOKEN_COOKIE, accessToken, cookieConfig)
      .cookie(REFRESH_TOKEN_COOKIE, refreshToken, cookieConfig)
      .send({ _id: userID });
  } catch ({ message }) {
    return next(message);
  }
};


module.exports = loginHandler;
