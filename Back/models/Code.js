const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // the code will expire after 5 minutes
  },
});

module.exports = mongoose.model('Code', CodeSchema);
