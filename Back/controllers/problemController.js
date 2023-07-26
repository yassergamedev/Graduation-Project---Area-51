const { Problem } = require('../models/Problems');

// Create a new problem
const createProblem = async (req, res) => {
  try {
    const problem = new Problem({
      ...req.body,
    });
    await problem.save();
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all problems
const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single problem by ID
const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a problem by ID
const updateProblemById = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a problem by ID
const deleteProblemById = async (req, res) => {
  try {
    const deletedProblem = await Problem.findByIdAndDelete(req.params.id);
    if (!deletedProblem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json({ message: 'Problem deleted', data: deletedProblem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblemById,
  deleteProblemById,
};