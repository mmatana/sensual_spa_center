const apiResponse = require('../helpers/apiResponse');
const asyncMiddleware = require('../middleware/async');
const client = require('../database');
const bcrypt = require('bcrypt');
const { generateAuthToken } = require('../helpers/jwt');

exports.listUserByEmail = () => {
  return asyncMiddleware(async (req, res, next) => {
    const { email } = req.query;

    const { rows } = await client.query(`SELECT * FROM public.user WHERE email = '${email}'`);
    if (rows.length === 0) return apiResponse.ErrorResponse(res, 'No user found');

    return apiResponse.successResponseWithData(res, 'User found', rows[0]);
  });
};

exports.register = () => {
  return asyncMiddleware(async (req, res, next) => {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) return apiResponse.ErrorResponse(res, 'Please add all the fields');

    const { rows } = await client.query(`SELECT * FROM public.user Where email = '${email}'`);
    if (rows.length > 0) return apiResponse.ErrorResponse(res, 'Email already taken.');

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const newUser = await client.query(`INSERT INTO public.user ( email, password, user_full_name ) VALUES ('${email}','${newPassword}','${fullName}') RETURNING user_id`);
    if (newUser.rowCount === 0) return apiResponse.ErrorResponse(res, 'Error registering user');

    const user = {
      user_id: newUser.rows[0].user_id,
      email: email,
      user_full_name: fullName
    };

    const refreshToken = generateAuthToken(user);

    return apiResponse.successResponseWithData(res, 'User Registered', { user, token: refreshToken });
  });
};

exports.login = logger => {
  return asyncMiddleware(async function (req, res, next) {
    const { email, password } = req.body;

    const { rows } = await client.query(`SELECT * FROM public.user Where email = '${email}'`);
    if (rows.length === 0) return apiResponse.ErrorResponse(res, 'Email not found');

    const validPassowrd = await bcrypt.compare(password, rows[0].password);
    if (!validPassowrd) return apiResponse.ErrorResponse(res, 'Password is not correct');

    const user = {
      user_id: rows[0].user_id,
      email: rows[0].email,
      user_full_name: rows[0].user_full_name
    };

    const refreshToken = generateAuthToken(user);

    return apiResponse.successResponseWithData(res, 'User logged in', { token: refreshToken, user });
  });
};

exports.me = () => {
  return asyncMiddleware(async function (req, res, next) {
    return apiResponse.successResponseWithData(res, 'User details', req.user);
  });
};
