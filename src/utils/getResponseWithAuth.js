const {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} = require('@/constants/request');

const { authCookeisConfig } = require('@/constants/jwt');


const getRequestWithAuth = (
  response,
  [ accessToken, refreshToken ],
  status
) => response.status(status || 200)
  .cookie(ACCESS_TOKEN_COOKIE, accessToken, authCookeisConfig)
  .cookie(REFRESH_TOKEN_COOKIE, refreshToken, authCookeisConfig);


module.exports = getRequestWithAuth;

