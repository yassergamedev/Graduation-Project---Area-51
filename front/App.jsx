import React, { useState, useEffect, useCallback } from 'react';
import Nav from './Nav';

import Login from './login';
import { BrowserRouter as Router, Link, Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import AccountForm from './AccountForm';
import Dashboard from './Dashboard';
import Auth from './Auth'

import Problem from './Problem';
import ModuleCreationPage from './ModuleCreationPage';
import LearningPath from './LearningPath';
import LearningPathCreationPage from './LearningPathCreationPage';
import Navbar from './Navbar';
import Module from './Module';
import QuestionCreator from './QuesionCreator';
import LearningPathsPage from './LearningPathsPage';
import Sidebar from './Sidebar';
import JobOfferListPage from './JobOfferListPage';
import ProblemCreator from './ProblemCreator';
import Contain from './AdminLayout'
import { CiCircleFilled, ControlTwoTone } from '@ant-design/icons';
import Layout2 from './Layout2';
import RegistrationFrom1 from './RegistrationForm1';
import RegistrationForm2 from './RegistrationForm2';
import RegistrationForm3 from './RegistrationForm3';
import RegistrationFormDev from './RegistrationFormDev';
import RegistrationFormInst from './RegistrationFormInst';
import RegistrationFormComp from './RegistrationFormComp';
import RegistrationForm from './RegistrationForm';
import AnnounceCreator from './AnnounceCreator';
import CompetitionCreator from './CompetitionCreator';
import Feed from './Feed';
import AdminLayout from './AdminLayout';
import DeveloperLayout from './DeveloperLayout';
import InstructorLayout from './InstructorLayout';
import AnalystLayout from './AnalystLayout';
import RecruiterLayout from './RecruiterLayout';
import CompetitionListAdmin from './CompetitonListAdmin';
import QuestionBank from './QuestionBank';
import Competition from './Competition';
import Schedule from './Schedule';
import ProblemList from './ProblemList';
import ModuleCreator from './ModuleCreator';
import LearningPathCreator from './LearningPathCreator';
import LearningPathsList from './LearningPathsList';
import Leaderboard from './Leaderboard';
import ProfilePageDev from './ProfilePageDev';
import LandingPage from './LandingPage';
import CompetitionList from './CompetitionList';
import CompetitionLeaderboard from './CompetitionLeaderboard';
import Home from './Home/index'
import './styles/App.css'
import ProfilePageInst from './ProfilePageInst';
import JobOfferCreator from './JobOfferCreator';
import ChallengeCreator from './ChallengeCreator';
import ProfilePageRec from './ProfilePageRec';
import UserList from './UserList';
import ProfilePageAdmin from './ProfilePageAdmin';
import CompetitionListAnalyst from './CompetitionListAnalyst';
import ReportCreator from './ReportCreator';
import ProfilePageAnalyst from './ProfilePageAnalyst';
import LearningPathListAnalyst from './LearningPathListAnalyst';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({})
  const [code, setCode] = useState(0)
  const [newUser, setNew] = useState(false)
  const [modulesList, setModulesList] = useState([]);


  function onChangeUser(user) {
    setUser(user)
  }

  function getUser() {
    return user
  }
  //   useEffect(() => {
  //     console.log("hey")
  //     fetch('http://localhost:3000/modules')
  //         .then(res => res.json())
  //         .then(data => setModulesList(data))
  //         .catch(error => console.error(error));
  // }, []);
  const [lpp, setLpp] = useState(null)
  function onSelectModule(lpp) {
    console.log("something")
    fetch(`http://localhost:3000/learning-paths/${lpp}`)
      .then(res => res.json())
      .then(data => setLpp(data))
      .catch(error => console.error(error));
    console.log(lpp)
  }

  function setUsers(user) {
    setUser(user)
  }
  function setC(c) {
    setCode(c)
    console.log("hi")
  }

  console.log(modulesList[1])

  // {/* <Route exact path="/" element={<Login setUsers={setUsers} setCode={setC}/>} /> */}
  return (

    //<Layout2 />












    <Routes>
      <Route exact path='/forgotpassword' element={<ForgotPassword />}/>
      <Route exact path="/register" element={<RegistrationForm user={{}} onChangeU={onChangeUser} />} />
      <Route exact path="/" element={<Home onChangeU={onChangeUser} />} />

      <Route exact path="/login" element={<Login onChangeU={onChangeUser} />} />
      <Route exact path="/dashboard/admin/:id" element={<AdminLayout usern={user} />} >
      <Route exact path="" element={<Feed user={user} />} />
        <Route exact path="joboffers" element={<JobOfferListPage user={user} />} >
        <Route exact path="competition/:cid" element={<Competition user={user} />} />

          </Route>
        <Route exact path="problemcreator" element={<ProblemCreator user={user} />} />
        <Route exact path="announcecreator" element={<AnnounceCreator user={user} />} />
        <Route exact path="userlist" element={<UserList user={user} />} />
      
        <Route exact path="competitioncreator" element={<CompetitionCreator user={user} />} />
        <Route exact path="competitionlist" element={<CompetitionListAdmin user={user} />} />
        <Route exact path="complist" element={<CompetitionList user={user} />} />

        <Route exact path="questionbank" element={<QuestionBank user={user} />} />
        <Route exact path="modulecreator" element={<ModuleCreator modulee={{}} usern={user} />} />
        <Route exact path="lpcreator" element={<LearningPathCreator request='post' lpp={{}} usern={user} />} />
        <Route exact path="learningpaths" element={<LearningPathsList usern={user} />} />
        <Route exact path="leaderboard" element={<Leaderboard usern={user} />} />
        <Route exact path="profile" element={<ProfilePageAdmin usern={user} />} />

        <Route exact path="problems/:pid" element={<Problem usern={user} />} />
        <Route exact path="competition/:cid/leaderboard" element={<CompetitionLeaderboard user={user} />} />

        <Route exact path="competition/:cid" element={<Competition user={user} />} />
        <Route exact path="competition/:cid/:jid" element={<Competition user={user} />} />

        <Route exact path="schedule" element={<Schedule user={user} />} />
        <Route exact path="problems" element={<ProblemList user={user} />} />
        <Route exact path="learningpaths/:l" element={<LearningPath user={user} />} />
        <Route exact path="learningpaths" element={<LearningPathsPage user={user} />} />
        <Route exact path="module" element={<Module user={user} />} />
        <Route exact path="questioncreator" element={<QuestionCreator user={user} />} />
        <Route exact path="code" element={<Auth user={user} />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="accountform" element={<AccountForm setUsers user={user} />} />
        <Route exact path="dashboard" element={<Dashboard user={user} />} />




        </Route>
      <Route exact path="/dashboard/developer/:id" element={<DeveloperLayout usern={user} getUsern={getUser} />}>
        <Route exact path="" element={<Feed user={user} />} />
        <Route exact path="joboffers" element={<JobOfferListPage user={user} />} >
        <Route exact path="competition/:cid" element={<Competition user={user} />} />

          </Route>
        <Route exact path="problemcreator" element={<ProblemCreator user={user} />} />
        <Route exact path="competitioncreator" element={<CompetitionCreator user={user} />} />
        <Route exact path="competitionlist" element={<CompetitionListAdmin user={user} />} />
        <Route exact path="complist" element={<CompetitionList user={user} />} />

        <Route exact path="questionbank" element={<QuestionBank user={user} />} />
        <Route exact path="modulecreator" element={<ModuleCreator usern={user} />} />
        <Route exact path="lpcreator" element={<LearningPathCreator usern={user} />} />
        <Route exact path="learningpaths" element={<LearningPathsList usern={user} />} />
        <Route exact path="leaderboard" element={<Leaderboard usern={user} />} />
        <Route exact path="profile" element={<ProfilePageDev usern={user} />} />

        <Route exact path="problems/:pid" element={<Problem usern={user} />} />
        <Route exact path="competition/:cid/leaderboard" element={<CompetitionLeaderboard user={user} />} />

        <Route exact path="competition/:cid" element={<Competition user={user} />} />
        <Route exact path="competition/:cid/:jid" element={<Competition user={user} />} />

        <Route exact path="schedule" element={<Schedule user={user} />} />
        <Route exact path="problems" element={<ProblemList user={user} />} />
        <Route exact path="learningpaths/:l" element={<LearningPath user={user} />} />
        <Route exact path="learningcreation" element={<LearningPathCreationPage user={user} />} />
        <Route exact path="learningpaths" element={<LearningPathsPage user={user} />} />
        <Route exact path="module" element={<Module user={user} />} />
        <Route exact path="questioncreator" element={<QuestionCreator user={user} />} />
        <Route exact path="code" element={<Auth user={user} />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="accountform" element={<AccountForm setUsers user={user} />} />
        <Route exact path="dashboard" element={<Dashboard user={user} />} />



      </Route>

      <Route exact path="/dashboard/instructor/:id" element={<InstructorLayout newUser={newUser} usern={user} />}>
          <Route exact path="" element={<Feed user={user} />} />
          <Route exact path="profile" element={<ProfilePageInst usern={user} />} />
          <Route exact path="learningpaths/:l" element={<LearningPath user={user} />} />
          <Route exact path="learningcreation" element={<LearningPathCreationPage user={user} />} />
          <Route exact path="learningpaths" element={<LearningPathsList user={user} />} />
          <Route exact path="module" element={<Module user={user} />} />
          <Route exact path="modulecreator" element={<ModuleCreator request="post" modulee={{}} user={user} />} />
         
          <Route exact path="problems/:pid" element={<Problem usern={user} />} />
          <Route exact path="competition/:cid/leaderboard" element={<CompetitionLeaderboard user={user} />} />
          <Route exact path="competition/:cid" element={<Competition user={user} />} />
          <Route exact path="schedule" element={<Schedule user={user} />} />
          <Route exact path="problems" element={<ProblemList user={user} />} />
          <Route exact path="problemcreator" element={<ProblemCreator problemm={{}} request="post" user={user} />} />
          <Route exact path="modulecreator" element={<ModuleCreator usern={user} />} />
          <Route exact path="competitioncreator" element={<CompetitionCreator competitionn={{}} request="post" usern={user} />} />
          <Route exact path="complist" element={<CompetitionList usern={user} />} />
          <Route exact path="questioncreator" element={<QuestionCreator user={user} />} />
          <Route exact path="accountform" element={<AccountForm setUsers user={user} />} />
      </Route>
      <Route exact path="/dashboard/analyst/:id" element={<AnalystLayout  usern={user} />} >
      <Route exact path="" element={<Feed user={user} />} />
        <Route exact path="joboffers" element={<JobOfferListPage user={user} />} >
        <Route exact path="competition/:cid" element={<Competition user={user} />} />

          </Route>
        <Route exact path="problemcreator" element={<ProblemCreator user={user} />} />
        <Route exact path="reportcreator" element={<ReportCreator request='post' report={{}} user={user} />} />
        <Route exact path="userlist" element={<UserList user={user} />} />
      
        <Route exact path="competitioncreator" element={<CompetitionCreator user={user} />} />
        <Route exact path="competitionlist" element={<CompetitionListAnalyst user={user} />} />
        <Route exact path="complist" element={<CompetitionList user={user} />} />

        <Route exact path="questionbank" element={<QuestionBank user={user} />} />
        <Route exact path="modulecreator" element={<ModuleCreator modulee={{}} usern={user} />} />
        <Route exact path="lpcreator" element={<LearningPathCreator request='post' lpp={{}} usern={user} />} />
        <Route exact path="learningpaths" element={<LearningPathListAnalyst usern={user} />} />
        <Route exact path="leaderboard" element={<Leaderboard usern={user} />} />
        <Route exact path="profile" element={<ProfilePageAnalyst usern={user} />} />

        <Route exact path="problems/:pid" element={<Problem usern={user} />} />
        <Route exact path="competition/:cid/leaderboard" element={<CompetitionLeaderboard user={user} />} />

        <Route exact path="competition/:cid" element={<Competition user={user} />} />
        <Route exact path="competition/:cid/:jid" element={<Competition user={user} />} />

        <Route exact path="schedule" element={<Schedule user={user} />} />
        <Route exact path="problems" element={<ProblemList user={user} />} />
        <Route exact path="learningpaths/:l" element={<LearningPath user={user} />} />
        <Route exact path="learningpaths" element={<LearningPathsPage user={user} />} />
        <Route exact path="module" element={<Module user={user} />} />
        <Route exact path="questioncreator" element={<QuestionCreator user={user} />} />
        <Route exact path="code" element={<Auth user={user} />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="accountform" element={<AccountForm setUsers user={user} />} />
        <Route exact path="dashboard" element={<Dashboard user={user} />} />


       
        </Route>
      <Route exact path="/dashboard/recruiter/:id" element={<RecruiterLayout newUser={newUser} usern={user} />} >
      <Route exact path="" element={<Feed user={user} />} />
          <Route exact path="profile" element={<ProfilePageRec usern={user} />} />
          <Route exact path="learningpaths/:l" element={<LearningPath user={user} />} />
          <Route exact path="learningcreation" element={<LearningPathCreationPage user={user} />} />
          <Route exact path="learningpaths" element={<LearningPathsList user={user} />} />
          <Route exact path="module" element={<Module user={user} />} />
          <Route exact path="modulecreator" element={<ModuleCreator request="post" modulee={{}} user={user} />} />
          <Route exact path="joboffercreator" element={<JobOfferCreator request="post" joboff={{}} user={user} />} />
          <Route exact path="challengecreator" element={<ChallengeCreator request="post" competitionn={{}} user={user} />} />
          <Route exact path="leaderboard" element={<Leaderboard usern={user} />} />
      
          <Route exact path="problems/:pid" element={<Problem usern={user} />} />
          <Route exact path="competition/:cid/leaderboard" element={<CompetitionLeaderboard user={user} />} />
          <Route exact path="competition/:cid" element={<Competition user={user} />} />
          <Route exact path="schedule" element={<Schedule user={user} />} />
          <Route exact path="problems" element={<ProblemList user={user} />} />
          <Route exact path="problemcreator" element={<ProblemCreator problemm={{}} request="post" user={user} />} />
          <Route exact path="modulecreator" element={<ModuleCreator usern={user} />} />
          <Route exact path="competitioncreator" element={<CompetitionCreator competitionn={{}} request="post" usern={user} />} />
          <Route exact path="complist" element={<CompetitionList usern={user} />} />
          <Route exact path="questioncreator" element={<QuestionCreator user={user} />} />
          <Route exact path="accountform" element={<AccountForm setUsers user={user} />} />
      </Route>

    </Routes>



  );



}

export default App;
