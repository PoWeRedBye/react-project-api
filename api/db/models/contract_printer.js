const mongoose = require('mongoose');

const contractPrinterShema = new mongoose.Schema({
  printer_model: {
    type: String,
  },
  printer_serial_number: {
    type: String,
    required: [true, 'serial number is required!!!']
  },
  client: {
    type: String,
  },
  //TODO: Photo stores data
  printer_photo: {
    name: String,
    path: String,
    format_type: String,
  },
  printer_location_photo:{
    name: String,
    path: String,
    format_type: String,
  },
  how_to_get_counters_procedure: {
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
        type: String,
      },
      counter: {
        type: Number,
      }
    }
  ],
});

module.exports = mongoose.model('ContractPrinter', contractPrinterShema);
