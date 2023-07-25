const mongoose = require('mongoose');

const JobOfferSchema = new mongoose.Schema({
  title: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  image:{
    type : String
  },
  company : {
    type : String
  },
  coins : {
    type: Number
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },

  domains: {
    type: [String],
    
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: false,
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobApplication',
  }],
});

const JobOffer = mongoose.model('JobOffer', JobOfferSchema);

module.exports = JobOffer;
