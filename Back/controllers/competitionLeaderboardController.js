const { CompetitionLeaderboard } = require('../models/competitionLeaderboard');

// Create a new competition leaderboard
const createCompetitionLeaderboard = async (req, res) => {
  try {
    const competitionLeaderboard = new CompetitionLeaderboard({
      ...req.body,
    });
    await competitionLeaderboard.save();
    res.json(competitionLeaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all competition leaderboards
const getAllCompetitionLeaderboards = async (req, res) => {
  try {
    const competitionLeaderboards = await CompetitionLeaderboard.find();
    res.json(competitionLeaderboards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single competition leaderboard by ID
const getCompetitionLeaderboardById = async (req, res) => {
  try {
    const competitionLeaderboard = await CompetitionLeaderboard.findById(req.params.id);
    if (!competitionLeaderboard) {
      return res.status(404).json({ message: 'Competition leaderboard not found' });
    }
    res.json(competitionLeaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a competition leaderboard by ID
const updateCompetitionLeaderboardById = async (req, res) => {
  try {
    const competitionLeaderboard = await CompetitionLeaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!competitionLeaderboard) {
      return res.status(404).json({ message: 'Competition leaderboard not found' });
    }
    res.json(competitionLeaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a competition leaderboard by ID
const deleteCompetitionLeaderboardById = async (req, res) => {
  try {
    const deletedCompetitionLeaderboard = await CompetitionLeaderboard.findByIdAndDelete(req.params.id);
    if (!deletedCompetitionLeaderboard) {
      return res.status(404).json({ message: 'Competition leaderboard not found' });
    }
    res.json({ message: 'Competition leaderboard deleted', data: deletedCompetitionLeaderboard });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCompetitionLeaderboard,
  getAllCompetitionLeaderboards,
  getCompetitionLeaderboardById,
  updateCompetitionLeaderboardById,
  deleteCompetitionLeaderboardById,
};