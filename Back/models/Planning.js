const mongoose = require('mongoose');

const planningSchema = new mongoose.Schema({
  beginTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
});

const Planning = mongoose.model('Planning', planningSchema);

module.exports = {
  Planning
};
