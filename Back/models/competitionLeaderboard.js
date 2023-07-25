const mongoose = require('mongoose');

const competitionLeaderboardSchema = new mongoose.Schema({
  leaderboardInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Leaderboard',
    required: true,
  },
  pointsDistributions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PointsDistribution',
    required: true,
  }],
});

const CompetitionLeaderboard = mongoose.model('CompetitionLeaderboard', competitionLeaderboardSchema);

module.exports = { CompetitionLeaderboard };
