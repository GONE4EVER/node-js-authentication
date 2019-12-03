// Validation
const Joi = require('@hapi/joi');

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

const validationMiddleware = (req, res, next) => {
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

module.exports = {
  validationMiddleware,
};
