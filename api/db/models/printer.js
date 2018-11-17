const mongoose = require('mongoose');

const printerSchema = new mongoose.Schema({

    printer_model: {
        type: String,
        required: [true, 'name is required']
    },
    executor: {
        type: String,
    },
    date: {
        type: String,
    },
    invoice_number: {
        type: String,
        required: [true, 'invoice number is required']
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
            }
        }
    ],
});

module.exports = mongoose.model('Printer', printerSchema);