const Employee = require('../models/Employees');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.createEmployee = async (req, res) => {
  const { name, password, email } = req.body;

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    let employee = await Employee.findOne({ email });

    if (employee) {
      return res.status(400).json({ msg: 'El empleado ya existe' });
    }

    employee = new Employee(req.body);

    //   Password hash_password
    const salt = await bcryptjs.genSalt(10);
    employee.password = await bcryptjs.hash(password, salt);

    await employee.save();

    const payload = {
      employee: {
        id: employee.id,
      },
    };

    //firmar JwT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        //Mensaje de conf
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send('There is a communication error');
  }
};
