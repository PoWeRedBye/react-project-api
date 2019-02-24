const mongoose = require('mongoose');

const delivery_items_schema = new mongoose.Schema({
  item_name: String,
  item_category: String,


});

module.exports = mongoose.model('delivery_item', delivery_items_schema);
