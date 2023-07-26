const Company = require('../models/Company');

// Create a new company
const createCompany = async (req, res) => {
  console.log(req.body)
  try {
    const company = new Company({
      ...req.body,
    });
    await company.save();
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single company by ID
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a company by ID
const updateCompanyById = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a company by ID
const deleteCompanyById = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company deleted', data: deletedCompany });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
};
