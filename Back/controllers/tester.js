const { Problem } = require('./Problem');
const { Submission } = require('./Submission');
const { runTests } = require('./testing');

// Define the problem
const problem = new Problem({
  name: 'Addition',
  description: 'Write a function that adds two numbers',
  boilerplate: 'function add(a, b) {\n  // Your code here\n}',
  tags: ['Math'],
  judge: 'runTests(add)',
});

// Define the test cases
const testCases = [
  { input: [1, 2], output: 3 },
  { input: [-1, 1], output: 0 },
  { input: [0, 0], output: 0 },
];

// Define the runTests function
function runTests(fn) {
  for (let i = 0; i < testCases.length; i++) {
    const { input, output } = testCases[i];
    const result = fn(...input);
    if (result !== output) {
      return { passed: false, index: i };
    }
  }
  return { passed: true };
}
function solution(a, b){
    //your solution here
      return s;
  }

// Define a submission
const submission = new Submission({
  developer: 'developer_id',
  problem: problem._id,
  solutionDev: 'function add(a, b) {\n  return a + b;\n}',
});

// Run the tests and evaluate the submission
const { passed, index } = runTests(submission.solutionDev);
if (passed) {
  console.log('Submission passed all test cases');
  // Evaluate the submission
} else {
  console.log(`Submission failed test case ${index}`);
}
