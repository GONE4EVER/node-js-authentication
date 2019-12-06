const User = require('@/models/user');


const doesUserExist = async (req, res, next) => {
  const { error, user } = req.body;

  if (error) {
    return next();
  }

  try {
    const userData = await User
      .findOne({ email: user.email })
      .lean()
      .populate('tokens');

    if (!userData) {
      req.body.existingUser = null;

      return next();
    }

    req.body.existingUser = userData;

    return next();
  } catch (err) {
    req.body.error = err;
    return next();
  }
};


module.exports = doesUserExist;
