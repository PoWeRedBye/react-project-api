const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const router = require('./api/router/index');
const serve = require('koa-static'); // модуль, который отдает статические файлы типа index.html из заданной директории
const logger = require('koa-logger'); // опциональный модуль для логов сетевых запросов. Полезен при разработке.
const jwt = require('koa-jwt');

// PASSPORT.JS
const passport = require('koa-passport'); //реализация passport для Koa
const LocalStrategy = require('passport-local'); //локальная стратегия авторизации
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT


const auth_utils = require('./api/utils/authUtils');
const User = require('./api/db/entity/user');

global.my_logger = (...args) => {
  console.log('*=>'.repeat(20));
  args.map(_ => console.log(_));
  console.log('<=*'.repeat(20));
};


// Custom 401 handling if you don't want to expose koa-jwt errors to users
// app.use(function(ctx, next){
//   return next().catch((err) => {
//     if (401 == err.status) {
//       ctx.status = 401;
//       ctx.body = 'Protected resource, use Authorization header to get access\n';
//     } else {
//       throw err;
//     }
//   });
// });


// Middleware below this line is only reached if JWT token is valid
// app.use(jwt({ secret: 'shared-secret' }));

// Protected middleware
// app.use(function(ctx){
//   if (ctx.url.match(/^\/api/)) {
//     ctx.body = 'protected\n';
//   }
// });


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
  jwtFromRequest: ExtractJwt.fromHeader('token'),
  secretOrKey: 'react-api-jwt-secret',
};

//TODO: надо бы протестить!!!
passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    const getCurrentTimestamp = () => Math.round((new Date()).getTime() / 1000);
    if (jwt_payload.exp >= getCurrentTimestamp()) {
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
    } else {
      return false;
    }
  })
);
app.use(serve('public'));
app.use(logger());
// Unprotected middleware
const publicURLs = [
  '/user/login',
  '/user/registration',
  '/user/forgot-password',
  '/user/refreshAuthData',
  '/test/add',
  '/public/test/get',
];
app.use(async (ctx, next) => {
  my_logger(ctx);

  // TODO: rewrite using regex to avoid '/user/reset-password/{key}/a/b/c/...' cases
  if (ctx.request.url.indexOf('/user/reset-password/') === 0) {
    return next();
  }

  my_logger(publicURLs.includes(ctx.request.url));
  if (publicURLs.includes(ctx.request.url)) {
    return next();
  }

  my_logger('check auth token');
  // check token
  if (await auth_utils.checkAuth(ctx.request.header.token)) {
    return next();
  }
  return ctx.body = 401;
  // return 401
});
require('./api/db/mongodb');              // - было
app.use(koaBody({multipart: true}));
app.use(passport.initialize());
app.use(router.routes());                 // - было
app.use(router.allowedMethods());         // - было
const server = app.listen(3000, () => {
  console.log('http://localhost:3000');
});
