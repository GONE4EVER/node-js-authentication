const bcrypt = require('bcryptjs');

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
const { authCookeisConfig } = require('@/constants/jwt');


const loginHandler = async (req, res, next) => {
  const { user } = req.body;
  const { existingUser } = req.locals;

  try {
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


    if (!token) {
      const { _id: tokenID } = await new Token({
        access: accessToken,
        refresh: refreshToken,
      }).save();

      await User.findByIdAndUpdate(userID, { token: tokenID });
    } else {
      await Token.findByIdAndUpdate(
        token,
        { access: accessToken, refresh: refreshToken }
      );
    }

    return res
      .status(200)
      .cookie(TOKEN_COOKIE, accessToken, authCookeisConfig)
      .cookie(REFRESH_TOKEN_COOKIE, refreshToken, authCookeisConfig)
      .send({ _id: userID });
  } catch ({ message }) {
    return next(message);
  }
};


module.exports = loginHandler;
