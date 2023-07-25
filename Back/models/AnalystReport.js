const mongoose = require('mongoose');

const analystReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  creator: {
    type : mongoose.Schema.Types.ObjectId,
    required: true
  },
  description: {
    type : String,
    required: true
  },
  image: {
    type : String,
    required: true
  },
  type: {
    type : String,
    required: true
  },

  content: {
    type: String , // assuming the PDF file will be stored as a binary buffer
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});


module.exports = mongoose.model('AnalystReport', analystReportSchema);
