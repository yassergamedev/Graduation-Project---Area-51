const { Interview } = require('../models/Interview');

// Create a new interview
const createInterview = async (req, res) => {
  try {
    const interview = new Interview({
      ...req.body,
    });
    await interview.save();
    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all interviews
const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single interview by ID
const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an interview by ID
const updateInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an interview by ID
const deleteInterviewById = async (req, res) => {
  try {
    const deletedInterview = await Interview.findByIdAndDelete(req.params.id);
    if (!deletedInterview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.json({ message: 'Interview deleted', data: deletedInterview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createInterview,
  getAllInterviews,
  getInterviewById,
  updateInterviewById,
  deleteInterviewById,
};