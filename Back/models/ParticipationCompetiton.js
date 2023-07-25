const mongoose = require('mongoose');

const { Schema } = mongoose;

const ParticipationCompetitionSchema = new Schema({
  competition: {
    type: Schema.Types.ObjectId,
    ref: 'Competition',
    required: true,
  },
  developer: {
    type: Schema.Types.ObjectId,
    ref: 'Developer',
    required: true,
  },
  problemSubmissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Submission',
  }],
  questionSubmissions: [{
    type: Schema.Types.ObjectId,
    ref: 'QuestionSubmission',
  }],
  evaluation: {
    type: Number,
    required: true,
  },
});

const ParticipationCompetition = mongoose.model('ParticipationCompetition', ParticipationCompetitionSchema);

module.exports = ParticipationCompetition;
