import React, { useEffect, useState } from "react";
import ProblemPart1 from "./ProblemPart1";
import ProblemPart2 from "./ProblemPart2";
import Problem from "./Problem";
import './styles/ProblemCreator.css'
import { Modal, Space, Steps } from "antd";
import ProblemTemplate from "./ProblemTemplate";
import { useParams } from "react-router-dom";




const ProblemCreator = ({problemm, request, usern}) => {


  const [step, setStep] = useState(0);
  const [title, setTitle] = useState(problemm.title)
  const [description, setDescription] = useState(problemm.description)
  const [companies, setCompanies] = useState([])
  const [domains, setDomains] = useState(problemm.domains)
  const [learningPoints, setLearningPoints] = useState(problemm.learningPoints)
  const [practisePoints, setPractisePoints] = useState(problemm.practisePoints)
  const [coins, setCoins] = useState(problemm.coins)
  const [boilerplate, setBoilerplate] = useState(problemm.boilerplate);
  const [judge, setJudge] = useState(problemm.judge);
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
 
  const [problem, setProblem] = useState({
    title: problemm.title,
    description: problemm.description,
    companies: [],
    domains: problemm.domains,
    learningPoints: problemm.learningPoints,
    practisePoints: problemm.practisePoints,
    coins: problemm.coins,
    boilerplate : problemm.boilerplate,
    judge : problemm.judge,
    creator : user
  });
  const [progress, setProgress] = useState(0);



  useEffect(() => {
    setProblem({
      title,
      description,
      companies,
      domains,
      learningPoints,
      practisePoints,
      coins,
      boilerplate,
      judge
    });
  }, [title, description, companies, domains, learningPoints, practisePoints, coins, boilerplate, judge]);

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
      content: 'Problem has been created successfully! ',
    });
  };
  function fail() {
    Modal.success({
      content: 'Problem has been updated successfully! ',
    });
  };

  const handleNext = () => {
   
      // if (!title || !description || companies.length === 0 || domains.length === 0 || learningPoints === 0 || practisePoints === 0 || coins === 0) {
      //   // If any of the required fields are empty, show an alert and don't proceed
      //   alert('Please fill in all the required fields.')
      //   return;
      // }
      
      // All required fields are filled, proceed to the next step
      console.log(problem)
      if(step<3){
        setStep((prevState) => prevState + 1);
      }
      
   
  };

  const handleBack = () => {
    setStep((prevState) => prevState - 1);
    setProgress((prevState) => prevState - 33);
  };

  function changeTitle(title) {
    setTitle(title)
  }
  function changeDescription(desc) {
    setDescription(desc)

  }
  function changeDomains(domains) {
    setDomains(domains)
  }
  function changeCompanies(comps) {
    setCompanies(comps)

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
  function changeBoiler(b) {
    setBoilerplate(b)
  }
  function changeJudge(j) {
    setJudge(j)
    
  }
  

  const handleProblemSubmit = () => {
    console.log("hi")
    console.log(problem)
    if (request === 'post') {
      // Post request
      fetch('http://localhost:3000/problems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(problem),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          success();
    
          // Patch request to update user
          fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ problems_created: [...user.problems_created, data._id] }),
          })
            .then((response) => response.json())
            .then((userData) => {
              // Handle the updated user data
              console.log(userData);
            })
            .catch((error) => {
              // Handle any errors
              console.error('Error:', error);
            });
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });
    }
    
      else{
        fetch(`http://localhost:3000/problems/${problemm.key}`, {
      method: "PATCH",
      body: JSON.stringify(problem),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fail();
        console.log(data)})
      .catch((error) => console.log(error));
      }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <ProblemPart1
          problem={problem}
          onTitleChange={changeTitle}
          onDescriptionChange={changeDescription}
          onCompanyChange={changeCompanies}
          onDomaineChange={changeDomains}
          onLpChange={changeLearningPoints}
          onPepChange={changePractisePoints}
          onCoinsChange={changeCoins}
        />;
      case 1:
        return <ProblemPart2
        problem={problem}
         onJudgeChange={changeJudge} 
         onBoilerChange={changeBoiler} />;
      case 2:
        return (
          <ProblemTemplate
           problem={problem}
          />
        );
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
        title: 'Problem Details',
       
      },
      {
        title: 'Problem Code',
    
    
      },
      {
        title: 'Overview',
        
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
            <button className="next-button" onClick={step>2 ? handleProblemSubmit : handleNext}>
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

export default ProblemCreator;
