const { SolutionEx } = require('../models/SolutionEx');

// Create a new solution extension
const createSolutionEx = async (req, res) => {
  try {
    const solutionEx = new SolutionEx({
      ...req.body,
    });
    await solutionEx.save();
    res.json(solutionEx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all solution extensions
const getAllSolutionEx = async (req, res) => {
  try {
    const solutionExs = await SolutionEx.find();
    res.json(solutionExs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single solution extension by ID
const getSolutionExById = async (req, res) => {
  try {
    const solutionEx = await SolutionEx.findById(req.params.id);
    if (!solutionEx) {
      return res.status(404).json({ message: 'Solution extension not found' });
    }
    res.json(solutionEx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a solution extension by ID
const updateSolutionExById = async (req, res) => {
  try {
    const solutionEx = await SolutionEx.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!solutionEx) {
      return res.status(404).json({ message: 'Solution extension not found' });
    }
    res.json(solutionEx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a solution extension by ID
const deleteSolutionExById = async (req, res) => {
  try {
    const deletedSolutionEx = await SolutionEx.findByIdAndDelete(req.params.id);
    if (!deletedSolutionEx) {
      return res.status(404).json({ message: 'Solution extension not found' });
    }
    res.json({ message: 'Solution extension deleted', data: deletedSolutionEx });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSolutionEx,
  getAllSolutionEx,
  getSolutionExById,
  updateSolutionExById,
  deleteSolutionExById,
};