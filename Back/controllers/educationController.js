const { Education } = require('../models/Education');

// Create a new education
const createEducation = async (req, res) => {
  try {
    const education = new Education({
      ...req.body,
    });
    await education.save();
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all educations
const getAllEducations = async (req, res) => {
  try {
    const educations = await Education.find();
    res.json(educations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single education by ID
const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an education by ID
const updateEducationById = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an education by ID
const deleteEducationById = async (req, res) => {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducation) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.json({ message: 'Education deleted', data: deletedEducation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createEducation,
  getAllEducations,
  getEducationById,
  updateEducationById,
  deleteEducationById,
};