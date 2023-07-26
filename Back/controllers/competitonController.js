const { Competition } = require('../models/Competition');

// Create a new competition
const createCompetition = async (req, res) => {
  try {
    const competition = new Competition({
      ...req.body,
    });
    await competition.save();
    res.json(competition);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all competitions
const getAllCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find();
    res.json(competitions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single competition by ID
const getCompetitionById = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.json(competition);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a competition by ID
const updateCompetitionById = async (req, res) => {
  try {
    const competition = await Competition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.json(competition);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a competition by ID
const deleteCompetitionById = async (req, res) => {
  try {
    const deletedCompetition = await Competition.findByIdAndDelete(req.params.id);
    if (!deletedCompetition) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.json({ message: 'Competition deleted', data: deletedCompetition });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get competitions by user ID
const getCompetitionsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const competitions = await Competition.find({ userId });
    res.json(competitions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCompetition,
  getAllCompetitions,
  getCompetitionById,
  updateCompetitionById,
  deleteCompetitionById,
  getCompetitionsByUserId,
};
