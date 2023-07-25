import React, { useEffect, useState } from "react";
import CompetitionCreator1 from "./CompetitionCreator1";
import CompetitionCreator2 from "./CompetitionCreator2";
import Problem from "./Problem";
import Nav0 from './Home/Nav0';
import { Modal, Space, Steps } from "antd";
import ProblemTemplate from "./ProblemTemplate";
import CompetitionCreator3 from "./CompetitionCreator3";
import CompetitionCreator4 from "./CompetitionCreator4";
import RegistrationForm3 from "./RegistrationForm3";
import RegistrationFormDev from "./RegistrationFormDev";
import RegistrationFormInst from "./RegistrationFormInst";
import RegistrationFormComp from "./RegistrationFormComp";
import RegistrationForm1 from "./RegistrationForm1";
import RegistrationForm2 from "./RegistrationForm2";
import './styles/Register.css'
import { faLevelUp } from "@fortawesome/free-solid-svg-icons";
import {
  Nav00DataSource,

} from './Home/data.source';

import { enquireScreen } from 'enquire-js';

const UpdateForm = ({usern, onChangeU}) => {
  let isMobile;
  enquireScreen((b) => {
    isMobile = b;
  });
const [step, setStep] = useState(0)
const [code, setCode] = useState(0)
    const [username, setUsername] = useState(usern.username);
  const [firstname, setFirstname] = useState(usern.firstname);
  const [avatar, setAvatar] = useState(usern.avatar || '');
  const [lastname, setLastname] = useState(usern.lastname || '');
  const [wilaya, setWilaya] = useState(usern.wilaya || 1);
  const [gradYear, setGradYear] = useState(usern.gradYear || 2023);
  const [birthdate, setBirthdate] = useState(usern.birthdate || null);
  const [type, setType] = useState(usern.type || '');
  const [level, setLevel] = useState(usern.level || 'License');
  const [email, setEmail] = useState(usern.email || '');
  const [password, setPassword] = useState(usern.password || '');
  const [resume, setResume] = useState(usern.resume || null);
  const [role, setRole] = useState(usern.role || '');
  const [recoveryQuestion, setRecoveryQuestion] = useState(usern.recoveryQuestion || '');
  const [recoveryResponse, setRecoveryResponse] = useState(usern.recoveryResponse || '');
  const [domains, setDomains] = useState(usern.domains || []);
  const [university, setUniversity] = useState(usern.university || '');
  const [major, setMajor] = useState(usern.major || '');
  const [speciality, setSpeciality] = useState(usern.speciality || '');
  const [certificate, setCertificate] = useState(usern.certificate || null);
  const [company, setCompany] = useState(usern.company || '');
  const [site, setSite] = useState(usern.site || '');
  const [number, setNumber] = useState(usern.number || '');
  
  const [user, setUser] = useState(
   usern
  );


  useEffect(() => {
    setUser({
      username,
      resume,
      firstname,
      wilaya,
      level,
      avatar,
      gradYear,
      type,
      certificate,
      lastname,
      email,
      password,
      birthdate,
      role,
      recoveryQuestion,
      recoveryResponse,
      domains,
      university,
      major,
      speciality,
      company,
      site,
      number
    });
  }, [username,avatar,resume,wilaya,gradYear, type,level,birthdate,certificate, firstname, lastname, email, password, role, recoveryQuestion, recoveryResponse, domains, university, major, speciality, company, site, number]);
  

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
      content: 'Account has been created successfully! ',
    });
  };


  const handleNext = () => {
   



    
    //   All required fields are filled, proceed to the next step
      console.log(user)
      if(step<2){
        setStep((prevState) => prevState + 1);
      }
      
   
  };
  function changeUsername(name) {
    setUsername(name)
  }
  function changeImage(image) {
    setAvatar(image)
  }
  function changeGradYear(name) {
    setGradYear(name)
  }
  function changeResume(resume) {
    setResume(resume)
  }
  function changeType(type)
  {
    setType(type)
  }
  function changeWilaya(type)
  {
    setWilaya(type)
  }
  function changeLevel(level)
  {
    setLevel(level)
  }

  const handleBack = () => {
    setStep((prevState) => prevState - 1);
    
  };

  function changeUsername(name) {
    setUsername(name);
  }
  function changeBirthdate(name) {
    setBirthdate(name)
  }
  
  function changeFirstname(name) {
    setFirstname(name);
  }
  
  function changeLastname(name) {
    setLastname(name);
  }
  
  function changeEmail(email) {

    setEmail(email);
  }
  
  function changePassword(password) {
    setPassword(password);
  }
  
  function changeRole(role) {
    setRole(role);
  }
  
  function changeRecoveryQuestion(question) {
    setRecoveryQuestion(question);
  }
  
  function changeRecoveryResponse(response) {
    setRecoveryResponse(response);
  }
  
  function changeDomains(domains) {
    setDomains(domains);
  }
  
  function changeUniversity(university) {
    setUniversity(university);
  }
  
  function changeMajor(major) {
    setMajor(major);
  }
  
  function changeSpeciality(speciality) {
    setSpeciality(speciality);
  }
  
  function changeCompany(company) {
    setCompany(company);
  }
  
  function changeSite(site) {
    setSite(site);
  }
  
  function changeNumber(number) {
    setNumber(number);
  }
  function changeCertificate(certificate) {
    setCertificate(certificate);
  }
  
  

  const handleCompetitionSubmit = () => {
    console.log(user)
 
    fetch(`http://localhost:3000/users/${usern._id}`, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        success();
        console.log(data)
      onChangeU(user)})
      .catch((error) => console.log(error));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <RegistrationForm1
        user={user}
        onChangeUsername={changeUsername}
        onChangeFirstname={changeFirstname}
        onChangeLastname={changeLastname}
        onChangeEmail={changeEmail}
        onChangePassword={changePassword}
        onChangeBirthdate={changeBirthdate}
        onChangeNumber={changeNumber} />
        case 1:
            if(role === 'developer')
            {
                return <RegistrationFormDev
                user={user}
                onChangeType={changeType} onChangeUniversity={changeUniversity}
                onChangeMajor={changeMajor}
                onChangeSpeciality={changeSpeciality}
                onChangeRecoveryQuestion={changeRecoveryQuestion}
                onChangeRecoveryResponse={changeRecoveryResponse}
                onChangeLevel={changeLevel}
                onChangeWilaya={changeWilaya}
                onChangeGradYear={changeGradYear}
                onChangeImage={changeImage}
                request='patch'
                />
            }
            else if(role === 'instructor')
            {
                return <RegistrationFormInst 
                user={user}
                onChangeResume={changeResume}
                onChangeUniversity={changeUniversity}
              onChangeWilaya={changeWilaya}
              onChangeMajor={changeMajor}
              onChangeSpeciality={changeSpeciality}
              onChangeRecoveryQuestion={changeRecoveryQuestion}
              onChangeRecoveryResponse={changeRecoveryQuestion}
              onChangeLevel={changeLevel}
              onChangeImage={changeImage}
              request='patch'
              />
            }
            else {
                return <RegistrationFormComp
                user={user}
                onChangeCompany={changeCompany}
                onChangeCertificateFile={changeCertificate}
                onChangeCertificate={changeCertificate}
                onChangeSite={changeSite}
                onChangeRecoveryQuestion={changeRecoveryQuestion}
                onChangeRecoveryResponse={changeRecoveryResponse}
                onChangeImage={changeImage}
                request='patch'
                />
            }
      default:
        return null;
    }
  };

  return (
   
    <>
     <Steps
   
    current={step}
    items={[
      {
        title: 'User Info',
      },
      {
        title: 'Extra Info',
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
        <button  className="next-button" onClick={step>1 ? handleCompetitionSubmit : handleNext}>
              Next
            </button>   
          </div>
        ) : (
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        )}

</>

    )
};

export default UpdateForm;
