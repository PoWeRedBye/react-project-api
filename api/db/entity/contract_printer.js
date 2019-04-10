const mongoose = require('mongoose');

const contractPrinterShema = new mongoose.Schema({
  printer_model: {
    type: String,
  },
  printer_serial_number: {
    type: String,
    required: [true, 'serial number is required!!!'],
  },
  client: {
    type: String,
  },
  current_counter: {
    type: Number,
  },
  previous_counter: {
    type: Number,
  },
  counters: [
    {
      date: {
        type: Number,
        //default: new Date().getTime(),
        default: Date.now(),
      },
      counter: {
        type: Number,
      },
      new_cartridge:{
        type: Boolean,
      },
      new_fix_unit:{
        type: Boolean,
      },
      new_oscillatory_node: {
        type: Boolean,
      },
      new_rollers:{
        type: Boolean,
      },
      new_maintenance:{
        type: Boolean,
      },
      nothing: {
        type: Boolean,
      }
    },
  ],
});

module.exports = mongoose.model('ContractPrinter', contractPrinterShema);
