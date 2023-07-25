import { Card, Col, Descriptions, Progress, Row,Image, Modal, Divider, Carousel, Button, Avatar, Badge, Tabs, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { UserAddOutlined } from '@ant-design/icons';
import RegistrationForm1 from './RegistrationForm1';
import RegistrationFormDev from './RegistrationFormDev';
import TabPane from 'antd/es/tabs/TabPane';

const ProfilePageDev = ({ usern }) => {
  const [user, setUser] = useState(usern);
  const { id } = useParams();

  const [message, setMessage] = useState('')

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
  const [speciality, setSpeciality] = useState('');
  const [number, setNumber] = useState(0);
  const [password, setPassword] = useState('');
  const [resume,setResume] = useState(null)
  const [jobApplications, setJobApplications] = useState([{}]);
  const [jData, setjData] = useState([])
  const [recoveryQuestion, setRecoveryQuestion] = useState('');
  const [recoveryResponse, setRecoveryResponse] = useState('');
  const [domains, setDomains] = useState([]);
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [problems, setProblems] = useState(0);
  const [submissions, setSubmissions] = useState(0);
  const [competitions, setCompetitions] = useState(0);
  const [quests, setQuests] = useState(0);
  const [interviews, setInterviews] = useState(0);
  const [learningPaths, setLearningPaths] = useState(0);
  const [likedLearningPaths, setLikedLearningPaths] = useState(0);
  const [isEditingModalVisible, setIsEditingModalVisible] = useState(false);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);

  const [submissionDates, setSubmissionDates] = useState([]);
  const [newuser, setNewUser] = useState({
    username: '',
    firstname: '',
    gradYear : 2023,
    lastname: '',
    wilaya : 1,
    avatar : '',
    level : 'license',
    email: '',
    password: '',
    type : 'independant',
    birthdate : '',
    role: 'developer',
    certificate : null,
    university: '',
    major: '',
    speciality: '',
    number: ''
  });
  useEffect(() => {
    setNewUser({
      username,
      resume,
      firstname,
      wilaya,
      level,
      avatar,
      gradYear,
      type,

      lastname,
      email,
      password,
      birthdate,


      domains,
      university,
      major,
      speciality,


      number
    });
  }, [username,avatar,wilaya,gradYear, type,level,birthdate, firstname, lastname, email, password, recoveryQuestion, recoveryResponse, university, major, speciality, number]);
  
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
 
  

  
  function changeNumber(number) {
    setNumber(number);
  }
 
  function success() {
    Modal.success({
      content: 'Account has been updated successfully! ',
    });
  };

  function showMessageModal(message) {
    setMessage((prevMessage) => {
        // Update the prob state with the new problem
        return message;
    });
    console.log(message)
    setIsMessageModalVisible(!isMessageModalVisible)
}

  const handleUpdateSubmit = () => {
    console.log(user)
 
    fetch(`http://localhost:3000/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newuser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        success();
        
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));

        // Update the state variables
        setProblems(data.problems.length);
        setSubmissions(data.submissions.length);
        setCompetitions(data.competitions.length);
        setQuests(data.quests.length);
        setInterviews(data.interviews.length);

        setLikedLearningPaths(data.liked_learning_paths.length);
   
        setLastname(data.lastname);
        setBirthdate(data.birthdate);
        setNumber(data.number);
        setEmail(data.email);
        setPassword(data.password);
        setAvatar(data.avatar);



        const submissionPromises = data.submissions.map((submissionId) =>
          fetch(`http://localhost:3000/submissions/${submissionId}`).then((res) => res.json())
        );

        Promise.all(submissionPromises)
          .then((submissionData) => {
            const dates = submissionData.map((submission) => new Date(submission.date));
            setSubmissionDates(dates);
          })
          .catch((error) => console.error(error));
  
          const applicationPromises =data.job_applications.map((application) =>
          fetch(`http://localhost:3000/job-offers/${application.offer}`).then((res) => res.json())
        );
        
        Promise.all(applicationPromises)
          .then((applicationData) => {
            const jobApplications = applicationData.map((offer, index) => ({
              offer,
              response: data.job_applications[index].response,
              message: data.job_applications[index].message,
            }));
            setJobApplications(jobApplications);
            console.log(jobApplications)
          })
          .catch((error) => console.error(error));
        
  
      const learningPathPromises = data.learning_paths.map((learningPath) =>
    fetch(`http://localhost:3000/learning-paths/${learningPath.lp}`)
      .then((res) => res.json())
      .catch((error) => console.error(error))
  );

  Promise.all(learningPathPromises)
    .then((learningPathData) => {
      setLearningPaths(learningPathData);
    })
    .catch((error) => console.error(error));

  // Fetch competitions
  const competitionPromises = data.competitions.map((competition) =>
    fetch(`http://localhost:3000/competitions/${competition}`)
      .then((res) => res.json())
      .catch((error) => console.error(error))
  );

  Promise.all(competitionPromises)
    .then((competitionData) => {
      setCompetitions(competitionData);
    }) })
    .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Prepare the data for the problem table
    const applicationData = jobApplications.map((app) => {
  
        return {
           
            title : app.offer,
            company : app.offer,
            response : app.response,
            message: app.message

        };
    });

    setjData(applicationData);
}, [jobApplications]);
  const applicationColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (offer) => (
              
                                    <>  {offer.title}</>  
                                    
                              
    ),
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
            render: (offer) => (
                      <Tag key={offer} color="red">
                                                {offer.company}
                                            </Tag>
                                      
            ),
        },
        {
          title: 'Response',
          dataIndex: 'response',
          key: 'response',
          render: (response) => {
            let color;
            switch (response) {
              case 'pending':
                color = 'orange';
                break;
              case 'accepted':
                color = 'green';
                break;
              case 'rejected':
                color = 'red';
                break;
              default:
                color = 'default';
                break;
            }
          
            return <Tag key={response} color={color}>{response}</Tag>;
          },
          
      },
      {
        title: '',
        dataIndex: 'message',
        key: 'message',
        render: (text, record, message) => (
          <Button onClick={() => showMessageModal(record, message)}>Show Message</Button>
        ),
      },
      
    ];
  const handleEditProfile = () => {
    setIsEditingModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsEditingModalVisible(false);
  };
  let lpn = learningPaths.length
  let cn = competitions.length
  return (
    <>
      <Row>
        <Col span={6}>
        <Badge.Ribbon text="Developer" color="green">

          <Card
            title="Developer Profile"
            
          >
             <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src={user.avatar} style={{ borderRadius: '50%', width: '150px', height: '150px' }} />
              </div>

         

            <Descriptions column={1}>
             <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
              <Descriptions.Item label="First Name">{user.firstname}</Descriptions.Item>
              <Descriptions.Item label="Last Name">{user.lastname}</Descriptions.Item>
              <Descriptions.Item label="Wilaya">{user.wilaya}</Descriptions.Item>
              <Descriptions.Item label="Learning Points">{user.learning_points}</Descriptions.Item>
              <Descriptions.Item label="Practice Points">{user.practise_points}</Descriptions.Item>
              <Descriptions.Item label="Coins">{user.coins}</Descriptions.Item>
                {user.type ==='Academic'? <><Descriptions.Item label="University">{user.university}</Descriptions.Item>
              <Descriptions.Item label="Major">{user.major}</Descriptions.Item>
              <Descriptions.Item label="Specialty">{user.specialty}</Descriptions.Item>
              <Descriptions.Item label="Level">{user.level}</Descriptions.Item>
              <Descriptions.Item label="Graduation Year">{user.gradYear}</Descriptions.Item>
   </> : <></>}
              
            </Descriptions>
            <Button onClick={handleEditProfile} icon={<UserAddOutlined/>}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </Button>
          </Card>
          </Badge.Ribbon>
        </Col>
        <Col span={18} style={{ paddingLeft: 15 }}>
          <Tabs>
            <TabPane tab="Record" key="1">
     
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <h2>Competitions</h2>
              <Progress type="circle" strokeColor="blue" percent={99.99} format={(percent) => `${cn}`} />
            </Col>
            <Col span={8}>
              <h2>Learning Paths</h2>
              <Progress type="circle" strokeColor="green" percent={99.99} format={(percent) => `${lpn}`} />
            </Col>
            <Col span={8}>
              <h2>Problems Solved</h2>
              <Progress type="circle" strokeColor="orange" percent={99.99} format={(percent) => `${problems}`} />
            </Col>
          </Row>
          <Divider>Submissions</Divider>
          <Row gutter={[16, 16]}>
            <ReactCalendarHeatmap
              startDate={new Date('2023-01-01')}
              endDate={new Date('2023-12-31')}
              values={submissionDates.map((date) => ({ date }))}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-filled`;
              }}
              showMonthLabels
              monthLabels={[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ]}
              gutterSize={5}
            />
          </Row></TabPane>
          <TabPane tab="Job Applications" key="2">
              <Table columns={applicationColumns} dataSource={jData} pagination={false}/>

          </TabPane>
          </Tabs>
          
        </Col>
      </Row>

      {/* Profile Editing Modal */}
      {user.type ==='Academic'? <Modal visible={isEditingModalVisible} onOk={handleUpdateSubmit} onCancel={handleModalCancel} title="Edit Profile"   footer={null}>
     
        <RegistrationFormDev
        user={user}
        request='patch'
         onChangeType={changeType} onChangeUniversity={changeUniversity}
                onChangeMajor={changeMajor}
                onChangeSpeciality={changeSpeciality}
                onChangeRecoveryQuestion={changeRecoveryQuestion}
                onChangeRecoveryResponse={changeRecoveryResponse}
                onChangeLevel={changeLevel}
                onChangeWilaya={changeWilaya}
                onChangeGradYear={changeGradYear}
                onChangeImage={changeImage}/>
                <Button onClick={handleUpdateSubmit}>Update</Button>
      </Modal>: <Modal visible={isEditingModalVisible} onCancel={handleModalCancel} onOk={handleUpdateSubmit}>
     
      <RegistrationFormDev
        
        request='patch'
        user={user}
         onChangeType={changeType} onChangeUniversity={changeUniversity}
                onChangeMajor={changeMajor}
                onChangeSpeciality={changeSpeciality}
                onChangeRecoveryQuestion={changeRecoveryQuestion}
                onChangeRecoveryResponse={changeRecoveryResponse}
                onChangeLevel={changeLevel}
                onChangeWilaya={changeWilaya}
                onChangeGradYear={changeGradYear}
                onChangeImage={changeImage}/>
        <Button>Update</Button>
        </Modal>}
        <Modal
                width={1000}
                visible={isMessageModalVisible}
                onCancel={() => setIsMessageModalVisible(false)}
                footer={null}
            >
              <p>{message.message}</p>
               </Modal>
    </>
  );
};

export default ProfilePageDev;
