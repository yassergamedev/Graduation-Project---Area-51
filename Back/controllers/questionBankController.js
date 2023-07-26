const QuestionBank = require('../models/QuestionBank');
const Question = require('../models/Question');

// Create a new questionBank
const createQuestionBank = async (req, res) => {
  try {
    const questionBank = new QuestionBank(req.body);
    await questionBank.save();
    res.json(questionBank);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all questionBanks
const getAllQuestionBanks = async (req, res) => {
  try {
    const questionBanks = await QuestionBank.find();
    res.json(questionBanks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single questionBank by ID
const getQuestionBankById = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.id).populate('questions');
    if (!questionBank) {
      return res.status(404).json({ message: 'QuestionBank not found' });
    }
    res.json(questionBank);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a questionBank by ID
const updateQuestionBank = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!questionBank) {
      return res.status(404).json({ message: 'QuestionBank not found' });
    }
    res.json(questionBank);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a questionBank by ID
const deleteQuestionBankById = async (req, res) => {
  try {
    const deletedQuestionBank = await QuestionBank.findByIdAndDelete(req.params.id);
    if (!deletedQuestionBank) {
      return res.status(404).json({ message: 'QuestionBank not found' });
    }
    res.json({ message: 'QuestionBank deleted', data: deletedQuestionBank });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a question to a questionBank
const addQuestionToQuestionBank = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: 'QuestionBank not found' });
    }
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    questionBank.questions.push(question);
    await questionBank.save();
    res.json(questionBank);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove a question from a questionBank
const removeQuestionFromQuestionBank = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: 'QuestionBank not found' });
    }
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    questionBank.questions.pull(question._id);
    await questionBank.save();
    res.json(questionBank);
  } catch (err){
    res.status(500).json({ message: err.message });
  }}

module.exports = {
    createQuestionBank,
    getAllQuestionBanks,
    getQuestionBankById,
    updateQuestionBank,
    deleteQuestionBankById,
    addQuestionToQuestionBank,
    removeQuestionFromQuestionBank,
};