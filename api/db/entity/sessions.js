const mongoose = require('mongoose');

//TODO: WTF: i don't remember who create this shit=))))

const sessions = new mongoose.Schema({
  login: {
    type: String,
    required: [true, 'login is required'],
  },
  token: {
    type: String,
    required: [true, 'token is required'],
  },
  refreshToken: {
    type: String,
    required: [true, 'refresh token is required'],
  },
});
module.exports = mongoose.model('Sessions', sessions);
