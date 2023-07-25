const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  
  Result: {
    type: String,
    required: true,
  },
 
});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = { Evaluation };
