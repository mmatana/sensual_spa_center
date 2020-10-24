const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointments');
const auth = require('../middleware/auth');

module.exports = () => {
  router.get('/', auth, AppointmentController.listAppointments());

  router.post('/', auth, AppointmentController.addAppointment());

  router.put('/:id', auth, AppointmentController.updateAppointment());

  router.delete('/:id', auth, AppointmentController.deleteAppointment());

  return router;
};
