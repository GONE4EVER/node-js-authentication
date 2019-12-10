const { names: { SERVER_INTERNAL_ERROR } } = require('@/constants/errors');

const generateError = (message) => {
  const error = new Error(message);
  error.name = SERVER_INTERNAL_ERROR;

  return error;
};


module.exports = generateError;

