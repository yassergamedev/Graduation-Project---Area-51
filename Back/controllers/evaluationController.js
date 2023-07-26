const { Evaluation } = require('../models/Evaluation');

// Create a new evaluation
const createEvaluation = async (req, res) => {
  try {
    const evaluation = new Evaluation({
      ...req.body,
      Submission: req.params.submissionId // assuming submissionId is passed as a parameter in the URL
    });
    await evaluation.save();
    res.json(evaluation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all evaluations for a submission
const getEvaluationsBySubmissionId = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ Submission: req.params.submissionId });
    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single evaluation by ID
const getEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }
    res.json(evaluation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an evaluation by ID
const updateEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }
    res.json(evaluation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an evaluation by ID
const deleteEvaluationById = async (req, res) => {
  try {
    const deletedEvaluation = await Evaluation.findByIdAndDelete(req.params.id);
    if (!deletedEvaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }
    res.json({ message: 'Evaluation deleted', data: deletedEvaluation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createEvaluation,
  getEvaluationsBySubmissionId,
  getEvaluationById,
  updateEvaluationById,
  deleteEvaluationById,
};