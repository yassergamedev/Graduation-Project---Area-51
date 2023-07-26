const { Submission } = require('../models/Submission');

// Create a new submission
const createSubmission = async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all submissions
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSubmissionsByUserAndProblemId = async (req, res) => {
  try {
    const { id} = req.params;
    const { pid} = req.params;
    console.log(id)
    console.log(pid)
    const submissions = await Submission.find({ developer: id, problem: pid });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get a single submission by ID
const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a submission by ID
const updateSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a submission by ID
const deleteSubmissionById = async (req, res) => {
  try {
    const deletedSubmission = await Submission.findByIdAndDelete(req.params.id);
    if (!deletedSubmission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json({ message: 'Submission deleted', data: deletedSubmission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionById,
  deleteSubmissionById,
  getSubmissionsByUserAndProblemId
};