// COMMON
const INVALID_REQUEST_BODY = 'Invalid request body defined';

// REGISTER
const USER_ALREADY_EXISTS = 'User Already Exists';

// LOGIN
const USER_NOT_FOUND = 'User not found';
const WRONG_PASSWORD = 'Wrong password';

// AUTHENTICATION
const ACCESS_DENIED = 'Access Denied';
const INVALID_TOKEN = 'Invalid token';
const JWT_ERROR = 'JsonWebTokenError';
const JWT_EXPIRED_ERROR = 'jwt expired';


const SERVER_INTERNAL_ERROR = 'SERVER_INTERNAL_ERROR';

const JSON_PARSE_ERROR_TYPE = 'entity.parse.failed';

module.exports = {
  messages: {
    INVALID_REQUEST_BODY,
    USER_ALREADY_EXISTS,
    USER_NOT_FOUND,
    WRONG_PASSWORD,
    ACCESS_DENIED,
    INVALID_TOKEN,
    JWT_ERROR,
    JWT_EXPIRED_ERROR,
  },
  names: {
    SERVER_INTERNAL_ERROR,
  },
  types: {
    JSON_PARSE_ERROR_TYPE,
  },
};

