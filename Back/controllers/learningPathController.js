const mongoose = require("mongoose")
const LearningPath = require('../models/LearningPath');


const multer = require("multer")
const upload = multer();


// Create a new learning path
const createLearningPath = async (req, res) => {
  try {
    const learningPath = new LearningPath(req.body);
    console.log(learningPath)
    await learningPath.save();
    res.json(learningPath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all learning paths
const getAllLearningPaths = async (req, res) => {
  try {
    const learningPaths = await LearningPath.find();
    res.json(learningPaths);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single learning path by ID
const getLearningPathById = async (req, res) => {
  try {
    const learningPath = await LearningPath.findById(req.params.id);
    if (!learningPath) {
      return res.status(404).json({ message: 'Learning path not found' });
    }
    res.json(learningPath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a learning path by ID
const updateLearningPath = async (req, res) => {
  try {
    const learningPath = await LearningPath.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!learningPath) {
      return res.status(404).json({ message: 'Learning path not found' });
    }
    res.json(learningPath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a learning path by ID
const deleteLearningPathById = async (req, res) => {
  try {
    const deletedLearningPath = await LearningPath.findByIdAndDelete(req.params.id);
    if (!deletedLearningPath) {
      return res.status(404).json({ message: 'Learning path not found' });
    }
    res.json({ message: 'Learning path deleted', data: deletedLearningPath });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createLearningPath,
  getAllLearningPaths,
  getLearningPathById,
  updateLearningPath,
  deleteLearningPathById,
};
