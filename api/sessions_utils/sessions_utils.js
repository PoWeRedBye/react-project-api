const jwt = require('jsonwebtoken'); // аутентификация по JWT для http
const User = require('../db/entity/user');

// TODO: sessions utils methods:

const generateJWTTokenWithPayload = payload =>
  jwt.sign({ payload }, 'react-api-jwt-secret', { expiresIn: 868686 /*10 days*/ });

const generateRefreshToken = payload =>
  jwt.sign({ payload }, 'react-api-refresh_jwt_secret', { expiresIn: 1737372 /*20 days*/ });

const decodeToken = token => jwt.decode(token);

const getCurrentTimestamp = () => Math.round(new Date().getTime() / 1000);

const isTimestampExpired = expirationTimestamp => expirationTimestamp <= getCurrentTimestamp();

const checkIfTokenIsNotExpired = token => {
  const decodedToken = decodeToken(token);
  return !isTimestampExpired(decodedToken.exp);
};

const checkIfRefreshTokenIsNotExpired = token => {
  const decodedToken = decodeToken(token);

  if (isTimestampExpired(decodedToken)) {
    return false;
  } else {
    // TODO: generate new token and refresh token using payload
    // надо подумать, чекать это в каждом методе или тут,
    // если тут то надо разобратся с await
    checkUserFromDecodedToken(decodedToken);

    updateTokenFromRefreshTokenData(decodedToken);

    return true;
  }
};

// TODO: над бы поправить возвращаемые значения
const updateTokenFromRefreshTokenData = token => {
  /*const decodedToken = decodeToken(token);*/
  const payload = getPayloadFromDecodedToken(token);

  return {
    token: generateJWTTokenWithPayload(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

const getPayloadFromDecodedToken = token => {
  const payload = {
    id: token.id,
    displayName: token.displayName,
    email: token.email,
  };
  return payload;
};
const checkUserFromDecodedToken = token => {
  const user = User.findOne({ id: token.id });
  checkUser(user);
  return user;
};
const checkUser = user => {
  if (user !== undefined) {
    return true;
  } else {
    return false;
  }
};
