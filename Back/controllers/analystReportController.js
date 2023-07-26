const  AnalystReport  = require('../models/AnalystReport');

// Create a new analyst report
const createAnalystReport = async (req, res) => {
  try {
    const analystReport = new AnalystReport({
      ...req.body,
    });
    await analystReport.save();
    res.json(analystReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all analyst reports
const getAllAnalystReports = async (req, res) => {
  try {
    const analystReports = await AnalystReport.find();
    res.json(analystReports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single analyst report by ID
const getAnalystReportById = async (req, res) => {
  try {
    const analystReport = await AnalystReport.findById(req.params.id);
    if (!analystReport) {
      return res.status(404).json({ message: 'Analyst report not found' });
    }
    res.json(analystReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an analyst report by ID
const updateAnalystReportById = async (req, res) => {
  try {
    const analystReport = await AnalystReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!analystReport) {
      return res.status(404).json({ message: 'Analyst report not found' });
    }
    res.json(analystReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an analyst report by ID
const deleteAnalystReportById = async (req, res) => {
  try {
    const deletedAnalystReport = await AnalystReport.findByIdAndDelete(req.params.id);
    if (!deletedAnalystReport) {
      return res.status(404).json({ message: 'Analyst report not found' });
    }
    res.json({ message: 'Analyst report deleted', data: deletedAnalystReport });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAnalystReport,
  getAllAnalystReports,
  getAnalystReportById,
  updateAnalystReportById,
  deleteAnalystReportById,
};
