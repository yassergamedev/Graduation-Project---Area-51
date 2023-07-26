const {Tag} = require('../models/Tags');

// Create a new tag
const createTag = async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single tag by ID
const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a tag by ID
const updateTagById = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a tag by ID
const deleteTagById = async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    if (!deletedTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted', data: deletedTag });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTagById,
  deleteTagById,
};
