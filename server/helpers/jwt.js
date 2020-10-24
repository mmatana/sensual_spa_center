const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.generateAuthToken = function (user) {
  const token = jwt.sign({ user_id: user.user_id }, secret);
  return token;
};
