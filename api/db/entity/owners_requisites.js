const mongoose = require('mongoose');

const ownersRequisitesSchema = new mongoose.Schema({

  organizationName:{
    type: String,
  },
  director: {
    type: String,
  },
  ownerAddress: {
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

module.exports = mongoose.model('OwnersRequisites', ownersRequisitesSchema);
