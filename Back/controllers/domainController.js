const Domain = require('../models/Domain');

// Create a new domain
const createDomain = async (req, res) => {
  try {
    const domain = new Domain({
      ...req.body,
    });
    await domain.save();
    res.json(domain);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all domains
const getAllDomains = async (req, res) => {
  try {
    const domains = await Domain.find();
    res.json(domains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single domain by ID
const getDomainById = async (req, res) => {
  try {
    const domain = await Domain.findById(req.params.id);
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.json(domain);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a domain by ID
const updateDomainById = async (req, res) => {
  try {
    const domain = await Domain.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.json(domain);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a domain by ID
const deleteDomainById = async (req, res) => {
  try {
    const deletedDomain = await Domain.findByIdAndDelete(req.params.id);
    if (!deletedDomain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.json({ message: 'Domain deleted', data: deletedDomain });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createDomain,
  getAllDomains,
  getDomainById,
  updateDomainById,
  deleteDomainById,
};