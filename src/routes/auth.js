const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Validation schemas names
const { schemaNames } = require('@/validation/schemas');

// Models
const User = require('@/models/user');

// Validation middlewares
const doesUserExist = require('@/middlewares/doesUserExist');
const requestValidation = require('@/middlewares/requestValidation');

// Constants
const {
  USER_EXISTS,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} = require('@/constants/errors');
const { AUTH_HEADER } = require('@/constants/headers');


const { JWT_SECRET } = process.env;
const HASH_SALT = 10;
const TOKEN_EXPIRATION = '4h';

router.post(
  '/register',
  requestValidation(schemaNames.register),
  doesUserExist,
  async (req, res, next) => {
    const {
      error,
      existingUser,
      user,
    } = req.body;

    try {
      if (error) {
        throw new Error(JSON.stringify(error));
      } else if (existingUser) {
        throw new Error(USER_EXISTS);
      }

      const salt = await bcrypt.genSalt(HASH_SALT);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const userData = new User({
        ...user,
        password: hashedPassword,
      });

      const { _id } = await userData.save();

      return res
        .status(201)
        .send({
          data: { userID: _id },
        });
    } catch ({ message }) {
      return next(message);
    }
  }
);

router.post(
  '/login',
  requestValidation(schemaNames.login),
  doesUserExist,
  async (req, res, next) => {
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
      const { password: existingPassword, _id } = existingUser;

      const isValid = await bcrypt
        .compare(incomingPassword, existingPassword);

      if (!isValid) {
        throw new Error(WRONG_PASSWORD);
      }

      const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

      return res
        .status(200)
        .header(AUTH_HEADER, token)
        .send({ _id });
    } catch ({ message }) {
      return next(message);
    }
  }
);


module.exports = router;
