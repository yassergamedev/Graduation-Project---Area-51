const { Planning } = require('../models/Planning');

// Create a new planning
const createPlanning = async (req, res) => {
  try {
    const planning = new Planning({
      ...req.body,
    });
    await planning.save();
    res.json(planning);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all plannings
const getAllPlannings = async (req, res) => {
  try {
    const plannings = await Planning.find();
    res.json(plannings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single planning by ID
const getPlanningById = async (req, res) => {
  try {
    const planning = await Planning.findById(req.params.id);
    if (!planning) {
      return res.status(404).json({ message: 'Planning not found' });
    }
    res.json(planning);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a planning by ID
const updatePlanningById = async (req, res) => {
  try {
    const planning = await Planning.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!planning) {
      return res.status(404).json({ message: 'Planning not found' });
    }
    res.json(planning);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a planning by ID
const deletePlanningById = async (req, res) => {
  try {
    const deletedPlanning = await Planning.findByIdAndDelete(req.params.id);
    if (!deletedPlanning) {
      return res.status(404).json({ message: 'Planning not found' });
    }
    res.json({ message: 'Planning deleted', data: deletedPlanning });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPlanning,
  getAllPlannings,
  getPlanningById,
  updatePlanningById,
  deletePlanningById,
};