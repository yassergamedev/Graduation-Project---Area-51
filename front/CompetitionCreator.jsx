import React, { useEffect, useState } from "react";
import CompetitionCreator1 from "./CompetitionCreator1";
import CompetitionCreator2 from "./CompetitionCreator2";
import Problem from "./Problem";
import './styles/ProblemCreator.css'
import { Modal, Space, Steps } from "antd";
import ProblemTemplate from "./ProblemTemplate";
import CompetitionCreator3 from "./CompetitionCreator3";
import CompetitionCreator4 from "./CompetitionCreator4";
import { useParams } from "react-router-dom";




const CompetitionCreator = ({request,competitionn, usern}) => {


  const [step, setStep] = useState(0);
  const [title, setTitle] = useState(competitionn.title)
  const [description, setDescription] = useState(competitionn.description)
  const [companies, setCompanies] = useState([])
  const [domains, setDomains] = useState(competitionn.domains)
  const [learningPoints, setLearningPoints] = useState(competitionn.learningPoints)
  const [practisePoints, setPractisePoints] = useState(competitionn.practisePoints)
  const [coins, setCoins] = useState(competitionn.coins)
  const [image, setImage] = useState(competitionn.image)
  const [judgingCriteria, setJudgingCriteria] = useState(competitionn.judgingCriteria)
  const [prefferredDate, setPrefferredDate] = useState(competitionn.prefferredDate)
  const [competitionType, setCompetitonType] = useState(competitionn.competitionType)
  const [teamLimit, setTeamLimit] = useState(competitionn.teamLimit)
  const [numParticipants, setNumParticipants] = useState(competitionn.numParticipants)
  const [prizePool, setPrizePool] = useState(competitionn.prizePool)
  const [design, setDesign] = useState(competitionn.design)
  const [problems, setProblems] = useState(competitionn.problems)
  const [problemsTime, setProblemsTime] = useState(competitionn.problemsTime)
  const [problemsSubmissions, setProblemsSubmissions] = useState(competitionn.problemsSubmissions)
  const [questions, setQuestions] = useState(competitionn.questions)
  const [questionsTime, setQuestionsTime] = useState(competitionn.questionsTime)
  const [debug, setDebug] = useState(competitionn.debug)
  const [debugTime, setDebugTime] = useState(competitionn.debugTime)
  const [competitionStatus, setCompetitionStatus] = useState(competitionn.competitionStatus)
  const [teams, setTeams] = useState([])
  const [participants, setParticipants] = useState([])
  const [competition, setCompetition] = useState({
    title: competitionn.title,
        coins: competitionn.coins,
        practisePoints: competitionn.practisePoints,
        competitionStatus: competitionn.competitionStatus,
        date: competitionn.date,
        domains: competitionn.domains,
        image : competitionn.image,
        judgingCriteria: competitionn.judgingCriteria,
        prefferredDate :competitionn.prefferredDate,
        competitionType :competitionn.competitionType,
        teamLimit :competitionn.teamLimit,
        numParticipants :competitionn.numParticipants,
        prizePool :competitionn.prizePool,
        design:competitionn.design,
        problems:competitionn.problems,
        problemsTime:competitionn.problemsTime,
        problemsSubmissions:competitionn.problemsSubmissions,
        questions:competitionn.questions,
        questionsTime:competitionn.questionsTime,
        debug:competitionn.debug,
        debugTime:competitionn.debugTime,
        competitionStatus:competitionn.competitionStatus,
        description : competitionn.description,
  teams : [],
  participants : []
    
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCompetition({
        title,
    description,
    judgingCriteria ,
    companies,
    domains,
    image,
    learningPoints,
    practisePoints,
    coins,
    judgingCriteria,
    prefferredDate,
  competitionType,
  competitionStatus : 'pending',
  teamLimit,
  numParticipants,
  prizePool,
  design,
  problems,
  problemsTime ,
  problemsSubmissions ,
  questions ,
  questionsTime ,
  debug ,
  debugTime ,
  teams,
  participants
    });
  }, [title,
    description,
    judgingCriteria ,
 image,
 competitionStatus,
    domains,
    learningPoints,
    practisePoints,
    coins,
    judgingCriteria,
    prefferredDate,
  competitionType,
  teamLimit,
  numParticipants,
  prizePool,
  design,
  problems,
  problemsTime ,
  problemsSubmissions ,
  questions ,
  questionsTime ,
  debug ,
  debugTime,
  teams,
  participants]);
  const [user, setUser] = useState(usern)
  const {id} = useParams()
  
  useEffect(() => {
   fetch(`http://localhost:3000/users/${id}`)
     .then((res) => res.json())
     .then((data) => {
       setUser(data);
       localStorage.setItem('user', JSON.stringify(data));
     })
     .catch((error) => console.error(error));},[])
  // Modal.info({
  //   title: 'This is a notification message',
  //   content: (
  //     <div>
  //       <p>some messages...some messages...</p>
  //       <p>some messages...some messages...</p>
  //     </div>
  //   ),
  //   onOk() {},
  // });
  function success() {
    Modal.success({
      content: 'Competition has been created successfully! ',
    });
  };

  function fail() {
    Modal.success({
      content: 'Competition has been updated successfully! ',
    });
  };
  const handleNext = () => {
   
      // if (!title || !description || companies.length === 0 || domains.length === 0 || learningPoints === 0 || practisePoints === 0 || coins === 0) {
      //   // If any of the required fields are empty, show an alert and don't proceed
      //   alert('Please fill in all the required fields.')
      //   return;
      // }
      
      // All required fields are filled, proceed to the next step
      console.log(competition)
      if(step<3){
        setStep((prevState) => prevState + 1);
      }
      
   
  };

  const handleBack = () => {
    setStep((prevState) => prevState - 1);
    
  };

  function changeTitle(title) {
    setTitle(title)
  }
  function changeImage(image) {
    setImage(image)
  }
  function changeDescription(desc) {
    setDescription(desc)

  }
  function changeDomains(domains) {
    setDomains(domains)
  }
  
  function changeLearningPoints(lp) {
    setLearningPoints(lp)
   
  }
  function changePractisePoints(lp) {
    setPractisePoints(lp)
  }
  function changeCoins(c) {
    setCoins(c)
  }
  function changeJudgingCriteria(jc) {
    setJudgingCriteria(jc);
  }
  
  function changePrefferredDate(sd) {
    setPrefferredDate(sd);
   
  }
  

  
  function changeCompetitionType(ct) {
    setCompetitonType(ct);

  }
  
  function changeTeamLimit(tl) {
    setTeamLimit(tl);
  }
  
  function changeParticipants(p) {
    setNumParticipants(p);
  }
  
  function changePrizePool(pp) {
   
    setPrizePool(pp);
  }
  
  function changeDesign(d) {
    setDesign(d);
  }
  
  function changeProblems(p) {
    setProblems(p);
  }
  
  function changeProblemsTime(pt) {
    setProblemsTime(pt);
  }
  
  function changeProblemsSubmissions(ps) {
    setProblemsSubmissions(ps);
  }
  
  function changeQuestions(q) {
    setQuestions(q);
  }
  
  function changeQuestionsTime(qt) {
    setQuestionsTime(qt);
  }
  
  function changeDebug(d) {
    setDebug(d);
  }
  
  function changeDebugTime(dt) {
    setDebugTime(dt);
  }
  

  const handleCompetitionSubmit = () => {
    console.log("hi")
    if (request === 'post') {
      fetch('http://localhost:3000/competitions', {
        method: 'POST',
        body: JSON.stringify(competition),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          success();
          console.log(data);
    
          // Patch request to update user's competitions_created attribute
          fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PATCH',
            body: JSON.stringify({ competitions_created: [...user.competitions_created, data._id] }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((userData) => {
              console.log('User updated:', userData);
            })
            .catch((error) => console.error('Error updating user:', error));
        })
        .catch((error) => console.error('Error posting competition:', error));
    }
    
else{
      fetch(`http://localhost:3000/competitions/${competitionn.key}`, {
      method: "PATCH",
      body: JSON.stringify(competition),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
       fail();
        console.log(data)})
      .catch((error) => console.log(error));}
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <CompetitionCreator1
        competition={competition}
        onChangeDescription={changeDescription} onChangeTitle={changeTitle} 
        onChangeImage={changeImage}
        onChangeDomains={changeDomains} 
        onChangePractisePoints={changePractisePoints} onChangeCoins={changeCoins} 
        onChangePreferredDate={changePrefferredDate} onChangeJudgingCriteria={changeJudgingCriteria}
        />;
      case 1:
        return <CompetitionCreator2
        competition={competition}
        onChangePrizepool={changePrizePool}  onChangeCompetitionType={changeCompetitionType}
  onChangeTeamSizeLimit={changeTeamLimit} onChangeNumParticipants={changeParticipants} 
         />;
      case 2:
        return (
          <CompetitionCreator3
         
          onChangeDesign={changeDesign}
          />)
          case 3:
        return (
          <CompetitionCreator4
          competition={competition}
          design={design} onChangeProblems={changeProblems} onChangeProblemsTime={changeProblemsTime}
onChangeSubmissions={changeProblemsSubmissions} onChangeQuestions={changeQuestions}  onChangeDebugger={changeDebug} 
          />)
          
          
      default:
        return null;
    }
  };

  return (
    <div className="container">
    
     <Steps
    current={step}
    items={[
      {
        title: 'Details',
      },
      {
        title: 'Ranking Management',
      },
      {
        title: 'Design',
      },
      {
        title: 'Participation Scenario',
      },
    ]}
  />
  <br />
        {renderStep()}
        {step > 0 ? (
          <div className="button-container">
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
            <button className="next-button" onClick={step>2 ? handleCompetitionSubmit : handleNext}>
              Next
            </button>
          </div>
        ) : (
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        )}

      </div>
   

  )
};

export default CompetitionCreator;
