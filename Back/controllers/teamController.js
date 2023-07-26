const { Team } = require('../models/Team');

// Create a new team
const createTeam = async (req, res) => {
  try {
    const team = new Team({
      ...req.body,
    });
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single team by ID
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a team by ID
const updateTeamById = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a team by ID
const deleteTeamById = async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: 'Team deleted', data: deletedTeam });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
};