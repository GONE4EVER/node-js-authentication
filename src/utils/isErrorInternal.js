const errors = require('@/constants/errors');

const nonProgramErrors = Object.values(errors);


/**
* * Is used for defining whether error is
* * external (e.g. in incoming data) and should be included
* * in response (without passing to logging system)
* * or internal (errors in code and while parsing) and should not be included
* * in response (with passing to logging system)
*
* @param error - Error object with two required fields
* @name and @message
*/
const isErrorInternal = (error) => {
  if (!error.name || nonProgramErrors.includes(error.name)) {
    return false;
  }

  return true;
};


module.exports = isErrorInternal;
