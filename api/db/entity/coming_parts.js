const mongoose = require('mongoose');

const comingPartShema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'code is required'],
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  date: {
    type: String,
  },
  invoice_number: {
    type: String,
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
  },
});

module.exports = mongoose.model('ComingPart', comingPartShema);
