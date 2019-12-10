const bcrypt = require('bcryptjs');
const statusCodes = require('http-status');

// Models
const Token = require('@/models/token');
const User = require('@/models/user');

// Constants
const {
  messages: {
    USER_NOT_FOUND,
    WRONG_PASSWORD,
  },
} = require('@/constants/errors');

// Errors handling helper
const generateError = require('@/utils/generateError');

// TOKENS
const generateTokens = require('@/utils/generateTokens');
const getResponseWithAuth = require('@/utils/getResponseWithAuth');


const loginHandler = async (req, res, next) => {
  const { user } = req.body;
  const { existingUser } = req.locals;

  try {
    if (!existingUser) {
      res.status(statusCodes.NOT_FOUND);
      const error = generateError(USER_NOT_FOUND);
      throw error;
    }

    const { password: incomingPassword } = user;
    const {
      _id: userID,
      name,
      password: existingPassword,
      token: existingTokenID,
    } = existingUser;

    const isValid = await bcrypt
      .compare(incomingPassword, existingPassword);

    if (!isValid) {
      const error = generateError(WRONG_PASSWORD);
      throw error;
    }

    const [
      accessToken,
      refreshToken,
    ] = generateTokens({ _id: userID, name });

    // mongoose bug with "null _id creating"
    /* const result = await Token.findOneAndUpdate(
      { _id: existingTokenID },
      {
        access: accessToken,
        refresh: refreshToken,
      },
      {
        new: true,
        setDefaultsOnInsert: true,
        upsert: true,
        select: '_id',
      }
    );

    if (!existingTokenID) {
      await User.findByIdAndUpdate(
        userID, { token: result.tokenID }
      );
    } */

    if (!existingTokenID) {
      const { _id: tokenID } = await new Token({
        access: accessToken,
        refresh: refreshToken,
      }).save();

      await User.findByIdAndUpdate(userID, { token: tokenID });
    } else {
      await Token.findByIdAndUpdate(
        existingTokenID,
        { access: accessToken, refresh: refreshToken }
      );
    }

    const responseWithAuthCookies = getResponseWithAuth(
      res,
      [ accessToken, refreshToken ]
    );

    return responseWithAuthCookies.send({ _id: userID });
  } catch (error) {
    return next(error);
  }
};


module.exports = loginHandler;
