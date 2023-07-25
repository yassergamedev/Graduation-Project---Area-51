const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  developers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer',
  }],
  limit: {
    type: Number,
    required: true,
  },
  ranking_direction: {
    type: Boolean,
    required: true,
  },
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = { Leaderboard };
