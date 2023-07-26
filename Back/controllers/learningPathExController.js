const { LearningPathEx } = require('../models/LearningPathEx');

// Create a new learning path extension
const createLearningPathEx = async (req, res) => {
  try {
    const learningPathEx = new LearningPathEx({
      ...req.body,
    });
    await learningPathEx.save();
    res.json(learningPathEx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all learning path extensions
const getAllLearningPathEx = async (req, res) => {
  try {
    const learningPathExs = await LearningPathEx.find();
    res.json(learningPathExs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single learning path extension by ID
const getLearningPathExById = async (req, res) => {
  try {
    const learningPathEx = await LearningPathEx.findById(req.params.id);
    if (!learningPathEx) {
      return res.status(404).json({ message: 'Learning path extension not found' });
    }
    res.json(learningPathEx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a learning path extension by ID
const updateLearningPathExById = async (req, res) => {
  try {
    const learningPathEx = await LearningPathEx.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!learningPathEx) {
      return res.status(404).json({ message: 'Learning path extension not found' });
    }
    res.json(learningPathEx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a learning path extension by ID
const deleteLearningPathExById = async (req, res) => {
  try {
    const deletedLearningPathEx = await LearningPathEx.findByIdAndDelete(req.params.id);
    if (!deletedLearningPathEx) {
      return res.status(404).json({ message: 'Learning path extension not found' });
    }
    res.json({ message: 'Learning path extension deleted', data: deletedLearningPathEx });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createLearningPathEx,
  getAllLearningPathEx,
  getLearningPathExById,
  updateLearningPathExById,
  deleteLearningPathExById,
};