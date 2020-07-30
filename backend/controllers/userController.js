const User = require('../models/Users');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  const { name, lastName, birthDate, phone, email, address } = req.body;

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

exports.getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un Error');
  }
};

exports.getUserPagination = async (req, res) => {
  try {
    let perPage = Number(req.query.perPage);
    let page = Number(req.query.page);

    console.log('perPage', perPage);
    console.log('page', page);
    const user = await User.find().limit(perPage).skip(page);

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un Error');
  }
};

exports.updateUser = async (req, res) => {
  const {
    notes,
    name,
    lastName,
    phone,
    email,
    gender,
    birthdate,
    address,
  } = req.body;

  const newUser = {
    notes,
    name,
    lastName,
    phone,
    email,
    gender,
    birthdate,
    address,
  };

  try {
    let user = await User.findById(req.params.id);
    console.log(user);

    if (!user) {
      return res.status(400).json({ msg: 'El paciente no existe' });
    }
    console.log('new user contents', newUser);
    //update

    user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newUser },
      { $new: true }
    );
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un Error');
  }
};

exports.deleteUser = async (req, res) => {
  const { user } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: 'El cliente no existe' });
    }

    await User.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Paciente Eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Ocurrio un error' });
  }
};
