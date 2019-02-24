const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema(
  {
    client: String,
    items: [{
      item_name: String,
      item_amount: Number,
    }],
    delivery_descriptions: String,
    date: {
      type: Date,
      default: Date.now(),
    },
    inOffice: Boolean,
    finished: Boolean,
    // TODO: maybe this is work, but need to be checked
    // createdAt: { type: Date, expires: '30d', default: Date.now }
    //
  },
  {
    timestamps: true,
  },
);

deliverySchema.createIndex(
  { createdAt: Date.now() },
  { expireAfterSeconds: 60*60*24*30 /* 2592000 => 30 days live */ },
); // need to be checked!!!

module.exports = mongoose.model('Delivery', deliverySchema);
