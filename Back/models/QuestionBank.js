const mongoose = require('mongoose');
const Question = require('./Question');

const questionBankSchema = new mongoose.Schema({
  name: { type: String, required: true },

  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

const QuestionBank = mongoose.model('QuestionBank', questionBankSchema);

module.exports = QuestionBank;
