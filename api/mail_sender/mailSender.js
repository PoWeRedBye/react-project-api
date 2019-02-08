const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ferotekh.noreply@gmail.com',
    pass: 'IddqdIdkfa1475369'
  }
});
//TODO: image
// const path = 'file//ferotekh_logo.jpg';
// const upload_path = 'file/photo' + Date.now()+'.jpeg';
// const logo = fs.readFileSync(path);
// const feroteh_logo = fs.copyFile(path, upload_path, (err) => {
//   if (err) throw err;
//   console.log('source.txt was copied to destination.txt');
// });
//const logo_path = feroteh_logo.path;
//TODO: need create special email for example: "js-server@gmail.com" or any other mail name
//TODO: need to explain mailOption with setting parameters
exports.mailOptions = user => ({
  from: 'ferotekh.noreply@gmail.com',
  to: user.email,
  subject: 'Sending Email using Node.js',
  html: '<body> ' +
    '<img src="file//ferotekh_logo" > '+
    '<p>' + user.displayName + '</p> ' +
    '<p> Click on the following link to confirm your request and create a new password: </p>' +
    '<a href="http://localhost:3000/reset_pass">Click to reset your password</a>' +
    '<p> Your reset key : '+ user.forgotPasswordKey + '</p>' +
    '<p> Please note that this link will expired from the time it was send. If you did not request a password reset then pease ignore this message </p> ' +
    '<img src="https://vignette.wikia.nocookie.net/absurdopedia/images/4/48/Hypno_large.gif">' +
    '</body>',
});

exports.mailSend = opt => transporter.sendMail(opt, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
