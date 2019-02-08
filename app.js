const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const router = require('./api/router/index');
const bodyParser = require('koa-bodyparser');  // ->
const serve = require('koa-static'); // модуль, который отдает статические файлы типа index.html из заданной директории
const logger = require('koa-logger'); // опциональный модуль для логов сетевых запросов. Полезен при разработке.
// PASSPORT.JS
const passport = require('koa-passport'); //реализация passport для Koa
const LocalStrategy = require('passport-local'); //локальная стратегия авторизации
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT

const User = require('./api/db/models/user');

global.logger = (...args) => {
  console.log('-='.repeat(20));
  args.map( _ => console.log( _ ));
  console.log('-='.repeat(20));
};

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  (email, password, done) => {
    User.findOne({email}, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
      }
      return done(null, user);
    });
  }
  )
);

const jwtOptions = {
  //jwtFromRequest: ExtractJwt.fromAuthHeader(),
  jwtFromRequest: ExtractJwt.fromHeader('token'),
  secretOrKey: 'react-api-jwt-secret',
};

//TODO: надо бы протестить!!!
passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  const getCurrentTimestamp = () => Math.round((new Date()).getTime() / 1000); // стало
  console.log(getCurrentTimestamp() + ' === app: 57');
  if (jwt_payload.exp >= getCurrentTimestamp()) { // стало
      User.findById(jwt_payload.id, (err, user) => {
        if (err) {
          return done(err)
        }
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      })
    } else { // стало
      console.log('error in else in app: 65');
      return false; // стало
    } // стало
  })
);
// * ->
app.use(serve('public'));
app.use(logger());
//app.use(bodyParser());
// * <-
require('./api/db/mongodb');              // - было
//app.use(koaBody());                       // - было
app.use(koaBody({ multipart: true }));

// ** ->
app.use(passport.initialize());
// ** <-
app.use(router.routes());                 // - было
app.use(router.allowedMethods());         // - было



const server = app.listen(3000, () => {
  console.log('http://localhost:3000');
});
