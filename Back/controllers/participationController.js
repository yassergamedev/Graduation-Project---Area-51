const ParticipationCompetition = require('../models/ParticipationCompetiton');

// Create a new participation
const createParticipation = async (req, res) => {
  console.log(req.body)
  try {
    const participation = new ParticipationCompetition({
      ...req.body,
    });
    await participation.save();
    res.json(participation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all participations
const getAllParticipations = async (req, res) => {
  try {
    const participations = await ParticipationCompetition.find();
    res.json(participations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single participation by ID
const getParticipationById = async (req, res) => {
  try {
    const participation = await ParticipationCompetition.findById(req.params.id);
    if (!participation) {
      return res.status(404).json({ message: 'Participation not found' });
    }
    res.json(participation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a participation by ID
const updateParticipationById = async (req, res) => {
  try {
    const participation = await ParticipationCompetition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!participation) {
      return res.status(404).json({ message: 'Participation not found' });
    }
    res.json(participation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a participation by ID
const deleteParticipationById = async (req, res) => {
  try {
    const deletedParticipation = await ParticipationCompetition.findByIdAndDelete(req.params.id);
    if (!deletedParticipation) {
      return res.status(404).json({ message: 'Participation not found' });
    }
    res.json({ message: 'Participation deleted', data: deletedParticipation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createParticipation,
  getAllParticipations,
  getParticipationById,
  updateParticipationById,
  deleteParticipationById,
};