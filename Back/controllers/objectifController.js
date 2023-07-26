const { Objective } = require('../models/Objective');

// Create a new objective
const createObjective = async (req, res) => {
  try {
    const objective = new Objective({
      ...req.body,
    });
    await objective.save();
    res.json(objective);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all objectives
const getAllObjectives = async (req, res) => {
  try {
    const objectives = await Objective.find();
    res.json(objectives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single objective by ID
const getObjectiveById = async (req, res) => {
  try {
    const objective = await Objective.findById(req.params.id);
    if (!objective) {
      return res.status(404).json({ message: 'Objective not found' });
    }
    res.json(objective);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an objective by ID
const updateObjectiveById = async (req, res) => {
  try {
    const objective = await Objective.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!objective) {
      return res.status(404).json({ message: 'Objective not found' });
    }
    res.json(objective);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an objective by ID
const deleteObjectiveById = async (req, res) => {
  try {
    const deletedObjective = await Objective.findByIdAndDelete(req.params.id);
    if (!deletedObjective) {
      return res.status(404).json({ message: 'Objective not found' });
    }
    res.json({ message: 'Objective deleted', data: deletedObjective });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createObjective,
  getAllObjectives,
  getObjectiveById,
  updateObjectiveById,
  deleteObjectiveById,
};