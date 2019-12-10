
// Validation Schemas
const { schemas } = require('@/validation/schemas');

// Error handling
const generateError = require('@/utils/generateError');
const { messages: { INVALID_REQUEST_BODY } } = require('@/constants/errors');


const requestValidation = (schemaType) => (req, res, next) => {
  try {
    if (!req.body || !req.body.user) {
      const error = generateError(INVALID_REQUEST_BODY);
      throw error;
    } else {
      const { user } = req.body;

      const { error: validationError } = schemas[schemaType]
        .validate(user);

      if (validationError) {
        const [ detail ] = validationError.details;

        const error = generateError(detail.message);
        throw error;
      }
    }

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = requestValidation;

