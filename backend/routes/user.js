// Routes para usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//Crea un usuarios

router.post(
  '/',
  auth,
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
  ],
  userController.createUser
);

router.get('/', userController.getUser);

router.get('/paginate', userController.getUserPagination);

router.delete('/:id', userController.deleteUser);

router.put('/:id', userController.updateUser);

module.exports = router;
