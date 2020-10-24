const userRoutes = require('./user');
const testimonialRoutes = require('./testimonial');
const appointmentRoutes = require('./appointment');
const serviceRoutes = require('./service');
const client = require('../database');
const prefix = '/api/v1';

module.exports = function (app) {
  app.use(`${prefix}/user`, userRoutes());

  app.use(`${prefix}/testimonials`, testimonialRoutes());

  app.use(`${prefix}/appointments`, appointmentRoutes());

  app.use(`${prefix}/services`, serviceRoutes());

  app.get('/health-check', (req, res, next) => {
    client.query('select \'successfully connected\' as "message"')
      .then(result => res.json(result.rows[0]))
      .catch(err => next(err));
  });
};
