const { JobApplication } = require('../models/JobApplication');

// Create a new job application
const createJobApplication = async (req, res) => {
  try {
    const jobApplication = new JobApplication({
      ...req.body,
    });
    await jobApplication.save();
    res.json(jobApplication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all job applications
const getAllJobApplications = async (req, res) => {
  try {
    const jobApplications = await JobApplication.find();
    res.json(jobApplications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single job application by ID
const getJobApplicationById = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id);
    if (!jobApplication) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.json(jobApplication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a job application by ID
const updateJobApplicationById = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!jobApplication) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.json(jobApplication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a job application by ID
const deleteJobApplicationById = async (req, res) => {
  try {
    const deletedJobApplication = await JobApplication.findByIdAndDelete(req.params.id);
    if (!deletedJobApplication) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.json({ message: 'Job application deleted', data: deletedJobApplication });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  updateJobApplicationById,
  deleteJobApplicationById,
};