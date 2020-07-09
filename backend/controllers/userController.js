const User = require('../models/Users');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  const {
    name,
    lastName,
    birthDate,
    phone,
    phoneB,
    email,
    emailB,
    address,
    city,
    taxId,
  } = req.body;

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  let user = await User.findOne({ email });

  console.log('busqueda', user);

  if (user) {
    return res.status(400).json({ msg: 'El paciente ya existe' });
  }

  user = new User(req.body);

  user.save();
  res.json(user);

  try {
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un Error');
  }
};
