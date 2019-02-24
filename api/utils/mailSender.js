const nodemailer = require('nodemailer');
const fs = require('fs');

//TODO: надо потом переписать на нормальный вариант аутентификации к почте

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ferotekh.noreply@gmail.com',
    pass: 'IddqdIdkfa2301',
  },
});

//TODO: need to explain mailOption with setting parameters
exports.getForgotPassKeyMailOpt = user => ({
  from: 'ferotekh.noreply@gmail.com',
  to: user.email,
  subject: 'Sending Email using Node.js',
  html:
    '<body> ' +
    '<img src="file//ferotekh_logo" > ' +
    '<p> Hello ' +
    user.displayName +
    '</p> ' +
    '<p> Click on the following link to confirm your request and create a new password: </p>' +
    '<a href="http://localhost:3000/user/reset-password/' +
    user.forgotPasswordKey +
    '" >Click to reset your password</a>' +
    '<p> Your reset key : ' +
    user.forgotPasswordKey +
    '</p>' +
    '<p> Please note that this link will expired from the time it was send. If you did not request a password reset then pease ignore this message </p> ' +
    '<img src="https://vignette.wikia.nocookie.net/absurdopedia/images/4/48/Hypno_large.gif">' +
    '</body>',
});

exports.registerNewUserMailOpt = payload => ({
  from: 'ferotekh.noreply@gmail.com',
  to: payload.email,
  subject: 'Thank you for registering on our service',
  html:
    '<body> ' +
    //'<img src="file//ferotekh_logo" > '+
    '<p> Hello ' +
    payload.displayName +
    '</p> ' +
    '<p> Thank you for registering on our service </p>' +
    '<p> You can use the following information to access the site: </p>' +
    '<p>    Your login : ' +
    payload.displayName +
    '</p>' +
    '<p> Your password : ' +
    payload.password +
    '</p>' +
    '<p> You always can change your password in: Menu -> Settings -> Change password </p>' +
    //'<p> Please note that this link will expired from the time it was send. If you did not request a password reset then pease ignore this message </p> ' +
    '<img src="https://vignette.wikia.nocookie.net/absurdopedia/images/4/48/Hypno_large.gif">' +
    '</body>',
});

exports.sendNewUserPassMailOpt = payload => ({
  from: 'ferotekh.noreply@gmail.com',
  to: payload.email,
  subject: 'Sending Email using Node.js',
  html:
    '<body> ' +
    //'<img src="file//ferotekh_logo" > '+
    '<p> Hello ' +
    payload.displayName +
    '</p> ' +
    //'<p> Click on the following link to confirm your request and create a new password: </p>' +
    //'<a href="http://localhost:3000/user/reset-password/'+ user.forgotPasswordKey +'" >Click to reset your password</a>' +
    '<p> Your new password : ' +
    payload.password +
    '</p>' +
    '<p> You always can change your password in: Menu -> Settings -> Change password </p>' +
    //'<p> Please note that this link will expired from the time it was send. If you did not request a password reset then pease ignore this message </p> ' +
    '<img src="https://vignette.wikia.nocookie.net/absurdopedia/images/4/48/Hypno_large.gif">' +
    '</body>',
});

exports.mailSend = opt =>
  transporter.sendMail(opt, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
