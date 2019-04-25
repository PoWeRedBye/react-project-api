const mongoose = require('mongoose');

const clientRequisitesSchema = new mongoose.Schema({

  organizationName:{
    type: String,
  },
  clientName: {
    type: String,
  },
  clientAddress: {
    type: String,
  },
  EDRPO_DRFO_code: {
    type: Number,
  },
  bankNumber: {
    type: Number,
  },
  bankName:{
    type: String,
  },
  MFO_code:{
    type: Number,
  },


});

module.exports = mongoose.model('ClientRequisites', clientRequisitesSchema);
