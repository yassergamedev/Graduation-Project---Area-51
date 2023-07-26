//--------------------- dependencies -----------------------------------

//&&&&&&&&&&& Node Packages &&&&&&&&&&&&&&&&&&&&&
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport')
const { spawnSync } = require('child_process');
const passportLocalMongoose = require('passport-local-mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Code = require(__dirname +"/models/Code.js")
const multer = require("multer")
const upload = multer();
const http = require('http');
const socketIO = require('socket.io');
const LocalStrategy = require('passport-local').Strategy;
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

//@@@@@@@@@ Local Exports @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const connect = require(__dirname + "/controllers/connect.js")
const questionController = require(__dirname + "/controllers/questionController");
const moduleController = require(__dirname + "/controllers/moduleController");
const learningPathController = require(__dirname + "/controllers/learningPathController");
const tagController = require(__dirname + "/controllers/tagsController");
const userSchema = require(__dirname + "/models/User.js")
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


const app = new express();


mongoose.connect('mongodb://127.0.0.1:27017/area51h', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log('MongoDB connection error', err);
});

app.use(cors());

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));










  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));






const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
});
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key used for JWT signing

    // Store the decoded token or its payload in the request object for future use
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (roomName, participantInfo) => {
    console.log(`Participant ${participantInfo.name} joined room ${roomName}`);
    socket.join(roomName);
    io.to(roomName).emit('participantJoined', participantInfo);
  });
});




console.log("connected to db")

const problemId = 1; // Replace with actual problem ID
const score = 10; // Replace with actual score


app.use(cors());
app.use(express.json());



// const devSchema = new mongoose.Schema({
//     email : String,
//     password : String,
//     googleId : String,
    
// })





//const userModel =  new mongoose.model("Developer", devSchema);


// passport.serializeUser(function(deve, done) {
//     done(null, deve.id);
//   });
  
//   passport.deserializeUser( async function(id, done) {
    
//     try{
//       const deve = await userModel.findById(id)
//       done(null, deve)
//     }
//     catch(err)
//     {
//       console.log(err);
//     }
    
//   });
 




var code = 0;
async function sendCode(username){
  try{
    console.log("entered")
      const email = username;
      const dev = await User.findOne({username})
      if (!dev) {
        return { message: 'User not found' };
      }
       code = Math.floor(100000 + Math.random() * 900000).toString();
    const newCode = new Code({ userId: dev._id, code });
    await newCode.save();
    
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: username,
      subject: 'Two-factor authentication code',
      text: `Your two-factor authentication code is ${code}. Please enter it on the verification page to complete your login: http://localhost:3000/verify/`,
    };
    await transporter.sendMail(mailOptions);
    
 
  }catch(err)
  {
    console.error(err);
    return{ message: 'Internal server error' };
 
  }
  
}

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.send({message : "good"})
  });

app.get('/', (req,res)=>{
    res.render("home")
})

app.get('/login', (req,res)=>{
    res.redirect("http://localhost:3001/dashboard")
})

app.get('/register', (req,res)=>{
    res.render("register")
})

app.get("/secrets", (req,res)=>{
    if(req.isAuthenticated()){
        res.render("secrets")
    }else{
        res.redirect("/login")
    }
    
})




app.post('/register', (req, res) => {
 User.register(
    {
      username: req.body.username,
      
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      recoveryQuestion: req.body.recoveryQuestion,
      role: req.body.role,
      recoveryResponse: req.body.response
    },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err.message);
      }
      res.redirect("/login");
    }
  );
});

app.get('/yo', (req,res)=>{
    addDev({username : "bro"});
})
  
  
app.post('/compile', (req, res) => {
  const { code } = req.body;
  let output, isCorrect;

  try {
    // Execute the user's code solution
    const result = eval(code);

    // Compare the output of the code solution to the expected output
    output = result
    console.log(result)
    isCorrect = output
  } catch (error) {
    // If there was an error executing the code, set isCorrect to false
    // and set output to the error message
    isCorrect = false;
    output = error.message;
    console.log(output)
  }

  // Send back a response indicating whether the solution was correct or not
  res.json({ output });
});

  
  
  // app.post('/login,n', (req, res, next) => {
  //   passport.authenticate('local', function (err, user, info) {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!user) {
  //       return res.send({ message: "fail" });
  //     }
  //     req.login(user, function (err) {
  //       if (err) {
  //         return next(err);
  //       }
  //       const vcode = sendCode(user.email); // use user.email instead of deve.username
  //       console.log(vcode);
  //       res.send({ message: "success", user: user, code: vcode });
  //     });
  //   })(req, res, next);
  // });
  
  // app.post("/login", async (req,res)=>{
  //   const user = new User({
  //       email : req.body.username,
  //       password : req.body.password
  //   })

  //          req.login(user, (err)=>{
  //           if(err){
  //             console.log(user.password)
  //             console.log(user.email)
  //               console.log(err)
  //           }
  //           else{
  //             res.send({ message: "success", user: user});
  //               passport.authenticate('local', function (err, user,user){
  //                 console.log("user.password")
  //                 const vcode = sendCode(user.email); // use user.email instead of deve.username
  //                 console.log(vcode);
  //                 res.send({ message: "success", user: user, code: vcode });
  //               })
  //           }
  //          })})



