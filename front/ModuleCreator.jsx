import React, { useEffect, useState } from "react";
import ModuleCreator1 from "./ModuleCreator1";
import ModuleCreator2 from "./ModuleCreator2";
import Problem from "./Problem";
import './styles/ProblemCreator.css'
import { Modal, Space, Steps } from "antd";
import ProblemTemplate from "./ProblemTemplate";
import ModuleCreator3 from "./ModuleCreator3";

import { useParams } from "react-router-dom";
import Module from "./Module";




const ModuleCreator = ({usern,request, modulee}) => {
    const [step, setStep] = useState(0)
    const [questions, setQuestions] = useState(modulee.questions );
    const [domains, setDomains] = useState(modulee.domains);
    const [name, setName] = useState(modulee.name);
    const [content, setContent] = useState(modulee.content);
    const [description, setDescription] = useState(modulee.description);
    const [user, setUser] = useState(usern)
    const [module, setModule] = useState({
        name : modulee.name,
        description : modulee.description,
        content : modulee.content,
        domains : modulee.domains,
        creator : user,
        questions : modulee.questions
    })
    const {id} = useParams()
    useEffect(() => {
         
     console.log(id)
       fetch(`http://localhost:3000/users/${id}`)
         .then(res => res.json())
         .then(data => {
             setUser(data)
             localStorage.setItem('user', JSON.stringify(data));
             
         })
    
         setUser(localStorage.getItem('user'))
     },[usern])
  

  useEffect(() => {
    setModule({
        name : name,
        description : description,
        content : content,
        domains : domains,
        creator : user,
        questions : questions,
    });
  }, [name ,
    description ,
    content ,
    domains,
    user ,
    questions,]);

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
      content: 'Module has been created successfully! ',
    });
  };
  function fail() {
    Modal.success({
      content: 'Module has been updated successfully! ',
    });
  };

  const handleNext = () => {
   
      // if (!title || !description || companies.length === 0 || domains.length === 0 || learningPoints === 0 || practisePoints === 0 || coins === 0) {
      //   // If any of the required fields are empty, show an alert and don't proceed
      //   alert('Please fill in all the required fields.')
      //   return;
      // }
      
      // All required fields are filled, proceed to the next step
      console.log(module)
      if(step<3){
        setStep((prevState) => prevState + 1);
      }
      
   
  };

  const handleBack = () => {
    setStep((prevState) => prevState - 1);
    
  };

  function changeQuestions(newQuestions) {
    setQuestions(newQuestions);
  }
  
  function changeName(newName) {
    setName(newName);
  }
  
  function changeContent(newContent) {
    setContent(newContent);
  }
  
  function changeDescription(newDescription) {
    setDescription(newDescription);
  }
  
 
  function changeUser(newUser) {
    setUser(newUser);
  }
  function changeDomains(newUser) {
    setDomains(newUser);
  }

 function handleModuleSubmit(){
  if (request === 'post') {
    fetch("http://localhost:3000/modules", {
      method: "POST",
      body: JSON.stringify(module),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update user's modules_created attribute
        const updatedUser = {
          ...user,
          modules_created: [...user.modules_created, data._id],
        };
  
        // Make PATCH request to update user
        fetch(`http://localhost:3000/users/${user._id}`, {
          method: "PATCH",
          body: JSON.stringify(updatedUser),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            success();
            console.log(data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
  else{
      fetch(`http://localhost:3000/modules/${modulee.key}`, {
      method: "PATCH",
      body: JSON.stringify(module),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fail();
        console.log(data)})
      .catch((error) => console.log(error));}
      }

  const renderStep = () => {
    switch (step) {
      case 0:
        return <ModuleCreator1
        module={module}
        desc = {description}
        nam = {name}
        doms = {domains}
        onChangeDescription={changeDescription} onChangeName={changeName} 
        onChangeDomains={changeDomains} 
       />;
      case 1:
        return <ModuleCreator2
        user={user}
        module={module}
        contentt = {content}
        onChangeContent={changeContent} />;
      case 2:
        return (
          <ModuleCreator3
          module={module}
          onChangeQuestions={changeQuestions}
          quests={questions}
          />)
          case 3:
            return (
              <Module
              modulee={module}
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
        title: 'Module Specifics',
      },
      {
        title: ' Content',
      },
      {
        title: 'Evaluation Questions',
      },
      {
        title: 'Overview',
      },
      
    ]}
  />
  <br />
        {renderStep()}
        {step > 0 ? (
          <div className="button-container" style={{marginTop:'78px'}}>
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
            <button className="next-button" onClick={step>2 ? handleModuleSubmit : handleNext}>
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

export default ModuleCreator;
