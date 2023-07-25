const mongoose = require('mongoose');
const { Education } = require('./Education');

const registrationApplicationSchema = new mongoose.Schema({
  userInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  education: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Education',
    required: true,
  },
  resume: {
    type: Buffer,
    ref: 'Resume',
    required: true,
  },
});

const RegistrationApplication = mongoose.model('RegistrationApplication', registrationApplicationSchema);

module.exports = { RegistrationApplication };
