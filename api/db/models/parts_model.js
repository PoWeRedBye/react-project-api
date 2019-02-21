const mongoose = require('mongoose');

const partsSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'code is required'],
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  amount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Part', partsSchema);
