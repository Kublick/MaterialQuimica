const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  testId: {
    type: Number,
    required: true,
    unique: true,
  },
  resultsReceived: [],
  currentStatus: String,
  userReference: { type: Schema.Types.ObjectId, ref: 'User' },
  resultsReception: {
    printed: Boolean,
    email: Boolean,
    toDoctor: Boolean,
    Fax: Boolean,
    Web: Boolean,
  },
});

const Order = mongoose.model('order', orderSchema);
module.exports = Reception;
