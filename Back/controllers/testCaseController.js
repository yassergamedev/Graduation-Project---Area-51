const { TestCase } = require('../models/TestCase');

// Create a new test case for a problem
const createTestCase = async (req, res) => {
  try {
    const testCase = new TestCase({
      ...req.body,
      Problem: req.params.problemId // assuming problemId is passed as a parameter in the URL
    });
    await testCase.save();
    res.json(testCase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all test cases for a problem
const getTestCasesByProblemId = async (req, res) => {
  try {
    const testCases = await TestCase.find({ Problem: req.params.problemId });
    res.json(testCases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single test case by ID
const getTestCaseById = async (req, res) => {
  try {
    const testCase = await TestCase.findById(req.params.id);
    if (!testCase) {
      return res.status(404).json({ message: 'Test case not found' });
    }
    res.json(testCase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a test case by ID
const updateTestCaseById = async (req, res) => {
  try {
    const testCase = await TestCase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testCase) {
      return res.status(404).json({ message: 'Test case not found' });
    }
    res.json(testCase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a test case by ID
const deleteTestCaseById = async (req, res) => {
  try {
    const deletedTestCase = await TestCase.findByIdAndDelete(req.params.id);
    if (!deletedTestCase) {
      return res.status(404).json({ message: 'Test case not found' });
    }
    res.json({ message: 'Test case deleted', data: deletedTestCase });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTestCase,
  getTestCasesByProblemId,
  getTestCaseById,
  updateTestCaseById,
  deleteTestCaseById,
};
