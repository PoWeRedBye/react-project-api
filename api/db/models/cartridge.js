const mongoose = require('mongoose');

const cartridgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    cartridge_code: {
        type: String,
        required: [true, 'cartridge code is required']
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
    parts: [
        {
            code: {
                type: String,
            },
            name: {
                type: String,
            },
            count: {
                type: Number,
            }
        }
    ],
});

module.exports = mongoose.model('Cartridge', cartridgeSchema);