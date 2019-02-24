const mongoose = require('mongoose');

const cartridgeSchema = new mongoose.Schema({
  cartridge_name: {
    type: String,
    required: [true, 'name is required'],
  },
  cartridge_code: {
    type: String,
    required: [true, 'cartridge code is required'],
  },
  executor: {
    type: String,
  },
  date: {
    type: String,
  },
  invoice_number: {
    type: String,
    required: [true, 'invoice number is required'],
  },
  work_type: {
    type: String,
  },
  client: {
    type: String,
  },
  used_parts: [
    {
      part_code: {
        type: String,
      },
      part_name: {
        type: String,
      },
      part_quantity: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model('Cartridge', cartridgeSchema);
