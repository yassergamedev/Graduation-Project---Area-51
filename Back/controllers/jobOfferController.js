const mongoose = require("mongoose")
const  JobOffer  = require('../models/JobOffer');

// Create a new job offer
const createJobOffer = async (req, res) => {
  try {
    const jobOffer = new JobOffer({
      ...req.body,
    });
    await jobOffer.save();
    res.json(jobOffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all job offers
const getAllJobOffers = async (req, res) => {
  try {
    const jobOffers = await JobOffer.find({});
    res.json(jobOffers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single job offer by ID
const getJobOfferById = async (req, res) => {
  try {
    const jobOffer = await JobOffer.findById(req.params.id);
    if (!jobOffer) {
      return res.status(404).json({ message: 'Job offer not found' });
    }
    res.json(jobOffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a job offer by ID
const updateJobOfferById = async (req, res) => {
  try {
    const jobOffer = await JobOffer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!jobOffer) {
      return res.status(404).json({ message: 'Job offer not found' });
    }
    res.json(jobOffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a job offer by ID
const deleteJobOfferById = async (req, res) => {
  try {
    const deletedJobOffer = await JobOffer.findByIdAndDelete(req.params.id);
    if (!deletedJobOffer) {
      return res.status(404).json({ message: 'Job offer not found' });
    }
    res.json({ message: 'Job offer deleted', data: deletedJobOffer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createJobOffer,
  getAllJobOffers,
  getJobOfferById,
  updateJobOfferById,
  deleteJobOfferById,
};