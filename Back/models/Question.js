const mongoose = require('mongoose');
const {tagSchema} = require("./Tags")
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: true
  },
  possibleAnswers: {
    type: [String],
    required: true
  },
  rightAnswers: {
    type: [Number],
    required: false
  },
  creatorUsername: {
    type: String,
    required: false
  },
  name:{
    type : String,
    required : false
  },
  
  creationDate: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  domains:{
    type : [String],
    required : false
  }
});



module.exports = mongoose.model('Question', questionSchema);
