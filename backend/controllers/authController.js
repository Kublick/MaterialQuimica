const Employee = require('../models/Employees');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.validateEmployee = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { name, password } = req.body;

  try {
    let employee = await Employee.findOne({ name });
    if (!employee) {
      return res.status(400).json({ msg: 'El usuario no existe' });
    }

    const passwordCheck = await bcryptjs.compare(password, employee.password);

    if (!passwordCheck) {
      return res.status(400).json({ msg: 'Password Incorrecto' });
    }

    const payload = {
      employee: {
        id: employee.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, // 1 hora
      },
      (error, token) => {
        if (error) throw error;

        // Mensaje de confirmación
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.authEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id).select(
      '-password'
    );
    res.json({ employee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error de comunicación' });
  }
};
