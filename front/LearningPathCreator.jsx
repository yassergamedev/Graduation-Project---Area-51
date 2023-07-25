import React, { useEffect, useState } from "react";
import LearningPathCreator1 from "./LearningPathCreator1";
import LearningPathCreator2 from "./LearningPathCreator2";
import Problem from "./Problem";
import './styles/ProblemCreator.css'
import { Modal, Space, Steps } from "antd";
import ProblemTemplate from "./ProblemTemplate";
import LearningPathCreator3 from "./LearningPathCreator3";

import { useParams } from "react-router-dom";
import Module from "./Module";
import LearningPath from "./LearningPath";
import LearningPathTemplate from "./LearningPathTemplate";




const LearningPathCreator = ({usern, lpp, request}) => {
    const [step, setStep] = useState(0)
    const [domains, setDomains] = useState(lpp.domains || []);
    const [modules, setModules] = useState(lpp.modules ||[]);
    const [coins, setCoins] = useState(lpp.coins);
    const [manager, setManager] = useState('');
    const [learningPoints, setLearningPoints] = useState(lpp.learningPoints);
    const [name, setName] = useState(lpp.name);
    const [image, setImage] = useState(lpp.image);
    const [description, setDescription] = useState(lpp.description);
    const [user, setUser] = useState(usern)
    const [learningPath, setLearningPath] = useState({
        name : lpp.name,
        description : lpp.description,
        modules : lpp.modules,
        manager,
        domains : lpp.domains,
        coins : lpp.coins,
        image : lpp.coins,
    creator : user,
        learningPoints : lpp.learningPoints,
      
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
    setLearningPath({
        name ,
        description ,
        modules ,
        coins ,
        manager ,
        domains ,
        image ,
      
        learningPoints ,
        manager 
    });
  }, [name,
    description ,
    modules ,
    manager ,
    coins ,
    domains ,
    image,
  
    learningPoints ,
    ]);

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
      content: 'Learning Path has been created successfully! ',
    });
  };
  function fail() {
    Modal.success({
      content: 'Learning Path has been updated successfully! ',
    });
  };

  const handleNext = () => {
   
      // if (!title || !description || companies.length === 0 || domains.length === 0 || learningPoints === 0 || practisePoints === 0 || coins === 0) {
      //   // If any of the required fields are empty, show an alert and don't proceed
      //   alert('Please fill in all the required fields.')
      //   return;
      // }
      
      // All required fields are filled, proceed to the next step
      console.log(learningPath)
      if(step<3){
        setStep((prevState) => prevState + 1);
      }
      
   
  };

  const handleBack = () => {
    setStep((prevState) => prevState - 1);
    
  };


  
  function changeName(newName) {
    setName(newName);
  }
  function changeDomains(newDomains) {
    setDomains(newDomains);
  }
  
  function changeModules(newModules) {
    setModules(newModules);
  }
  
  function changeManagers(newManagers) {
    setManager(newManagers._id);
    console.log(newManagers._id)
  }
  
  function changeLearningPoints(newLearningPoints) {
    setLearningPoints(newLearningPoints);
  }
  function changeCoins(newLearningPoints) {
    setCoins(newLearningPoints);
  }
  
  function changeName(newName) {
    setName(newName);
  }
  
  function changeImage(newImage) {
    setImage(newImage);
  }
  
  function changeDescription(newDescription) {
    setDescription(newDescription);
  }
  
  function handleModuleSubmit() {
    if (request === "post") {
      fetch("http://localhost:3000/learning-paths", {
        method: "POST",
        body: JSON.stringify(learningPath),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Update user's modules_created attribute
        
          // Make PATCH request to update user
          
              success();
          
          // Send PATCH request to manager
          fetch(`http://localhost:3000/users/${manager}`)
            .then((response) => response.json())
            .then((managerData) => {
              const oldLearningPaths =
                managerData.learning_paths_managed || [];
              const updatedLearningPaths = [...oldLearningPaths, data._id];
  
              const managerUpdate = {
                learning_paths_managed: updatedLearningPaths,
              };
  
              fetch(`http://localhost:3000/users/${manager._id}`, {
                method: "PATCH",
                body: JSON.stringify(managerUpdate),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        
    } else {
      fetch(`http://localhost:3000/learning-paths/${lpp.key}`, {
        method: "PATCH",
        body: JSON.stringify(learningPath),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          fail();
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  }
  

  const renderStep = () => {
    switch (step) {
      case 0:
        return <LearningPathCreator1
        lp={learningPath}
      
        onChangeCoins={changeCoins}
        onChangeImage={changeImage}
        onChangeLearningPoints={changeLearningPoints}
        onChangeDescription={changeDescription} onChangeName={changeName} 
        onChangeDomains={changeDomains} 
       />;
      case 1:
        return <LearningPathCreator2
        lp={learningPath}
        quests = {modules}
        onChangeModules={changeModules} />;
      case 2:
        return (
          <LearningPathCreator3
          lp={learningPath}
          onChangeUsers={changeManagers}
          
          />)
          case 3:
            return (
              <LearningPathTemplate lpp={learningPath}/>)
      default:
        return null;
    }
  };

  return (
    <div className="container" >
    
     <Steps
    current={step}
    items={[
      {
        title: 'Learning Path Specifics',
      },
      {
        title: 'Modules',
      },
      {
        title: 'Managers',
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

export default LearningPathCreator;
