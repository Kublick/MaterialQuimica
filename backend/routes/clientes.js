// Routes para usuarios
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//Crea un usuarios
// api/employees/

router.post(
  '/',

  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
  ],
  clienteController.addCliente
);

router.get('/', clienteController.getCliente);

router.get('/paginate', clienteController.getClientePagination);

module.exports = router;
