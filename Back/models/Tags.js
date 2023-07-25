const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  domaine: [{
    type: String,
    required: false,
  }],
  entreprise: [{
    type: String,
    required: false,
  }],
  learning_points: {
    type: Number,
    required: false,
  },
  practice_points: {
    type: Number,
    required: false,
  },
  coins: {
    type: Number,
    required: false,
  },
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports ={ Tag,
    tagSchema};
