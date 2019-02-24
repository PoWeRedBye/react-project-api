const jwt = require('jsonwebtoken');
const User = require('../db/entity/user');

const getCurrentTimestamp = () => Math.round(new Date().getTime() / 1000); // TODO: authenticate methods

exports.checkIsExpired = async key => {
  const checked = jwt.decode(key);
  my_logger(checked);
  return checked.exp > getCurrentTimestamp();
  // if (checked.exp > getCurrentTimestamp()){
  //   const user = await User.find({_id: checked.id});
  //   return user;
  // } else {
  //   return false;
  // }
};
