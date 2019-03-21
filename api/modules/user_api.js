const User = require('../db/entity/user');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');
const mail = require('../utils/mailSender');
const fpu = require('../utils/forgotPassUtils');
const random_string = require('randomstring');
const passUtils = require('../utils/passwordUtils');
const photoUtils = require('../utils/photoUtils');

// POST - BASE_URL/addNewUser
exports.addNewUser = payload =>
  new Promise(async (resolve, reject) => {
    const { login, password, permissions } = payload;
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
        const checkUser = await User.findOne({ login });
        if (!checkUser) {
          const newUser = new User({
            login: login,
            password: password,
          });
          await newUser.save();
          resolve({
            result: true,
            payload: newUser,
            message: 'this user have only a watch permissions!!!',
          });
          return;
        }
      } else {
        const checkUser = await User.findOne({ login });
        if (!checkUser) {
          const newUser = new User({
            login: login,
            password: password,
            permissions: permissions,
          });
          await newUser.save();
          resolve({
            result: true,
            payload: newUser,
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
exports.getAllUser = payload =>
  new Promise(async (resolve, reject) => {
    try {
      //const {limit, offset} = payload;
      if (payload.list_limit || payload.list_skip) {
        let query = User.find({});
        if (Number(+payload.list_skip) > 1) {
          query = query.skip(+payload.list_limit * (+payload.list_skip - 1));
        }
        const users = await query.limit(+payload.list_limit);

        const usersList = users.map(item => ({
          id: item._id,
          displayName: item.displayName,
          email: item.email,
          photo: item.user_photo.path,
        }));

        resolve({
          result: true,
          payload: usersList,
          message: '-=-=-=-=',
        });
      } else {
        const users = await User.find({});

        const usersList = users.map(item => ({
          _id: item._id,
          displayName: item.displayName,
          email: item.email,
          photo: item.user_photo.path,
        }));

        resolve({
          result: true,
          payload: usersList,
          message: '-=-=-=-=',
        });
      }
    } catch (error) {
      reject(error);
    }
  });

// GET - BASE_URL/getSomeUser  --- надо подумать нужен ли мне этот метод!!!
exports.getSomeUser = payload =>
  new Promise(async (resolve, reject) => {
    const { login } = payload;
  });

// POST - BASE_URL/updateSomeUserPermissions -- не факт что мне эта фиговина нужна
exports.updateSomeUserPermissions = payload =>
  new Promise(async (resolve, reject) => {
    const { login, permissions } = payload;
    try {
      if (!login) {
        resolve({
          result: false,
          message: 'pick some user plz',
        });
        return;
      } else {
        const myUser = await User.findOne({ login });
        myUser.push(permissions);
        const updatedUser = await myUser.save();
        resolve({
          result: true,
          payload: updatedUser,
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
    const { displayName, email, password, user_photo } = payload;
    try {
      if (user_photo) {
        const user_photo_model = photoUtils.savePhotoInServerDirectory(user_photo);
        const myNewUser = await User.create({
          displayName: displayName,
          email: email,
          password: password,
          user_photo_name: user_photo_model.name,
          user_photo_path: user_photo_model.path,
          user_photo_type: user_photo_model.type,
        });
        const newUser = await User.findOne({ email });
        const jwt_payload = generatePayloadForJWTTokenFromUserModel(newUser);
        const JWTToken = generateJWTTokenWithPayload(jwt_payload);
        const refreshJWT = generateRefreshToken(jwt_payload);
        const user_model = generateUserModelFromUser(newUser);
        const mail_opt_payload = generateMailOptForNewUser(displayName, email, password);
        await mail.mailSend(mail.registerNewUserMailOpt(mail_opt_payload));
        resolve({
          result: true,
          user: user_model,
          token: JWTToken,
          refreshToken: refreshJWT,
        });
      } else {
        //TODO: add avatar file check and app logic!!!
        const myNewUser = await User.create({
          displayName: displayName,
          email: email,
          password: password,
        });
        const newUser = await User.findOne({ email });
        const jwt_payload = generatePayloadForJWTTokenFromUserModel(newUser);
        const JWTToken = generateJWTTokenWithPayload(jwt_payload);
        const refreshJWT = generateRefreshToken(jwt_payload);
        const user_payload = generateUserModelFromUser(newUser);
        const mail_opt_payload = generateMailOptForNewUser(displayName, email, password);
        await mail.mailSend(mail.registerNewUserMailOpt(mail_opt_payload));
        resolve({
          result: true,
          user: user_payload,
          token: JWTToken,
          refreshToken: refreshJWT,
        });
      }
    } catch (err) {
      reject(err);
    }
  });

const generateMailOptForNewUser = payload => ({
  displayName: payload.displayName,
  email: payload.email,
  password: payload.password,
});

const generatePayloadForJWTTokenFromUserModel = user => ({
  id: user._id,
  email: user.email,
  displayName: user.displayName,
});

const generateUserModelFromUser = user => ({
  id: user._id,
  email: user.email,
  displayName: user.displayName,
  userPhotoName: user.user_photo.name,
  userPhotoPath: user.user_photo.path,
  userPhotoType: user.user_photo.type,
});

const generateJWTTokenWithPayload = payload =>
  jwt.sign({ payload }, 'react-api-jwt-secret', { expiresIn: 868686 /*10 days*/ });

const generateRefreshToken = payload =>
  jwt.sign({ payload }, 'react-api-refresh_jwt_secret', { expiresIn: 1737372 /*20 days*/ });

const generateResetPasswordKey = payload =>
  jwt.sign({ payload }, 'react-api-reset_password_secret', { expiresIn: 86868 /*1 day*/ });

exports.userLogin = async ctx => {
  return new Promise(async (resolve, reject) => {
    my_logger(ctx.body);
    await passport.authenticate('local', function(error, user) {
      if (user === false) {
        reject('Login failed');
      } else {
        const payload = generatePayloadForJWTTokenFromUserModel(user);
        const JWTToken = generateJWTTokenWithPayload(payload);
        const refreshJWT = generateRefreshToken(payload);
        const user_payload = generateUserModelFromUser(user);
        resolve({
          result: true,
          user: user_payload,
          token: JWTToken,
          refreshToken: refreshJWT,
        });
      }
    })(ctx);
  });
};

exports.forgotPass = async payload =>
  new Promise(async (resolve, reject) => {
    try {
      const email = payload;
      my_logger(payload);
      my_logger(email);
      if (!email) {
        resolve({
          result: false,
          message: 'email is required!',
        });
      } else {
        const user = await User.findOne({ email: email });
        if (!user) {
          resolve({
            result: false,
            message: 'user not found',
          });
        } else {
          const key_data = generatePayloadForJWTTokenFromUserModel(user);
          const key = generateResetPasswordKey(key_data);
          await User.findOneAndUpdate({ _id: user._id }, { forgotPasswordKey: key });
          const updated_user = await User.findOne({ _id: user._id });
          my_logger(updated_user);
          await mail.mailSend(mail.getForgotPassKeyMailOpt(updated_user));

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

exports.resetPassword = key =>
  new Promise(async (resolve, reject) => {
    try {
      if (!key) {
        resolve({
          result: false,
          message: 'key is required',
        });
      } else {
        if (fpu.checkIsExpired(key)) {
          const decoded_key = jwt.decode(key);
          my_logger(decoded_key);
          const new_pass = random_string.generate({
            length: 16,
            charset: 'alphanumeric',
          });
          my_logger(new_pass);
          const new_pass_hash = await passUtils.hashNewPassword(new_pass);
          await User.findOneAndUpdate(
            { _id: decoded_key.payload.id },
            { passwordHash: new_pass_hash },
            { forgotPasswordKey: '' },
          );
          const payload = {
            email: decoded_key.payload.email,
            displayName: decoded_key.payload.displayName,
            password: new_pass,
          };
          await mail.mailSend(mail.sendNewUserPassMailOpt(payload));
          resolve({
            result: true,
            message: 'we sent your new password to your email',
          });
        } else {
          resolve({
            result: false,
            message: 'link is expired',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });

exports.changePassword = payload =>
  new Promise(async (resolve, reject) => {
    try {
      const { token, oldPass, newPass } = payload;
      if (!oldPass || !newPass || !token) {
        resolve({
          result: false,
          message: 'bad credentials',
        });
      } else {
        const jwt_payload = jwt.decode(token);
        const user = await User.findOne({ _id: jwt_payload.payload.id });
        if (!user) {
          resolve({
            result: false,
            message: 'user not found',
          });
        } else {
          const hashOldPass = passUtils.hashNewPassword(oldPass);
          if (hashOldPass === user.passwordHash) {
            const hashNewPass = passUtils.hashNewPassword(newPass);
            await User.findOneAndUpdate({ _id: user._id }, { passwordHash: hashNewPass });
            resolve({
              result: true,
              message: 'password is updated',
            });
          } else {
            resolve({
              result: false,
              message: 'you enter a wrong password',
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