app.post('/loginnn', (req, res, next) => {
    const user = new User({
      
      email: req.body.username,
      password : req.body.pass
    });
    console.log(user.password)
    console.log(user.email)
   
  
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        console.log("no body")
        return next(err);
      }
      // if (!user) {
      //   console.log("no bodygg")
      //   return res.send({ message: "fail" }); // add return statement here
      // }
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        const vcode = sendCode(user.username)
        console.log(vcode)
        res.send({ message: "success", user : user, code : code });
        
      });
    })(req, res, next);
  });
  

  
  
  
  
app.get('/logout', (req,res)=>{
    req.logout((err)=>{
        if(err)
        {
            console.log(err);
        }
    });
    res.render("home")
})

const companyController = require('./controllers/companyController');

// Get all companies
app.get('/companies', companyController.getAllCompanies);

// Get a single company by ID
app.get('/companies/:id', companyController.getCompanyById);

// Create a new company
app.post('/companies', companyController.createCompany);

// Update a company by ID
// app.patch('/companies/:id', companyController.updateCompanyById);

// // Delete a company by ID
// app.delete('/companies/:id', companyController.deleteCompanyById);

const competitionLeaderboardController = require('./controllers/competitionLeaderboardController');

// Get all competition leaderboards
app.get('/competition-leaderboards', competitionLeaderboardController.getAllCompetitionLeaderboards);

// Get a single competition leaderboard by ID
app.get('/competition-leaderboards/:id', competitionLeaderboardController.getCompetitionLeaderboardById);

// Create a new competition leaderboard
app.post('/competition-leaderboards', competitionLeaderboardController.createCompetitionLeaderboard);

// Update a competition leaderboard by ID
app.patch('/competition-leaderboards/:id', competitionLeaderboardController.updateCompetitionLeaderboardById);

// Delete a competition leaderboard by ID
app.delete('/competition-leaderboards/:id', competitionLeaderboardController.deleteCompetitionLeaderboardById);

const userController = require('./controllers/userController');

// Get all users
app.get('/users', userController.getAllUsers);

app.post('/sendcode', userController.sendCode);
app.post('/login', userController.loginUser);
// Get a single user by ID
app.get('/users/:id', userController.getUserById);

// Create a new user
app.post('/users', userController.createUser);

// Update a user by ID
app.patch('/users/:id', userController.updateUserById);
app.patch('/users/:id/learningpaths/:learningPathId', userController.updateUserLearningPath);

// Delete a user by ID
app.delete('/users/:id', userController.deleteUserById);


const competitionController = require('./controllers/competitonController');

// Get all competitions
app.get('/competitions', competitionController.getAllCompetitions);

// Get a single competition by ID
app.get('/competitions/:id', competitionController.getCompetitionById);

// Get competitions by user ID
app.get('/competitions/users/:userId', competitionController.getCompetitionsByUserId);

// Create a new competition
app.post('/competitions', competitionController.createCompetition);

// Update a competition by ID
app.patch('/competitions/:id', competitionController.updateCompetitionById);

// Delete a competition by ID
app.delete('/competitions/:id', competitionController.deleteCompetitionById);


const distributionController = require('./controllers/distributionController');

// Create a new distribution
app.post('/distributions', distributionController.createPointDistribution);

// Get all distributions
app.get('/distributions', distributionController.getAllPointDistributions);

// Get a single distribution by ID
app.get('/distributions/:id', distributionController.getPointDistributionById);

// Update a distribution by ID
app.patch('/distributions/:id', distributionController.updatePointDistributionById);

// Delete a distribution by ID
app.delete('/distributions/:id', distributionController.deletePointDistributionById);

const domainController = require('./controllers/domainController');

// Create a new domain
app.post('/domains', domainController.createDomain);

