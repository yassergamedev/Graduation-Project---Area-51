const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  Input: {
    type: String,
    required: true,
  },
  Output: {
    type: String,
    required: true,
  },
});

const TestCase = mongoose.model('TestCase', testCaseSchema);

module.exports = { TestCase };
