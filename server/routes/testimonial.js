const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials');
const auth = require('../middleware/auth');

module.exports = () => {
  router.get('/', auth, TestimonialController.listTestimonials());

  router.post('/', auth, TestimonialController.addTestimonial());

  return router;
};
