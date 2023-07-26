const { PointDistribution } = require('../models/PointDistribution');

// Create a new points distribution
const createPointDistribution = async (req, res) => {
  try {
    const PointDistribution = new PointDistribution({
      ...req.body,
    });
    await PointDistribution.save();
    res.json(PointDistribution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all points distributions
const getAllPointDistributions = async (req, res) => {
  try {
    const PointDistributions = await PointDistribution.find();
    res.json(PointDistributions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single points distribution by ID
const getPointDistributionById = async (req, res) => {
  try {
    const PointDistribution = await PointDistribution.findById(req.params.id);
    if (!PointDistribution) {
      return res.status(404).json({ message: 'Points distribution not found' });
    }
    res.json(PointDistribution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a points distribution by ID
const updatePointDistributionById = async (req, res) => {
  try {
    const PointDistribution = await PointDistribution.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!PointDistribution) {
      return res.status(404).json({ message: 'Points distribution not found' });
    }
    res.json(PointDistribution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a points distribution by ID
const deletePointDistributionById = async (req, res) => {
  try {
    const deletedPointDistribution = await PointDistribution.findByIdAndDelete(req.params.id);
    if (!deletedPointDistribution) {
      return res.status(404).json({ message: 'Points distribution not found' });
    }
    res.json({ message: 'Points distribution deleted', data: deletedPointDistribution });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPointDistribution,
  getAllPointDistributions,
  getPointDistributionById,
  updatePointDistributionById,
  deletePointDistributionById,
};