const Jwt = require('jsonwebtoken');
const apiResponse = require('../helpers/apiResponse');
const client = require('../database');

module.exports = async (req, res, next) => {
  let token = req.headers['x-auth-token'];
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) return apiResponse.unauthorizedResponse(res, 'You are not authorized');
  try {
    var decoded = Jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    const { rows } = await client.query(`SELECT * FROM public.user WHERE user_id = ${req.user.user_id}`);
    if (rows.length === 0) return apiResponse.ErrorResponse(res, 'No user found');

    req.user = {
      user_id: rows[0].user_id,
      email: rows[0].email,
      user_full_name: rows[0].user_full_name
    };

    next();
  } catch {
    return apiResponse.unauthorizedResponse(res, 'invalid token');
  }
};
