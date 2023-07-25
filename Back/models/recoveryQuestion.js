// Define the recoverQuestion schema
const recoverQuestionSchema = new mongoose.Schema({
    question: {
      type: String,
      enum: ['What was your childhood nickname?', 'What primary school did you attend?'],
      required: true
    }
  });
  
  // Define the recoverQuestion model
  const RecoverQuestion = mongoose.model('RecoverQuestion', recoverQuestionSchema);
  
  // Implement CRUD operations for recoverQuestion
  async function createRecoverQuestion(question) {
    const recoverQuestion = new RecoverQuestion({ question });
    return await recoverQuestion.save();
  }
  
  async function getRecoverQuestionById(id) {
    return await RecoverQuestion.findById(id);
  }
  
  async function getAllRecoverQuestions() {
    return await RecoverQuestion.find({});
  }
  
  async function updateRecoverQuestion(id, question) {
    return await RecoverQuestion.findByIdAndUpdate(id, { question }, { new: true });
  }
  
  async function deleteRecoverQuestion(id) {
    return await RecoverQuestion.findByIdAndDelete(id);
  }
  