// Get all domains
app.get('/domains', domainController.getAllDomains);

// Get a single domain by ID
app.get('/domains/:id', domainController.getDomainById);

// Update a domain by ID
app.patch('/domains/:id', domainController.updateDomainById);

// Delete a domain by ID
app.delete('/domains/:id', domainController.deleteDomainById);

module.exports = app;








const evaluationController = require('./controllers/evaluationController');


app.post('/evaluations', evaluationController.createEvaluation);
app.get('/evaluations', evaluationController.getEvaluationsBySubmissionId);
app.get('/evaluations/:id', evaluationController.getEvaluationById);
app.patch('/evaluations/:id', evaluationController.updateEvaluationById);
app.delete('/evaluations/:id', evaluationController.deleteEvaluationById);

const interviewController = require('./controllers/interviewController');


app.post('/interviews', interviewController.createInterview);
app.get('/interviews', interviewController.getAllInterviews);

// Get a single interview by ID
app.get('/interviews/:id', interviewController.getInterviewById);

// Update an interview by ID
app.patch('/interviews/:id', interviewController.updateInterviewById);

// Delete an interview by ID
app.delete('/interviews/:id', interviewController.deleteInterviewById);

const jobApplicationController = require('./controllers/jobApplicationController');

// Create a new job application
app.post('/job-applications', jobApplicationController.createJobApplication);

// Get all job applications
app.get('/job-applications', jobApplicationController.getAllJobApplications);

// Get a single job application by ID
app.get('/job-applications/:id', jobApplicationController.getJobApplicationById);

// Update a job application by ID
app.patch('/job-applications/:id', jobApplicationController.updateJobApplicationById);

// Delete a job application by ID
app.delete('/job-applications/:id', jobApplicationController.deleteJobApplicationById);
const announceController = require('./controllers/announceController');


// Create a new announcement
app.post('/announce', announceController.createAnnounce);


// Get all announcements
app.get('/announce', announceController.getAllAnnounces);

// Get a single announcement by ID
app.get('/announce/:id', announceController.getAnnounceById);

// Update an announcement by ID
app.patch('/announce/:id', announceController.updateAnnounceById);

// Delete an announcement by ID
app.delete('/announce/:id', announceController.deleteAnnounceById);

const reportController = require('./controllers/analystReportController');


// Create a new announcement
app.post('/report', reportController.createAnalystReport);


// Get all announcements
app.get('/report', reportController.getAllAnalystReports);

// Get a single announcement by ID
app.get('/report/:id', reportController.getAnalystReportById);

// Update an announcement by ID
app.patch('/report/:id', reportController.updateAnalystReportById);

// Delete an announcement by ID
app.delete('/report/:id', reportController.deleteAnalystReportById);


const jobOfferController = require('./controllers/jobOfferController');

// Create a new job offer
app.post('/job-offers', jobOfferController.createJobOffer);

// Get all job offers
app.get('/job-offers', jobOfferController.getAllJobOffers);

// Get a single job offer by ID
app.get('/job-offers/:id', jobOfferController.getJobOfferById);

// Update a job offer by ID
app.patch('/job-offers/:id', jobOfferController.updateJobOfferById);

// Delete a job offer by ID
app.delete('/job-offers/:id', jobOfferController.deleteJobOfferById);

const leaderboardController = require('./controllers/leaderboardController');

// Get leaderboard data
app.get('/leaderboard', leaderboardController.getLeaderboardById);

const learningPathExController = require('./controllers/learningPathExController');

// Create a new learning path extension
app.post('/learning-path-extensions', learningPathExController.createLearningPathEx);

// Get all learning path extensions
app.get('/learning-path-extensions', learningPathExController.getAllLearningPathEx);

// Get a single learning path extension by ID
app.get('/learning-path-extensions/:id', learningPathExController.getLearningPathExById);

// Update a learning path extension by ID
app.patch('/learning-path-extensions/:id', learningPathExController.updateLearningPathExById);

// Delete a learning path extension by ID
app.delete('/learning-path-extensions/:id', learningPathExController.deleteLearningPathExById);

const notificationController = require('./controllers/notificationController');

// Get all notifications
app.get('/notifications', notificationController.getAllNotifications);

// Get a single notification by ID
app.get('/notifications/:id', notificationController.getNotificationById);

// Create a new notification
app.post('/notifications', notificationController.createNotification);

// Update a notification by ID
app.patch('/notifications/:id', notificationController.updateNotificationById);

