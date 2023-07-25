const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objectiveSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false
  },
  learningPoints: {
    type: Number,
    required: true,
    default: 0
  },
  practicePoints: {
    type: Number,
    required: true,
    default: 0
  },
  coins: {
    type: Number,
    required: true,
    default: 0
  }
});

const Objective = mongoose.model('Objective', objectiveSchema);

module.exports = Objective;
