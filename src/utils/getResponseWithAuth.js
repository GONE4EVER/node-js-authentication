const {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} = require('@/constants/request');

const { authCookiesConfig } = require('@/constants/jwt');


const getResponseWithAuth = (
  response,
  [ accessToken, refreshToken ],
  status
) => response.status(status || 200)
  .cookie(ACCESS_TOKEN_COOKIE, accessToken, authCookiesConfig)
  .cookie(REFRESH_TOKEN_COOKIE, refreshToken, authCookiesConfig);


module.exports = getResponseWithAuth;

