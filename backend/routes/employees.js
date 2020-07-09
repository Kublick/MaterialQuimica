// Routes para usuarios
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { check } = require('express-validator');

//Crea un usuarios
// api/employees/

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mínimo 6 caracteres').isLength({
      min: 5,
    }),
  ],

  employeeController.createEmployee
);

module.exports = router;
