const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const auth = require('../middleware/auth');

module.exports = () => {
  router.get('/', UserController.listUserByEmail());

  router.post('/register', UserController.register());

  router.post('/login', UserController.login());

  router.get('/me', auth, UserController.me());

  return router;
};
