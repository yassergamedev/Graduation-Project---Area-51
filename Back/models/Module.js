const mongoose = require('mongoose');
const { Schema } = mongoose;

const moduleSchema = new Schema({
  name: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  domains:[ {
    type: String,
    
  }],
  creationDate: {
    type: Date,
    default : Date.now()
  },
  content: {
    type: String,
    
  },
 
  creator: {
    type: mongoose.Schema.Types.ObjectId
    ,
    ref : 'User'
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      
    }
  ]
});

module.exports = mongoose.model('Module', moduleSchema);
