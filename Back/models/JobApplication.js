const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  motivation_letter: {
    type: String,
    required: true,
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer',
    required: true,
  },
  jobOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobOffer',
    required: true,
  },
});

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);

module.exports = {
  JobApplication,
};
