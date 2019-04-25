const mongoose = require('mongoose');

const contractPrintersInvoiceSchema = new mongoose.Schema({

  clientName: String,
  clientOrganization: String,
  ownerName: String,

  items: [
    {
      description: String,
      units: String,
      amount: Number,
      price: Number,
      itemSumm: Number,
    },
  ],
  invoiceSumm: Number,
  NDS: Number,
  totalSumm: Number,

});

module.exports = mongoose.model('Invoice', contractPrintersInvoiceSchema);
