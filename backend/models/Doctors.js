const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  phoneB: String,
  email: {
    type: String,
    required: true,
  },
  emailB: String,
  address: String,
  city: String,
  specialty: String,
  resultsReception: {
    printed: Boolean,
    email: Boolean,
    toDoctor: Boolean,
    Fax: Boolean,
    Web: Boolean,
    required: true,
  },
});

const Doctor = mongoose.model('doctor', doctorSchema);

module.exports = Doctor;
