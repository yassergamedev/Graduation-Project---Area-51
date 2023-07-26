const Question = require('../models/Question');

// Create a new question
const createQuestion = async (req, res) => {
    try {
      const question = new Question(req.body);
      await question.save();
      res.json(question);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Get all questions
const getAllQuestions = async (req, res) => {
    try {
      const questions = await Question.find();
      console.log(questions);
      res.json(questions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Get a single question by ID
const getQuestionById = async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.json(question);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Update a question by ID
async function updateQuestion(req, res) {
    try {
      const question = await Question.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.json(question);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  
  const updateQuestionById = async (req, res) => {
    try {
      const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.json(question);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
// Delete a question by ID
const deleteQuestionById = async (req, res) => {
    try {
      const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
      if (!deletedQuestion) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.json({ message: 'Question deleted', data: deletedQuestion });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById
};
