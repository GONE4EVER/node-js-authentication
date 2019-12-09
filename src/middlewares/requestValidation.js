
// Validation Schemas
const { schemas } = require('@/validation/schemas');

// Error constants
const { INVALID_REQUEST_BODY } = require('@/constants/errors');


const requestValidation = (schemaType) => (req, res, next) => {
  try {
    if (!req.body || !req.body.user) {
      throw new Error(INVALID_REQUEST_BODY);
    } else {
      const { user } = req.body;

      const { error } = schemas[schemaType]
        .validate(user);

      if (error) {
        const [ details ] = error.details;
        throw new Error(details.message);
      }
    }

    return next();
  } catch ({ message }) {
    return next(message);
  }
};


module.exports = requestValidation;

