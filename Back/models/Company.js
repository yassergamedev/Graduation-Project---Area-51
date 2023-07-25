const mongoose = require('mongoose')
const companySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
  });
  
  // Define Company enum model
  module.exports = mongoose.model('Company', companySchema);
 