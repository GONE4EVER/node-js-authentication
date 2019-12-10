const statusCodes = require('http-status');

// Models
const User = require('@/models/user');


const doesUserExist = async (req, res, next) => {
  const { user } = req.body;

  try {
    const userData = await User
      .findOne({ email: user.email });

    req.locals = {
      existingUser: userData || null,
    };

    return next();
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST);
    return next(error);
  }
};


module.exports = doesUserExist;
