const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  finishDate: {
    type: Date,
    required: true,
  },
  Developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer',
    required: true,
  },
  CompanyRecruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyRecruiter',
    required: true,
  },
});

const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = { Interview };
