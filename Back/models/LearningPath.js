const mongoose = require('mongoose');
const Image = require('./Image');




const learningPathSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  domains: [{
    type: String,
    
  }],
  learningPoints: {
    type: Number,
    
  },
  coins: {
    type: Number,
    
  },
  participationNum: {
    type: Number,
    default : 0
  },
  likedNum: {
    type: Number,
    default : 0
  },
  image: {
    type: String,
    
  },createdAt: {
    type: Date,
    default: Date.now
  },
  creator: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  mananger: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  modules: [{
    type: Object,
    ref: 'modules'
  },
{
  type : Number,
  default : 0
}]

});

const LearningPath = mongoose.model('LearningPath', learningPathSchema);

module.exports = LearningPath;
