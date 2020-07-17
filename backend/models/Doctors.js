const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  career: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  webLab: {
    login: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    statusWebLab: {
      type: Boolean,
    },
  },
});

const Doctor = mongoose.model('doctor', doctorSchema);

module.exports = Doctor;
