const bcrypt = require('bcryptjs');

// Models
const User = require('@/models/user');

// Constants
const {
  USER_EXISTS,
} = require('@/constants/errors');


const HASH_SALT = 10;

const registerHandler = async (req, res, next) => {
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

    const { _id: userID } = await userData.save();


    return res
      .status(201)
      .send({
        data: { userID },
      });
  } catch ({ message }) {
    return next(message);
  }
};


module.exports = registerHandler;
