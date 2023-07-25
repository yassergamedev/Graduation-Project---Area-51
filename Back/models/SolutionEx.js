const mongoose = require('mongoose');

const solutionExSchema = new mongoose.Schema({
  Content: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  coins: {
    type: Number,
    required: true,
    default: 0
  }
});

const SolutionEx = mongoose.model('SolutionEx', solutionExSchema);

module.exports = { SolutionEx };
