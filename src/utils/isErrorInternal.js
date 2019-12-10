const {
  names: { SERVER_INTERNAL_ERROR },
  types: { JSON_PARSE_ERROR_TYPE },
} = require('@/constants/errors');


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
const isErrorInternal = ({ name, type }) => name === SERVER_INTERNAL_ERROR
  || type === JSON_PARSE_ERROR_TYPE;


module.exports = isErrorInternal;
