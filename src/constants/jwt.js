const jwtConfig = {
  tokenLife: '10s',
  refreshTokenLife: '7d',
};

const authCookeisConfig = {
  maxAge: 1000 * 60 * 60,
  httpOnly: true,
  // signed: true,
};

module.exports = {
  jwtConfig,
  authCookeisConfig,
};
