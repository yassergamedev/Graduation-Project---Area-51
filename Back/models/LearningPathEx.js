const mongoose = require('mongoose');

const learningPathExSchema = new mongoose.Schema({
  learning_path: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningPath',
    required: true,
  },
  coins: {
    type: Number,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true,
  },
});

const LearningPathEx = mongoose.model('LearningPathEx', learningPathExSchema);

module.exports = { LearningPathEx };
