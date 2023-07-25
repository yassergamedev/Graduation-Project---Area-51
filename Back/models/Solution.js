const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const Solution = mongoose.model('Solution', solutionSchema);

module.exports = Solution;
