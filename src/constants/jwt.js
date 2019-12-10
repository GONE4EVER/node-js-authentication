const jwtConfig = {
  tokenLife: '5s',
  refreshTokenLife: '1d',
};

const authCookiesConfig = {
  maxAge: 1000 * 60 * 60,
  httpOnly: true,
  // signed: true,
};

module.exports = {
  jwtConfig,
  authCookiesConfig,
};
