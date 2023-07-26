const { RegistrationApplication } = require('../models/RegistrationApplication');

// Create a new registration application
const createRegistrationApplication = async (req, res) => {
  try {
    const registrationApplication = new RegistrationApplication({
      ...req.body,
    });
    await registrationApplication.save();
    res.json(registrationApplication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all registration applications
const getAllRegistrationApplications = async (req, res) => {
  try {
    const registrationApplications = await RegistrationApplication.find();
    res.json(registrationApplications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single registration application by ID
const getRegistrationApplicationById = async (req, res) => {
  try {
    const registrationApplication = await RegistrationApplication.findById(req.params.id);
    if (!registrationApplication) {
      return res.status(404).json({ message: 'Registration application not found' });
    }
    res.json(registrationApplication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a registration application by ID
const updateRegistrationApplicationById = async (req, res) => {
  try {
    const registrationApplication = await RegistrationApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!registrationApplication) {
      return res.status(404).json({ message: 'Registration application not found' });
    }
    res.json(registrationApplication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a registration application by ID
const deleteRegistrationApplicationById = async (req, res) => {
  try {
    const deletedRegistrationApplication = await RegistrationApplication.findByIdAndDelete(req.params.id);
    if (!deletedRegistrationApplication) {
      return res.status(404).json({ message: 'Registration application not found' });
    }
    res.json({ message: 'Registration application deleted', data: deletedRegistrationApplication });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRegistrationApplication,
  getAllRegistrationApplications,
  getRegistrationApplicationById,
  updateRegistrationApplicationById,
  deleteRegistrationApplicationById,
};