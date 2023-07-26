const { PointDistribution } = require('../models/PointDistribution');

// Create a new point distribution
const createPointDistribution = async (req, res) => {
  try {
    const pointDistribution = new PointDistribution({
      ...req.body,
    });
    await pointDistribution.save();
    res.json(pointDistribution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all point distributions
const getAllPointDistributions = async (req, res) => {
  try {
    const pointDistributions = await PointDistribution.find();
    res.json(pointDistributions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single point distribution by ID
const getPointDistributionById = async (req, res) => {
  try {
    const pointDistribution = await PointDistribution.findById(req.params.id);
    if (!pointDistribution) {
      return res.status(404).json({ message: 'Point distribution not found' });
    }
    res.json(pointDistribution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a point distribution by ID
const updatePointDistributionById = async (req, res) => {
  try {
    const pointDistribution = await PointDistribution.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pointDistribution) {
      return res.status(404).json({ message: 'Point distribution not found' });
    }
    res.json(pointDistribution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a point distribution by ID
const deletePointDistributionById = async (req, res) => {
  try {
    const deletedPointDistribution = await PointDistribution.findByIdAndDelete(req.params.id);
    if (!deletedPointDistribution) {
      return res.status(404).json({ message: 'Point distribution not found' });
    }
    res.json({ message: 'Point distribution deleted', data: deletedPointDistribution });
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
