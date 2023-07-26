const Announce = require('../models/Announce');

// Create a new announce
const createAnnounce = async (req, res) => {
  try {
    const announce = new Announce({
      ...req.body,
    });
    await announce.save();
    res.json(announce);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all announces
const getAllAnnounces = async (req, res) => {
  try {
    const announces = await Announce.find();
    res.json(announces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single announce by ID
const getAnnounceById = async (req, res) => {
  try {
    const announce = await Announce.findById(req.params.id);
    if (!announce) {
      return res.status(404).json({ message: 'Announce not found' });
    }
    res.json(announce);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an announce by ID
const updateAnnounceById = async (req, res) => {
  try {
    const announce = await Announce.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!announce) {
      return res.status(404).json({ message: 'Announce not found' });
    }
    res.json(announce);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an announce by ID
const deleteAnnounceById = async (req, res) => {
  try {
    const deletedAnnounce = await Announce.findByIdAndDelete(req.params.id);
    if (!deletedAnnounce) {
      return res.status(404).json({ message: 'Announce not found' });
    }
    res.json({ message: 'Announce deleted', data: deletedAnnounce });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAnnounce,
  getAllAnnounces,
  getAnnounceById,
  updateAnnounceById,
  deleteAnnounceById,
};