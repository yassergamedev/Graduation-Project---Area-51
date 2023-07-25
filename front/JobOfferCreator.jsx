import React, { useEffect, useState } from "react";
import JobOfferCreator1 from "./JobOfferCreator1";
import JobOfferCreator2 from "./JobOfferCreator2";
import Problem from "./Problem";
import './styles/ProblemCreator.css'
import { Modal, Space, Steps } from "antd";
import ProblemTemplate from "./ProblemTemplate";
import { useParams } from "react-router-dom";





const JobOfferCreator = ({request,joboff, usern}) => {


  const [step, setStep] = useState(0);
  const [title, setTitle] = useState(joboff.title)
  const [description, setDescription] = useState(joboff.description)
  const [company, setCompanies] = useState(joboff.company)
  const [domains, setDomains] = useState(joboff.domains)
  const [coins, setCoins] = useState(joboff.coins)
  const [image, setImage] = useState(joboff.image)
  const [challenge, setChallenge] = useState()
  const [user, setUser] = useState(usern)
  const {id} = useParams()
  
  useEffect(() => {
   fetch(`http://localhost:3000/users/${id}`)
     .then((res) => res.json())
     .then((data) => {
       setUser(data);
       localStorage.setItem('user', JSON.stringify(data)
       
       );
       setCompanies(data.company)
     })
     .catch((error) => console.error(error));},[])

  const [jobOffer, setJobOffer] = useState({
    title: joboff.title,
        coins: joboff.coins,
        company : joboff.company,
        domains: joboff.domains,
        image : joboff.image,
        description : joboff.description,
        challenge : joboff.challenge,
        creator : id
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setJobOffer({
        title,
    description,
    creator : id,
    domains,
    image,
    coins,
    challenge,
        company,
    });
  }, [title,
    description,

 image, challenge,

    domains,
    user,
    coins,
    company,
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
      content: 'Job Offer has been created successfully! ',
    });
  };

  function fail() {
    Modal.success({
      content: 'Job Offer has been updated successfully! ',
    });
  };
  const handleNext = () => {
   
      // if (!title || !description || companies.length === 0 || domains.length === 0 || learningPoints === 0 || practisePoints === 0 || coins === 0) {
      //   // If any of the required fields are empty, show an alert and don't proceed
      //   alert('Please fill in all the required fields.')
      //   return;
      // }
      
      // All required fields are filled, proceed to the next step
      console.log(jobOffer)
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
  

  function changeCoins(c) {
    setCoins(c)
  }

  
  function changeChallenge(c) {
    setChallenge(c)
  }


  


  const handleJobOfferSubmit = () => {
    console.log("hi")
    if (request === 'post') {
      fetch('http://localhost:3000/job-offers', {
        method: 'POST',
        body: JSON.stringify(jobOffer),
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
            body: JSON.stringify({ job_offers_created: [...user.job_offers_created, data._id] }),
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
      fetch(`http://localhost:3000/job-offers/${joboff.key}`, {
      method: "PATCH",
      body: JSON.stringify(jobOffer),
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
        return <JobOfferCreator1
        jobOffer={jobOffer}
        onChangeDescription={changeDescription} onChangeTitle={changeTitle} 
        onChangeImage={changeImage}
        onChangeDomains={changeDomains} 
         onChangeCoins={changeCoins} 
        
        />;
      case 1:
        return <JobOfferCreator2
        jobOffer={jobOffer}
        usern={usern}
        onChangeChallenge={changeChallenge}
         />;
      
        
          
          
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
        title: 'Job Offer Challenge',
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
            <button className="next-button" onClick={step>2 ? handleJobOfferSubmit : handleNext}>
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

export default JobOfferCreator;
