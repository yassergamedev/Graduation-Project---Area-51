import React, { useEffect, useState } from "react";
import CompetitionCreator1 from "./CompetitionCreator1";
import CompetitionCreator2 from "./CompetitionCreator2";
import Problem from "./Problem";
import Nav0 from './Home/Nav0';
import { Modal, Space, Steps, message } from "antd";
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
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({onChangeU, setNew}) => {
  let isMobile;
  enquireScreen((b) => {
    isMobile = b;
  });
const [step, setStep] = useState(0)
const [code, setCode] = useState(0)
    const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [lastname, setLastname] = useState('');
  const [wilaya, setWilaya] = useState(1);
  const [gradYear, setGradYear] = useState(2023)
  const [birthdate, setBirthdate] = useState()
  const [type, setType] = useState('')
  const [level, setLevel] = useState('License')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resume,setResume] = useState(null)
  const [role, setRole] = useState('');
  const [recoveryQuestion, setRecoveryQuestion] = useState('');
  const [recoveryResponse, setRecoveryResponse] = useState('');
  const [domains, setDomains] = useState([]);
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [certificate, setCertificate] = useState(null)
  const [company, setCompany] = useState('');
  const [site, setSite] = useState('');
  const [number, setNumber] = useState('');
  const [user, setUser] = useState({
    username: '',
    firstname: '',
    gradYear : 2023,
    lastname: '',
    wilaya : 1,
    avatar : '',
    resume : null,
    level : 'license',
    email: '',
    password: '',
    type : 'independant',
    birthdate : '',
    role: '',
    certificate : null,
    recoveryQuestion: '',
    recoveryResponse: '',
    domains: [],
    university: '',
    major: '',
    speciality: '',
    company: '',
    site: '',
    number: ''
  });


  const history = useNavigate()

  function navigate(data) {
    alert(data.role)
    setNew(true)
    switch (data.role) {
      case 'developer':
        history(`/dashboard/developer/${data._id}`);
        break;
      case 'recruiter':
        history(`/dashboard/recruiter/${data._id}`);
        break;
      case 'analyst':
        history(`/dashboard/analyst/${data._id}`);
        break;
      case 'instructor':
        history(`/dashboard/instructor/${data._id}`);
        break;
      case 'admin':
        history(`/dashboard/admin/${data._id}`);
        break;
      default:
        alert('Wrong password or email');
    }
  }



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
   
     if(step===0)
     {
       
      if (email ==='' || username==='' || firstname==='' || lastname===''  ) {
        message.error('Please fill all the required form inputs.');
        return;
      }


        fetch("http://localhost:3000/sendcode", {
      method: "POST",
      body: JSON.stringify({email : email}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCode(data)
         alert(data)
      })
      .catch((error) => console.log(error));
     }
      
    //   All required fields are filled, proceed to the next step
      console.log(user)
      if(step<3){
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
  
 


    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        success();
        setNew(true)
        console.log(data.role)
        switch (data.role) {
          case 'developer':
            history(`/dashboard/developer/${data._id}`);
            break;
          case 'recruiter':
            history(`/dashboard/recruiter/${data._id}`);
            break;
          case 'analyst':
            history(`/dashboard/analyst/${data._id}`);
            break;
          case 'instructor':
            history(`/dashboard/instructor/${data._id}`);
            break;
          case 'admin':
            history(`/dashboard/admin/${data._id}`);
            break;
          default:
            alert('Wrong password or email');
        }
      onChangeU(user)})
      .catch((error) => console.log(error));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <RegistrationForm1
        user={{}}
        onChangeUsername={changeUsername}
        onChangeFirstname={changeFirstname}
        onChangeLastname={changeLastname}
        onChangeEmail={changeEmail}
        onChangePassword={changePassword}
        onChangeBirthdate={changeBirthdate}
        onChangeNumber={changeNumber} />
      case 1:
        return <RegistrationForm2 code={code} handleNext={handleNext}/>
      case 2:
        return (
            <RegistrationForm3 onChangeRole={changeRole} handleNext={handleNext}/>)
          case 3:
            if(role === 'developer')
            {
                return <RegistrationFormDev
                user={{}}
                onChangeType={changeType} onChangeUniversity={changeUniversity}
                onChangeMajor={changeMajor}
                onChangeSpeciality={changeSpeciality}
                onChangeRecoveryQuestion={changeRecoveryQuestion}
                onChangeRecoveryResponse={changeRecoveryResponse}
                onChangeLevel={changeLevel}
                onChangeWilaya={changeWilaya}
                onChangeGradYear={changeGradYear}
                onChangeImage={changeImage}
                request='post'
                />
            }
            else if(role === 'instructor')
            {
                return <RegistrationFormInst 
                user={{}}
                onChangeResume={changeResume}
                onChangeUniversity={changeUniversity}
              onChangeWilaya={changeWilaya}
              onChangeMajor={changeMajor}
              onChangeSpeciality={changeSpeciality}
              onChangeRecoveryQuestion={changeRecoveryQuestion}
              onChangeRecoveryResponse={changeRecoveryResponse}
              onChangeLevel={changeLevel}
              onChangeImage={changeImage}
              request='post'
              />
            }
            else {
                return <RegistrationFormComp
                user={{}}
                onChangeCompany={changeCompany}
                onChangeCertificateFile={changeCertificate}
                onChangeCertificate={changeCertificate}
                onChangeSite={changeSite}
                onChangeRecoveryQuestion={changeRecoveryQuestion}
                onChangeRecoveryResponse={changeRecoveryResponse}
                onChangeImage={changeImage}
                request='post'
                />
            }
      default:
        return null;
    }
  };

  return (
    <div className="con">
    <Nav0
    id="Nav0_0"
    key="Nav0_0"
    dataSource={Nav00DataSource}

  />
    <div className="container" style={{width: "50%" }}>
  
     <Steps
   
    current={step}
    items={[
      {
        title: 'User Info',
      },
      {
        title: 'Email Verification',
      },
      {
        title: 'Role',
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
       {step !=1? <button  className="next-button" onClick={step>2 ? handleCompetitionSubmit : handleNext}>
              Next
            </button>: <button style={{backgroundColor : "gray"}}>
              Next
            </button>}     
          </div>
        ) : (
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        )}

      </div>
   

      </div> )
};

export default RegistrationForm;
