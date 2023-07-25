const mongoose = require('mongoose');

const announceSchema = new mongoose.Schema({


  priority:{
    type : String,
    default : "nothing"
  },

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,

  },
  cover : {
    type : String,

  },
  content: {
    type: String,

  },
  date: {
    type: Date,
    default: Date.now
  },
  creator:{
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('Announce', announceSchema);
