const apiResponse = require('../helpers/apiResponse');
const asyncMiddleware = require('../middleware/async');
const client = require('../database');
const moment = require('moment');

exports.addAppointment = () => {
  return asyncMiddleware(async (req, res, next) => {
    const { date, time } = req.body;
    if (!date || !time) return apiResponse.ErrorResponse(res, 'Please add all the fields');

    const { rowCount, rows } = await client.query(`INSERT INTO public.appointment ( user_id, date, time ) VALUES (${req.user.user_id},'${date}','${time}') RETURNING appointment_id`);
    if (rowCount === 0) return apiResponse.ErrorResponse(res, 'Error adding appointment');

    const newAppointment = await client.query(`SELECT * FROM public.appointment where appointment_id = ${rows[0].appointment_id}`);

    return apiResponse.successResponseWithData(res, 'Appointment added', newAppointment.rows[0]);
  });
};

exports.updateAppointment = () => {
  return asyncMiddleware(async (req, res, next) => {
    const { id } = req.params;
    const { time, date } = req.body;

    const { rows } = await client.query(`SELECT * FROM public.appointment where appointment_id = ${id}`);
    if (rows.length === 0) return apiResponse.ErrorResponse(res, 'No appointment found');

    if (!time && !date) return apiResponse.ErrorResponse(res, 'Please add fields');

    if (date) {
      await client.query(`Update public.appointment set date = '${date}' where appointment_id = ${id}`);
    }

    if (time) {
      await client.query(`Update public.appointment set time = '${time}' where appointment_id = ${id}`);
    }

    return apiResponse.successResponse(res, 'Appointment updated');
  });
};

exports.listAppointments = () => {
  return asyncMiddleware(async (req, res, next) => {
    const { rows } = await client.query(`SELECT * FROM public.appointment WHERE user_id = ${req.user.user_id}`);
    if (rows.length > 0) {
      rows.map(row => {
        row.date = moment(row.date).format('YYYY-MM-DD');
      });
    }
    return apiResponse.successResponseWithData(res, 'Appointments found', rows);
  });
};

exports.deleteAppointment = () => {
  return asyncMiddleware(async (req, res, next) => {
    const { id } = req.params;

    const { rowCount } = await client.query(`delete from public.appointment where appointment_id = ${Number(id)} and user_id = ${req.user.user_id}`);
    if (rowCount === 0) return apiResponse.ErrorResponse(res, 'Error deleting appointment');
    return apiResponse.successResponse(res, 'Appointment deleted');
  });
};
