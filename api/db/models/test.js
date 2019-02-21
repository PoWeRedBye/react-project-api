const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  test_name: String,
});

module.exports = mongoose.model('Test', testSchema);
