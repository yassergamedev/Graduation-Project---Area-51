const mongoose = require('mongoose')
const domainSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
  });
  
  // Define Company enum model
  module.exports = mongoose.model('Domain', domainSchema);
 