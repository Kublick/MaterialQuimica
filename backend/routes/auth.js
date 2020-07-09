// Routes para usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//Crea un usuarios
// api/auth/

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mínimo 6 caracteres').isLength({
      min: 5,
    }),
  ],

  authController.validateEmployee
);

router.get('/', auth, authController.authEmployee);

module.exports = router;
