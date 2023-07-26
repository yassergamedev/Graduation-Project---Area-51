const { ProblemEx } = require('../models/ProblemEx');

// Create a new problem extension
const createProblemEx = async (req, res) => {
  try {
    const problemEx = new ProblemEx({
      ...req.body,
    });
    await problemEx.save();
    res.json(problemEx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all problem extensions
const getAllProblemEx = async (req, res) => {
  try {
    const problemExs = await ProblemEx.find();
    res.json(problemExs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single problem extension by ID
const getProblemExById = async (req, res) => {
  try {
    const problemEx = await ProblemEx.findById(req.params.id);
    if (!problemEx) {
      return res.status(404).json({ message: 'Problem extension not found' });
    }
    res.json(problemEx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a problem extension by ID
const updateProblemExById = async (req, res) => {
  try {
    const problemEx = await ProblemEx.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!problemEx) {
      return res.status(404).json({ message: 'Problem extension not found' });
    }
    res.json(problemEx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a problem extension by ID
const deleteProblemExById = async (req, res) => {
  try {
    const deletedProblemEx = await ProblemEx.findByIdAndDelete(req.params.id);
    if (!deletedProblemEx) {
      return res.status(404).json({ message: 'Problem extension not found' });
    }
    res.json({ message: 'Problem extension deleted', data: deletedProblemEx });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProblemEx,
  getAllProblemEx,
  getProblemExById,
  updateProblemExById,
  deleteProblemExById,
};