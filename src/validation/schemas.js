const Joi = require('@hapi/joi');


const schemaNames = {
  register: 'register',
  login: 'login',
};

// User auth schema
const registerSchema = Joi.object({
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

// User login schema
const loginSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});


module.exports = {
  schemas: {
    [schemaNames.register]: registerSchema,
    [schemaNames.login]: loginSchema,
  },
  schemaNames,
};

