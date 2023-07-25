const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  team_type: {
    type: String,
    required: true
  },
  team_members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer',
    required: true
  }]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = { Team };
