const passport = require('koa-passport'); //реализация passport для Koa
const LocalStrategy = require('passport-local'); //локальная стратегия авторизации
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT

const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
const random = require('rand-token'); // random token generator

const User = require('../db/entity/user');

// need fix!!!
/*const myUserLogin = (userdata) => (
    const user = [email = userdata.email, password = userdata.password];
    try {
        console.log(user);
        passport.KoaPassport().authenticate('local', (err, user) => {
            if (user == false) {
                return 'Login failed';
                /!*resolve({
                    result: true,
                    message: 'Login failed'
                });*!/
            } else {
                //--payload - информация которую мы храним в токене и можем из него получать
                const jwt_payload = {
                    id: user.id,
                    displayName: user.displayName,
                    email: user.email
                };
                const token = jwt.sign(jwt_payload, 'react-api-jwt-secret', {expiresIn: '8d'});//здесь создается JWT
                const refreshToken = random.uid(256);
                //ctx.body = {user: user.displayName, token: 'JWT ' + token};

                /!*resolve({
                    result: true,
                    payload: user.displayName, token, refreshToken,
                    message: 'JWT: ' + token + '; refresh token: ' + refreshToken,
                });*!/
                return [user.displayName, token, refreshToken];
            }
        });
    } catch (err) {
        return err;
    }   //<= wtf
);*/

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user || !user.checkPassword(password)) {
          return done(null, false, { message: 'Нет такого пользователя или пароль неверен.' });
        }
        return done(null, user);
      });
    },
  ),
);

// Ждем JWT в Header

const jwtOptions = {
  //jwtFromRequest: ExtractJwt.fromAuthHeader(),
  jwtFromRequest: ExtractJwt.fromHeader('token'),
  secretOrKey: 'react-api-jwt-secret',
};

//TODO: надо бы протестить!!!
passport.use(
  new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    const getCurrentTimestamp = () => Math.round(new Date().getTime() / 1000);
    if (jwt_payload.exp <= getCurrentTimestamp) {
      User.findById(jwt_payload.id, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    } else {
      return false;
    }
  }),
);
