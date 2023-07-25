const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  university: { type: String, required: true },
  major: { type: String, required: true },
  specialty: { type: String },
  diploma: { type: String, required: true },
  graduation: { type: Date, required: true },
});

const Education = mongoose.model('Education', educationSchema);

module.exports = { Education };
