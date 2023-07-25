const mongoose = require('mongoose');
const {tagSchema} = require('./Tags')
const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  description: {
    type: String,
    required: true,
  },
  boilerplate:{
    type: String,
    required : true,
    default: ""
  },
  companies:{
    type: [String],
    required : false,
  },
  domains:{
    type: [String],
    required : false,
  },
  learningPoints:{
    type: Number,
    required : false,
  },
  practisePoints:{
    type: Number,
    required : false,
  },
  coins:{
    type: Number,
    required : false,
  },
   
  judge:{
    type: String,
    required : true,
    default : ""
  }
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = { Problem };
