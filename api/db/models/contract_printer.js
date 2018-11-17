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