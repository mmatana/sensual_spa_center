const apiResponse = require('../helpers/apiResponse');
const asyncMiddleware = require('../middleware/async');
const client = require('../database');

exports.addService = () => {
  return asyncMiddleware(async (req, res, next) => {
    const { description, name } = req.body;
    if (!description || !name) return apiResponse.ErrorResponse(res, 'Please add all the fields');

    const { rowCount } = await client.query(`INSERT INTO public.service ( service_name, description ) VALUES ('${name}','${description}')`);
    if (rowCount === 0) return apiResponse.ErrorResponse(res, 'Error adding new service');

    return apiResponse.successResponse(res, 'Service added');
  });
};

exports.listServices = () => {
  return asyncMiddleware(async (req, res, next) => {
    const { rows } = await client.query('SELECT * FROM public.service');
    return apiResponse.successResponseWithData(res, 'Services found', rows);
  });
};
