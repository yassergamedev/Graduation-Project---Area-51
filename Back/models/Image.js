const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', ImageSchema);
