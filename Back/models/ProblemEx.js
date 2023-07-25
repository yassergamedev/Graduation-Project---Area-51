const mongoose = require('mongoose');

const { Schema } = mongoose;

const problemExSchema = new Schema({
  problem: {
    type: Schema.Types.ObjectId,
    ref: 'Problem',
    required: true,
  },
  coins: {
    type: Number,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true,
  },
  solution: {
    type: Schema.Types.ObjectId,
    ref: 'Solution',
    required: true,
  },
});

const ProblemEx = mongoose.model('ProblemEx', problemExSchema);

module.exports = {
  ProblemEx,
};
