const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
  },
  phone: {
    type: String,
    trim: true,
  },
  phoneB: String,
  email: {
    type: String,
    trim: true,
    required: true,
  },
  emailB: String,
  orders: [],
  reference: { type: Schema.Types.ObjectId, ref: 'Orders' },
  gender: {
    type: String,
  },
  taxId: String,
  address: String,
  city: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
