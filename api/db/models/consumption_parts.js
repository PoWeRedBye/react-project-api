const mongoose = require('mongoose');

const consumptionPartShema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'code is required']
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required']
    },
    invoice_number: {
        type: String,
    },
    date: {
        type: String,
    },
    user: {
        type: String,
    },
});

module.exports = mongoose.model('ConsumptionPart', consumptionPartShema);