// Delete a notification by ID
app.delete('/notifications/:id', notificationController.deleteNotificationById);

const objectifController = require('./controllers/objectifController');

// Get all objectifs
app.get('/objectifs', objectifController.getAllObjectives);

// Get a single objectif by ID
app.get('/objectifs/:id', objectifController.getObjectiveById);

// Create a new objectif
app.post('/objectifs', objectifController.createObjective);

// Update an objectif by ID
app.patch('/objectifs/:id', objectifController.updateObjectiveById);

// Delete an objectif by ID
app.delete('/objectifs/:id', objectifController.deleteObjectiveById);
const participationController = require('./controllers/participationController');

// Create a new participation
app.post('/participations', participationController.createParticipation);

// Get all participations
app.get('/participations', participationController.getAllParticipations);

// Get a single participation by ID
app.get('/participations/:id', participationController.getParticipationById);

// Update a participation by ID
app.patch('/participations/:id', participationController.updateParticipationById);

// Delete a participation by ID
app.delete('/participations/:id', participationController.deleteParticipationById);


const planningController = require('./controllers/planningController');

// Get all plannings
app.get('/plannings', planningController.getAllPlannings);

// Get a single planning by ID
app.get('/plannings/:id', planningController.getPlanningById);

// Create a new planning
app.post('/plannings', planningController.createPlanning);

// Update a planning by ID
app.patch('/plannings/:id', planningController.updatePlanningById);

// Delete a planning by ID
app.delete('/plannings/:id', planningController.deletePlanningById);


const problemController = require('./controllers/problemController');

// Get all problems
app.get('/problems', problemController.getAllProblems);

// Get a single problem by ID
app.get('/problems/:id', problemController.getProblemById);

// Create a new problem
app.post('/problems', problemController.createProblem);

// Update a problem by ID
app.patch('/problems/:id', problemController.updateProblemById);

// Delete a problem by ID
app.delete('/problems/:id', problemController.deleteProblemById);

const problemExController = require('./controllers/problemExController');

// Get all problem extensions
app.get('/problem-exs', problemExController.getAllProblemEx);

// Get a single problem extension by ID
app.get('/problem-exs/:id', problemExController.getProblemExById);

// Create a new problem extension
app.post('/problem-exs', problemExController.createProblemEx);

// Update a problem extension by ID
app.patch('/problem-exs/:id', problemExController.updateProblemExById);

// Delete a problem extension by ID
app.delete('/problem-exs/:id', problemExController.deleteProblemExById);

const questController = require('./controllers/questController');

// Get all quests
app.get('/quests', questController.getAllQuests);

// Get a single quest by ID
app.get('/quests/:id', questController.getQuestById);

// Create a new quest
app.post('/quests', questController.createQuest);

// Update a quest by ID
app.patch('/quests/:id', questController.updateQuestById);

// Delete a quest by ID
app.delete('/quests/:id', questController.deleteQuestById);

const questionBankController = require('./controllers/questionBankController');

// Get all question banks
app.get('/question-banks', questionBankController.getAllQuestionBanks);

// Get a single question bank by ID
app.get('/question-banks/:id', questionBankController.getQuestionBankById);

// Create a new question bank
app.post('/question-banks', questionBankController.createQuestionBank);

// Update a question bank by ID
app.patch('/question-banks/:id', questionBankController.updateQuestionBank);

// Delete a question bank by ID
app.delete('/question-banks/:id', questionBankController.deleteQuestionBankById);

const solutionExController = require('./controllers/solutionExController');

// Get all solution extensions
app.get('/solution-exs', solutionExController.getAllSolutionEx);

// Get a single solution extension by ID
app.get('/solution-exs/:id', solutionExController.getSolutionExById);

// Create a new solution extension
app.post('/solution-exs', solutionExController.createSolutionEx);

// Update a solution extension by ID
app.patch('/solution-exs/:id', solutionExController.updateSolutionExById);

// Delete a solution extension by ID
app.delete('/solution-exs/:id', solutionExController.deleteSolutionExById);

const submissionController = require('./controllers/submissionController');

// Get all submissions
app.get('/submissions', submissionController.getAllSubmissions);

// Get a single submission by ID
app.get('/submissions/:id', submissionController.getSubmissionById);

// Create a new submission
app.post('/submissions',submissionController.createSubmission)

// Update a submission by ID
app.patch('/submissions/:id', submissionController.updateSubmissionById);

// Delete a submission by ID
app.delete('/submissions/:id', submissionController.deleteSubmissionById);
app.get('/submissions/user/:id/problem/:pid', submissionController.getSubmissionsByUserAndProblemId);

