
// Validation Schemas
const { schemas } = require('@/validation/schemas');

// Error constants
const errors = require('@/constants/errors');


const requestValidation = (schemaType) => (req, res, next) => {
  if (!req.body || !req.body.user) {
    req.body = {
      error: errors.INVALID_REQUEST_BODY,
    };
  } else {
    const { user } = req.body;

    const { error } = schemas[schemaType]
      .validate(user);

    if (error) {
      const [ details ] = error.details;
      req.body.error = details.message;
    }
  }

  next();
};


module.exports = requestValidation;

