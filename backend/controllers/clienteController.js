const Cliente = require('../models/Clientes');
const { validationResult } = require('express-validator');

exports.addCliente = async (req, res) => {
  const {
    shortId,
    nombre,
    tarifa,
    email,
    telefono,
    direccion,
    tipoPago,
    rfc,
    notesBackground,
    envio,
    ticket,
    weblab,
  } = req.body;

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  let cliente = await Cliente.findOne({ email });

  console.log('busqueda', cliente);

  if (cliente) {
    return res.status(400).json({ msg: 'El paciente ya existe' });
  }

  cliente = new Cliente(req.body);

  cliente.save();
  res.json(cliente);

  try {
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un Error');
  }
};

exports.getCliente = async (req, res) => {
  try {
    const cliente = await Cliente.find();
    res.json({ cliente });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un Error');
  }
};

exports.getClientePagination = async (req, res) => {
  try {
    let perPage = Number(req.query.perPage);
    let page = Number(req.query.page);

    console.log('perPage', perPage);
    console.log('page', page);
    const cliente = await Cliente.find().limit(perPage).skip(page);

    res.json({ cliente });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un Error');
  }
};
