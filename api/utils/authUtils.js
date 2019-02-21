const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const User = require('../db/models/user');

const getCurrentTimestamp = () => Math.round(new Date().getTime() / 1000); // TODO: authenticate methods
const generateJWTTokenWithPayload = payload =>
  jwt.sign({ payload }, 'react-api-jwt-secret', { expiresIn: 868686 /*10 days*/ });
const generateRefreshToken = payload =>
  jwt.sign({ payload }, 'react-api-refresh_jwt_secret', { expiresIn: 1737372 /*20 days*/ });

// TODO: authenticate methods
exports.checkAuth = async token => {
  if (token) {
    const decodedToken = jwt.decode(token);
    if (decodedToken.exp > getCurrentTimestamp()) {
      const currentUser = await User.find({ _id: decodedToken.payload.id });
      if (currentUser) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

//TODO: refresh token update method
exports.refreshAuthFromRefreshToken = async refreshToken => {
  return new Promise(async (resolve, reject) => {
    const decodedRefreshToken = jwt.decode(refreshToken);
    if (decodedRefreshToken.exp > getCurrentTimestamp()) {
      const currentUser = await User.find({ _id: decodedRefreshToken.payload.id });
      if (currentUser) {
        const newToken = generateJWTTokenWithPayload(decodedRefreshToken.payload);
        const newRefreshToken = generateRefreshToken(decodedRefreshToken.payload);
        resolve({
          result: true,
          token: newToken,
          refreshToken: newRefreshToken,
        });
      } else {
        reject({
          result: false,
          status: 401,
          message: 'user is not found',
        });
      }
    } else {
      reject({
        result: false,
        status: 401,
        message: 'token is expired',
      });
    }
  });
};
