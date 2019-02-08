const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    item: String,
    amount: {
      type: Number,
      default: 1,
    },
    date: {
      type: Date,
      default: Date.now(),  // текущий момент времени
    },
    inOffice: Boolean,
    deliver_in: String,
    deliver_out: String,
    // TODO: maybe this is work, but need to be checked
    // createdAt: { type: Date, expires: '30d', default: Date.now }
    //
  },
  {
    timestamps: true
  });

deliverySchema.createIndex({createdAt: Date.now()}, {expireAfterSeconds: 2592000 /* 30 days live */}); // need to be checked!!!

module.exports = mongoose.model('Delivery', deliverySchema);
