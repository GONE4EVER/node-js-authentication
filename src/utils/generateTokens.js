const jwt = require('jsonwebtoken');

const { jwtConfig } = require('@/constants/jwt');


const { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const generateTokens = (config) => {
  const accessToken = jwt.sign(
    config,
    TOKEN_SECRET,
    { expiresIn: jwtConfig.tokenLife }
  );

  const refreshToken = jwt.sign(
    config,
    REFRESH_TOKEN_SECRET,
    { expiresIn: jwtConfig.refreshTokenLife }
  );

  return [ accessToken, refreshToken ];
};


module.exports = generateTokens;

