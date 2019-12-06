const router = require('express').Router();

// Validation schemas names
const { schemaNames } = require('@/validation/schemas');

// Validation middlewares
const doesUserExist = require('@/middlewares/doesUserExist');
const requestValidation = require('@/middlewares/requestValidation');

// Route middlewares
const registerHandler = require('./register');
const loginHandler = require('./login');


router.post(
  '/register',
  requestValidation(schemaNames.register),
  doesUserExist,
  registerHandler
);

router.post(
  '/login',
  requestValidation(schemaNames.login),
  doesUserExist,
  loginHandler
);


module.exports = router;
