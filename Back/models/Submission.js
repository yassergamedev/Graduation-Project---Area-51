const mongoose = require('mongoose');
const  {Problem } = require('./Problems');
const { Evaluation } = require('./Evaluation');

const submissionSchema = new mongoose.Schema({


  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dev',
    required: false,
  },
  date : {
    type : Date,
    default: Date.now
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true,
  },
  solutionDev: {
    type: String,
    required: true,
  },
  evaluation: {
    type: String,
   required : false,
  },
});

submissionSchema.pre('save', async function () {
  console.log("hihihi")
  const submission = this;

  // Get the problem associated with this submission
  const problem = await Problem.findById(submission.problem);

  // Run the tests using the judge

  const fullcode = submission.solutionDev+ problem.judge

  let output, isCorrect, evaluation;

  try {
    // Execute the user's code solution
    const result = eval(fullcode);

    // Compare the output of the code solution to the expected output
    output = result
    console.log(result)
    evaluation = output.passed ? 'PASS' : 'FAIL'
  } catch (error) {
    // If there was an error executing the code, set isCorrect to false
    // and set output to the error message
    isCorrect = false;
    output = error.message;
    evaluation  = output
    console.log(output)
  }
 


  // Create the evaluation based on the test results

    
   


  // Save the evaluation ID to the submission
  submission.evaluation = evaluation;


});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = { Submission };
