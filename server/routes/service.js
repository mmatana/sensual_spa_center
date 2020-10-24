const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/services');
const auth = require('../middleware/auth');

module.exports = () => {
  router.get('/', ServiceController.listServices());

  router.post('/', auth, ServiceController.addService());

  return router;
};
