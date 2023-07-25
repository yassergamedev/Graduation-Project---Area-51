const mongoose = require('mongoose');

const devSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String
});

const devModel = mongoose.model('Developer', devSchema);

module.exports = {devModel, devSchema};