const teamController = require('./controllers/teamController');

// Get all teams
app.get('/teams', teamController.getAllTeams);

// Get a single team by ID
app.get('/teams/:id', teamController.getTeamById);

// Create a new team
app.post('/teams', teamController.createTeam);

// Update a team by ID
app.patch('/teams/:id', teamController.updateTeamById);

// Delete a team by ID
app.delete('/teams/:id', teamController.deleteTeamById);

const testCaseController = require('./controllers/testCaseController');

// Get all test cases
//app.get('/test-cases', testCaseController.getAllTestCases);

// Get a single test case by ID
app.get('/test-cases/:id', testCaseController.getTestCaseById);

// Create a new test case
app.post('/test-cases', testCaseController.createTestCase);

// Update a test case by ID
app.patch('/test-cases/:id', testCaseController.updateTestCaseById);

// Delete a test case by ID
app.delete('/test-cases/:id', testCaseController.deleteTestCaseById);


// const developerController = require('./controllers/developerController');

// // Get all developers
// app.get('/developers', developerController.getAllDevelopers);

// // Get a single developer by ID
// app.get('/developers/:id', developerController.getDeveloperById);

// // Create a new developer
// app.post('/developers', developerController.createDeveloper);

// // Update a developer by ID
// app.patch('/developers/:id', developerController.updateDeveloperById);

// // Delete a developer by ID
// app.delete('/developers/:id', developerController.deleteDeveloperById);



const registrationApplicationController = require('./controllers/registrationApplicationController');

// Get all registration applications
app.get('/registration-applications', registrationApplicationController.getAllRegistrationApplications);

// Get a single registration application by ID
app.get('/registration-applications/:id', registrationApplicationController.getRegistrationApplicationById);

// Create a new registration application
app.post('/registration-applications', registrationApplicationController.createRegistrationApplication);

// Update a registration application by ID
app.patch('/registration-applications/:id', registrationApplicationController.updateRegistrationApplicationById);

// Delete a registration application by ID
app.delete('/registration-applications/:id', registrationApplicationController.deleteRegistrationApplicationById);

const solutionController = require('./controllers/solutionController');

// Get all solutions
app.get('/solutions', solutionController.getAllSolutions);

// Get a single solution by ID
app.get('/solutions/:id', solutionController.getSolutionById);

// Create a new solution
app.post('/solutions', solutionController.createSolution);

// Update a solution by ID
app.patch('/solutions/:id', solutionController.updateSolutionById);

// Delete a solution by ID
app.delete('/solutions/:id', solutionController.deleteSolutionById);
   
app.get('/tags', tagController.getAllTags);
app.get('/tags/:id', tagController.getTagById);
app.post('/tags', tagController.createTag);
app.patch('/tags/:id', tagController.updateTagById);
app.delete('/tags/:id', tagController.deleteTagById);

app.get('/questions', questionController.getAllQuestions);
app.get('/questions/:id', questionController.getQuestionById);
app.post('/questions', questionController.createQuestion);
app.patch('/questions/:id', questionController.updateQuestionById);
app.delete('/questions/:id', questionController.getQuestionById, questionController.deleteQuestionById);

app.get('/modules', moduleController.getAllModules);
app.get('/modules/:id', moduleController.getModuleById);
app.post('/modules', moduleController.createModule);
app.patch('/modules/:id', moduleController.updateModule);
app.delete('/modules/:id', moduleController.deleteModuleById);


app.get('/learning-paths', learningPathController.getAllLearningPaths);
app.get('/learning-paths/:id', learningPathController.getLearningPathById);
app.post('/learning-paths',upload.single('image'), learningPathController.createLearningPath);
app.patch('/learning-paths/:id', learningPathController.updateLearningPath)
app.delete('/learning-paths/:id', learningPathController.deleteLearningPathById);



server.listen(3000, (req,res)=>{
    console.log("Server Started Successfully");
})
const competitionNamespace = io.of('/competition');

const participantsRoom = 'participants';

competitionNamespace.on('connection', (socket) => {

  console.log("hi competitor")
  socket.join(participantsRoom);
  competitionNamespace.to(participantsRoom).emit('participantJoined', socket.id);

  leaderboard[socket.id] = 0;

  socket.on('submitSolution', (solution) => {
    if (solution.problemId === problemId) {
      leaderboard[socket.id] += score;
      competitionNamespace.to(participantsRoom).emit('leaderboardUpdated', leaderboard);
    }
  });
});