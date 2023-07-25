const mongoose = require('mongoose');



const questSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  objectives: [{
    type :mongoose.Schema.Types.ObjectId,
    ref : 'Objective'
  }],
  learning_points: {
    type: Number,
    required: true
  },
  practise_points: {
    type: Number,
    required: true
  },
  coins: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Quest', questSchema);
