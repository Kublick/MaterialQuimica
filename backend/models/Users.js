const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  shortId: {
    type: String,
  },
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
  email: {
    type: String,
    trim: true,
    required: true,
  },
  orders: [],
  reference: { type: Schema.Types.ObjectId, ref: 'Orders' },
  gender: {
    type: String,
  },
  address: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
