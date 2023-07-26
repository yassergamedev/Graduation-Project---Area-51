const { Leaderboard } = require('../models/Leaderboard');

// Create a new leaderboard
const createLeaderboard = async (req, res) => {
  try {
    const leaderboard = new Leaderboard({
      ...req.body,
    });
    await leaderboard.save();
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all leaderboards
const getAllLeaderboards = async (req, res) => {
  try {
    const leaderboards = await Leaderboard.find();
    res.json(leaderboards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single leaderboard by ID
const getLeaderboardById = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findById(req.params.id);
    if (!leaderboard) {
      return res.status(404).json({ message: 'Leaderboard not found' });
    }
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a leaderboard by ID
const updateLeaderboardById = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!leaderboard) {
      return res.status(404).json({ message: 'Leaderboard not found' });
    }
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a leaderboard by ID
const deleteLeaderboardById = async (req, res) => {
  try {
    const deletedLeaderboard = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!deletedLeaderboard) {
      return res.status(404).json({ message: 'Leaderboard not found' });
    }
    res.json({ message: 'Leaderboard deleted', data: deletedLeaderboard });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createLeaderboard,
  getAllLeaderboards,
  getLeaderboardById,
  updateLeaderboardById,
  deleteLeaderboardById,
};