const User = require('../db/models/user');
const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
const random = require('rand-token'); // random token generator
// const passport = require('../passportjs/passport');
const passport = require('koa-passport');
const mail = require('../mail_sender/mailSender');
// const jwt_config = require('/jwt_config');
// POST - BASE_URL/addNewUser
exports.addNewUser = payload =>
  new Promise(async (resolve, reject) => {
    const {login, password, permissions} = payload;
    try {
      if (!login) {
        resolve({
          result: false,
          message: 'login is required',
        });
        return;
      } else if (!password) {
        resolve({
          result: false,
          message: 'password is required',
        });
        return;
      } else if (!permissions) {
        const checkUser = await User.findOne({login});
        if (!checkUser) {
          const newUser = new User({
            login: login,
            password: password,
          });
          await newUser.save();
          resolve({
            result: true,
            data: newUser,
            message: 'this user have only a watch permissions!!!',
          });
          return;
        }
      } else {
        const checkUser = await User.findOne({login});
        if (!checkUser) {
          const newUser = new User({
            login: login,
            password: password,
            permissions: permissions,
          });
          await newUser.save();
          resolve({
            result: true,
            data: newUser,
          });
          return;
        } else {
          resolve({
            result: false,
            message: 'this login is already used!!!',
          });
          return;
        }
      }
    } catch (err) {
      reject(err);
    }
  });

// TODO: get user list methods:
// const getAllusers = list.map(item => {
//   // passwordhash and salt мы искючаем из каждого айтема в списке
//   const { passwordHash, salt, ...everythingElse} = item;
//   return everythingElse;
// });


// GET - BASE_URL/getAllUser
exports.getAllUser = () => new Promise(async (resolve, reject) => {
});

// GET - BASE_URL/getSomeUser  --- надо подумать нужен ли мне этот метод!!!
exports.getSomeUser = payload =>
  new Promise(async (resolve, reject) => {
    const {login} = payload;
  });

// POST - BASE_URL/updateSomeUserPermissions -- не факт что мне эта фиговина нужна
exports.updateSomeUserPermissions = payload =>
  new Promise(async (resolve, reject) => {
    const {login, permissions} = payload;
    try {
      if (!login) {
        resolve({
          result: false,
          message: 'pick some user plz',
        });
        return;
      } else {
        const myUser = await User.findOne({login});
        myUser.push(permissions);
        const updatedUser = await myUser.save();
        resolve({
          result: true,
          data: updatedUser,
          message: 'you update user permissions',
        });
      }
    } catch (err) {
      reject(err);
    }
  });

// work
exports.registerNewUser = payload =>
  new Promise(async (resolve, reject) => {
    const {displayName, email, password} = payload;
    try {
      const myNewUser = await User.create({
        displayName: displayName,
        email: email,
        password: password,
      });
      const newUser = await User.findOne({email});
      const jwt_payload = generatePayloadForJWTTokenFromUserModel(newUser);
      const JWTToken = generateJWTTokenWithPayload(jwt_payload);
      const refreshJWT = generateRefreshToken(jwt_payload);
      resolve({
        result: true,
        user: jwt_payload,
        token: JWTToken,
        refreshToken: refreshJWT,
      });
    } catch (err) {
      reject(err);
    }
  });

const generatePayloadForJWTTokenFromUserModel = user => ({
  id: user._id,
  email: user.email,
  displayName: user.displayName,
});

const generateJWTTokenWithPayload = payload => jwt.sign({payload}, 'react-api-jwt-secret', {expiresIn: 868686 /*10 days*/});

const generateRefreshToken = payload => jwt.sign({payload}, 'react-api-refresh_jwt_secret', {expiresIn: 1737372 /*20 days*/});

const generateResetPasswordKey = payload => jwt.sign({payload}, 'react-api-reset_password_secret', {expiresIn: 86868 /*1 day*/});

exports.userLogin = async ctx => {
  return new Promise(async (resolve, reject) => {
    await passport.authenticate('local', function (error, user) {
      if (user === false) {
        reject('Login failed');
      } else {
        const payload = generatePayloadForJWTTokenFromUserModel(user);
        const JWTToken = generateJWTTokenWithPayload(payload);
        const refreshJWT = generateRefreshToken(payload);
        resolve({
          user: payload,
          token: JWTToken,
          refreshToken: refreshJWT,
        });
      }
    })(ctx);
  });
};

exports.forgotPass = async payload => new Promise(async (resolve, reject) => {
  try {
    const email = payload;
    logger(payload);
    logger(email);
    if (!email) {
      resolve({
        result: false,
        message: 'email is required!'
      });
    } else {
      const user = await User.findOne({email: email});
      if (!user) {
        resolve({
          result: false,
          message: 'user not found'
        });
      } else {
        const key_data = generatePayloadForJWTTokenFromUserModel(user);
        const key = generateResetPasswordKey(key_data);
        await User.findOneAndUpdate({_id: user._id}, {forgotPasswordKey: key});
        const updated_user = await User.findOne({_id: user._id})
        logger(updated_user);
        await mail.mailSend(mail.mailOptions(updated_user));

        resolve({
          result: true,
          message: 'check your mail and follow the instructions',
        });
      }
    }
  } catch (err) {
    reject(err);
  }

});

