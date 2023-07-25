const mongoose = require('mongoose');
const { SyntheticModule } = require('vm');

const { Schema } = mongoose;

const competitionSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  judgingCriteria: {
    type: String,
    required: false,
  },
  companies: [{
    type: String,
    required: false,
  }],
  domains: [{
    type: String,
    required: false,
  }],
  learningPoints: {
    type: Number,
    required: false,
  },
  practisePoints: {
    type: Number,
    required: false,
  },
  coins: {
    type: Number,
    required: false,
  },
  image :{
    type : String,
    required : false
  },
  prefferredDate:[{
    type : String,
    required: false
  }],
  date:[{
    type : String,
    required: false
  }],
  competitionType: {
    type: String,
    required: false,
    default : "solo"
  },
  competitionStatus: {
    type: String,
    required: false,
    default : "Pending"
  },
  teamLimit: {
    type: Number,
    required: false,
  },
  
  participants:[ {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  
  }],
  participations : [{ id:{
      type : mongoose.Schema.Types.ObjectId,
      required : false
  },
submission: { problems : [{
  type : Boolean,
  requiured : false
}],
questions :[{
  type : Boolean,
  required : false
}],
debug :{
  type : String,
}
},
debugEval : {
  type : Number,
  required : false
},
time :{
  type : Number,
  required : false
}
}],


  prizePool:[{
  rank : {
    type: String,
    required: false,
  },
  coins : {
    type: String,
    required: false,
  },
  lp:{
    type: String,
    required: false,
  },
  pep:{
    type: String,
    required: false,
  }}],
  design: {
    type: String,
    required: false,
  },
  problems: [{
    type: Object,
   
    required: false,
  },
{
  type : Number,
  required : false
}],
  problemsTime: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  problemsSubmissions: {
    type: Number,
    required: false,
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: false,
  }],
  questionsTime: {
    type: Number,
    required: false,
  },
  debug: {
    type: String,
    required: false,
  },
  debugTime: {
    type: Number,
    required: false,
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: false,
  }],
  numParticipants: {
    type: Number,
    required: false,
  },
  competitionStatus: {
    type: String,
    required: false,
  },
  leaderboard: {
    type: Schema.Types.ObjectId,
    ref: 'CompetitionLeaderboard',
    required: false,
  },
  dateCreation: {
    type: Date,
    required: false,
  },
});

const Competition = mongoose.model('Competition', competitionSchema);

module.exports = {
  Competition,
};
