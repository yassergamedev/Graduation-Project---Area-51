const { Quest } = require('../models/Quest');

// Create a new quest
const createQuest = async (req, res) => {
  try {
    const quest = new Quest({
      ...req.body,
    });
    await quest.save();
    res.json(quest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all quests
const getAllQuests = async (req, res) => {
  try {
    const quests = await Quest.find();
    res.json(quests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single quest by ID
const getQuestById = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    res.json(quest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a quest by ID
const updateQuestById = async (req, res) => {
  try {
    const quest = await Quest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    res.json(quest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a quest by ID
const deleteQuestById = async (req, res) => {
  try {
    const deletedQuest = await Quest.findByIdAndDelete(req.params.id);
    if (!deletedQuest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    res.json({ message: 'Quest deleted', data: deletedQuest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createQuest,
  getAllQuests,
  getQuestById,
  updateQuestById,
  deleteQuestById,
};