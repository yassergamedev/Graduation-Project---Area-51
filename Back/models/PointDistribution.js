const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointDistributionSchema = new Schema({
  position: {
    type: Number,
    required: true
  },
  learningPoints: {
    type: Number,
    required: true
  },
  practicePoints: {
    type: Number,
    required: true
  },
  coins: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('PointDistribution', pointDistributionSchema);
