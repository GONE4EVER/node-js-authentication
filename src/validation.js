const Joi = require('@hapi/joi');
const User = require('@/models/user');

const schema = Joi.object({
  name: Joi.string()
    .min(6)
    .required(),
  email: Joi.string()
    .min(6)
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

const requestValidation = (req, res, next) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const {
    value,
    error,
  } = schema.validate(req.body);

  if (error) {
    return res.status(400)
      .send({ errors: error.details });
  }

  req.data = value;
  return next();
};

const checkIfExists = async (req, res, next) => {
  const { data: userData } = req;

  const emailExists = await User
    .findOne({ email: userData.email });

  if (emailExists) {
    return res
      .status(400)
      .send('Already Exists');
  }

  return next();
};


module.exports = {
  requestValidation,
  checkIfExists,
};
