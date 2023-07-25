const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,

  },
  firstname: {
    type: String,

  },
  lastname: {
    type: String,

  },
  wilaya: {
    type: String,

  },
  email: {
    type: String,

   
  },
  password: {
    type: String,

  },
  avatar: {
    type: String,

  },
  birthdate: {
    type: Date,

  },type: {
    type: String,

  },
  
  googleId:{
    type : String,
    required : false
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  
  recoveryQuestion: {
    type: String,

  },
  recoveryResponse: {
    type: String,

  },
  role : {
    type : String,

  },

  
  privilege: {
    type: String,

  },

  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AnalystReport'
    }
  ],
  domains:[ {
    type: String,

  }],

  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
  }],
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnalystReport',
  }],
  plannings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Planning',
  }],
  announces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announce',
  }],
  company: {
    type:String,
    ref: 'Company',
  },
  site: {
    type: String,
 
  },
  number: {
    type: Number,
  
  },
 
  job_offers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobOffer'
  }],
  interviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview'
  }],
  university: { type: String,  },
  major: { type: String,  },
  specialty: { type: String },
  level: { type: String,  },
  gradYear: { type: Date, },
  learning_points: {
    type: Number,
    required: true,
    default: 0,
  },
  practise_points: {
    type: Number,
    required: true,
    default: 0,
  },
  coins: {
    type: Number,
    required: true,
    default: 0,
  },
 
  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
    },
  ],
  submissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
    },
  ],
  competitions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Competition',
    },
  ],
  quests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quest',
    },
  ],
  interviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview',
    },
  ],
  job_applications: [{
    offer : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job Offer',
    },
    response : {
      type : String,
      default : 'pending'
    },
    message  : {
      type : String,
      default : 'No Message Yet'
    }
}],
  learning_paths: [{
    lp : {
      type:Object,
      default:{}
    },
    progress:{
      type : Boolean,
      default : false
    }
    
  
}],
  liked_learning_paths: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LearningPath',
    },
  ],
  learning_paths_managed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningPath',
  }],
  
  questions_created: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],
  challenges_created: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
  }],
  modules_created: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
  }],
  reports_created: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analyst Report',
  }],
  problems_created: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
  }],
  competitions_created: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
  }],
  job_offers_created: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobOffer',
  }],
  exclusive_lp: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningPathEx',
  }],
  exclusive_p: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProblemEx',
  }],

});

module.exports = mongoose.model('User', userSchema);
