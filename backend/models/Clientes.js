const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
  shortId: {
    type: String,
    trim: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  tarifa: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  direccion: {
    type: String,
    trim: true,
  },
  tipoPago: {
    type: String,
    trim: true,
  },
  rfc: {
    type: String,
    trim: true,
  },
  notesBackground: {
    type: String,
    trim: true,
  },
  envio: {
    printed: Boolean,
    email: Boolean,
    toDoctor: Boolean,
    Fax: Boolean,
    Web: Boolean,
  },
  ticket: {
    precioCaja: Boolean,
    precioTicket: Boolean,
    ocultarEstudio: Boolean,
  },
  weblab: {
    login: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
});

const Cliente = mongoose.model('cliente', clienteSchema);

module.exports = Cliente;
