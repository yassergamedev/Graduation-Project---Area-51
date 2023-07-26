const Module = require('../models/Module');
const Question = require('../models/Question');

// Create a new module
const createModule = async (req, res) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all modules
const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single module by ID
const getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a module by ID
const updateModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a module by ID
const deleteModuleById = async (req, res) => {
  try {
    const deletedModule = await Module.findByIdAndDelete(req.params.id);
    if (!deletedModule) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.json({ message: 'Module deleted', data: deletedModule });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a question to a module
const addQuestionToModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    module.questions.push(question);
    await module.save();
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove a question from a module
const removeQuestionFromModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    module.questions.pull(question._id);
    await module.save();
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createModule,
  getAllModules,
  getModuleById,
  updateModule,
  deleteModuleById,
  addQuestionToModule,
  removeQuestionFromModule,
};
