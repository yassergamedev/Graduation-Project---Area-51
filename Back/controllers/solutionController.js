const { Solution } = require('../models/Solution');

// Create a new solution
const createSolution = async (req, res) => {
  try {
    const solution = new Solution(req.body);
    await solution.save();
    res.json(solution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all solutions
const getAllSolutions = async (req, res) => {
  try {
    const solutions = await Solution.find();
    res.json(solutions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single solution by ID
const getSolutionById = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }
    res.json(solution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a solution by ID
const updateSolutionById = async (req, res) => {
  try {
    const solution = await Solution.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }
    res.json(solution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a solution by ID
const deleteSolutionById = async (req, res) => {
  try {
    const deletedSolution = await Solution.findByIdAndDelete(req.params.id);
    if (!deletedSolution) {
      return res.status(404).json({ message: 'Solution not found' });
    }
    res.json({ message: 'Solution deleted', data: deletedSolution });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSolution,
  getAllSolutions,
  getSolutionById,
  updateSolutionById,
  deleteSolutionById,
};
