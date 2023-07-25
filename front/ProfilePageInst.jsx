import { ArrowDownOutlined, ArrowUpOutlined, BookOutlined, CodeOutlined, QuestionCircleOutlined, TrophyOutlined, UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Image, Col, Descriptions, Divider, Modal, Popover, Row, Table, Tabs, Tag, Statistic, Badge, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RegistrationForm1 from './RegistrationForm1';
import RegistrationFormInst from './RegistrationFormInst';
import ProblemCreator from './ProblemCreator';
import CompetitionCreator from './CompetitionCreator';
import ModuleCreator from './ModuleCreator';
import QuestionCreator from './QuesionCreator';
import ReactCalendarHeatmap from 'react-calendar-heatmap';

const { TabPane } = Tabs;

const ProfilePageInst = ({ usern }) => {
  const { id } = useParams();
  const [user, setUser] = useState(usern);
  const [prob, setProb] = useState({});
  const [comp, setComp] = useState({})
  const [mod, setMod] = useState({})
  const [ques, setQues] = useState({})
  const [isEditingModalVisible, setIsEditingModalVisible] = useState(false);
  const [isQuestModalVisible, setIsQuestModalVisible] = useState(false);
  const [isCompModalVisible, setIsCompModalVisible] = useState(false);
  const [isModuleModalVisible, setIsModuleModalVisible] = useState(false);
  const [isProblemModalVisible, setIsProblemModalVisible] = useState(false);
  const [isRecoveryModalVisible, setIsRecoveryModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [lastname, setLastname] = useState('');
  const [wilaya, setWilaya] = useState(1);
  const [birthdate, setBirthdate] = useState()
  const [number, setNumber] = useState(0);
  const [resume, setResume] = useState(null)
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('');
  const [learningPathsManaged, setLearningPathsManaged] = useState([{}])
  const [recoveryAnswer, setRecoveryAnswer] = useState("")
  const [lpData, setlpData] = useState([])

  const [problemsCreated, setProblemsCreated] = useState([{}])
  const [pData, setpData] = useState([])
  const [questionsCreated, setQuestionsCreated] = useState([{}])
  const [qData, setqData] = useState([])
  const [competitionsCreated, setCompetitionsCreated] = useState([{}])
  const [cData, setcData] = useState([])
  const [modulesCreated, setModulesCreated] = useState([{}])
  const [mData, setmData] = useState([])

  const [newuser, setNewUser] = useState({
    username: '',
    firstname: '',
    lastname: '',
    wilaya: 1,
    avatar: '',
    level: 'license',
    email: '',
    password: '',
    birthdate: '',
    role: 'instructor',
    certificate: null,
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
      lastname,
      email,
      password,
      birthdate,
      university,
      major,
      speciality,
      number
    });
  }, [username, avatar, wilaya, level, birthdate, firstname, lastname, email, password, university, major, speciality, number]);
  function changeUsername(name) {
    setUsername(name);
  }
  function changeBirthdate(name) {
    setBirthdate(name)
  }


  function showQuestEditModal(question) {
    setQues((prevQues) => {
      // Update the prob state with the new problem
      return question;
    });
    setIsQuestModalVisible(!isQuestModalVisible)
  }
  function showModuleEditModal(module) {
    setMod((prevMod) => {
      // Update the prob state with the new problem
      return module;
    });
    setIsModuleModalVisible(!isModuleModalVisible)
  }

  function showCompEditModal(competition) {
    setComp((prevCompetition) => {
      // Update the prob state with the new problem
      return competition;
    });
    setIsCompModalVisible(!isCompModalVisible)
  }
  function showProblemEditModal(problem) {

    setProb((prevProblem) => {
      // Update the prob state with the new problem
      return problem;
    });

    setIsProblemModalVisible(true);
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
  function changeIamge(image) {
    setAvatar(image)
  }
  function changeImage(image) {
    setAvatar(image)
  }

  function changeResume(resume) {
    setResume(resume)
  }

  function changeWilaya(type) {
    setWilaya(type)
  }
  function changeLevel(level) {
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

  const handleUpdateSubmit = () => {


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
  // Fetch instructor data using the `id`
  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));

        // Update the state variables
        // setProblemsCreated(data.problems_created)
        // setCompetitionsCreated(data.competitions_created);
        // setLearningPathsManaged(data.learning_paths_managed)
        // setQuestionsCreated(data.questions_created)
        // setLikedLearningPaths(data.liked_learning_paths.length);

        const submissionPromises = data.problems_created.map((submissionId) =>
          fetch(`http://localhost:3000/problems/${submissionId}`).then((res) => res.json())
        );

        Promise.all(submissionPromises)
          .then((submissionData) => {
            setProblemsCreated(submissionData);
          })
          .catch((error) => console.error(error));

        const questionsPromises = data.questions_created.map((submissionId) =>
          fetch(`http://localhost:3000/questions/${submissionId}`).then((res) => res.json())
        );

        Promise.all(questionsPromises)
          .then((submissionData) => {
            setQuestionsCreated(submissionData);
          })
          .catch((error) => console.error(error));

        const learningPathPromises = data.learning_paths_managed.map((learningPath) =>
          fetch(`http://localhost:3000/learning-paths/${learningPath}`)
            .then((res) => res.json())
            .catch((error) => console.error(error))
        );

        Promise.all(learningPathPromises)
          .then((learningPathData) => {
            setLearningPathsManaged(learningPathData);
          })
          .catch((error) => console.error(error));


        const modulePromises = data.modules_created.map((learningPath) =>
          fetch(`http://localhost:3000/modules/${learningPath}`)
            .then((res) => res.json())
            .catch((error) => console.error(error))
        );

        Promise.all(modulePromises)
          .then((learningPathData) => {
            setModulesCreated(learningPathData);
          })
          .catch((error) => console.error(error));
        // Fetch competitions
        const competitionPromises = data.competitions_created.map((competition) =>
          fetch(`http://localhost:3000/competitions/${competition}`)
            .then((res) => res.json())
            .catch((error) => console.error(error))
        );



        Promise.all(competitionPromises)
          .then((competitionData) => {
            setCompetitionsCreated(competitionData);
          })
      })
      .catch((error) => console.error(error));

  }, []);

  const handleEditProfile = () => {
    setIsEditingModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsEditingModalVisible(false);
  };
  const columnsQuest = [
    {
      title: 'Question Text',
      dataIndex: 'questionText',
      key: 'questionText',
    },
    {
      title: 'Domains',
      dataIndex: 'domains',
      key: 'domains',
      render: (domains) => (
        <div>
          <Col span={4}>
            {domains.slice(0, 1).map((domain) => (
              <Tag key={domain} color="blue">
                {domain}
              </Tag>
            ))}
            {domains.length > 1 && (
              <Popover
                placement="bottom"
                content={
                  <>
                    {domains.slice(1).map((domain) => (
                      <Tag key={domain} color="blue">
                        {domain}
                      </Tag>
                    ))}
                  </>
                }
              >
                <Tag color="blue">+{domains.length - 1} more</Tag>
              </Popover>
            )}
          </Col></div>
      ),
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record, question) => (
        <Button onClick={() => showQuestEditModal(record, question)}>Edit</Button>
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record, question) => (
        <Button onClick={() => deleteQuestion(record, question)}>Delete</Button>
      )
    },

  ];
  const moduleColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Domains',
      dataIndex: 'domains',
      key: 'domains',
      render: (domains) => (
        <div>
          <Col span={4}>
            {domains.slice(0, 1).map((domain) => (
              <Tag key={domain} color="blue">
                {domain}
              </Tag>
            ))}
            {domains.length > 1 && (
              <Popover
                placement="bottom"
                content={
                  <>
                    {domains.slice(1).map((domain) => (
                      <Tag key={domain} color="blue">
                        {domain}
                      </Tag>
                    ))}
                  </>
                }
              >
                <Tag color="blue">+{domains.length - 1} more</Tag>
              </Popover>
            )}
          </Col>
        </div>
      ),
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
      render: (creationDate) => new Date(creationDate).toLocaleDateString(),

    },
    {
      title: 'Number of Questions',
      dataIndex: 'numQuestions',
      key: 'numQuestions',


    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record, module) => (
        <Button onClick={() => showModuleEditModal(record, module)}>Edit</Button>
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record, module) => (
        <Button onClick={() => deleteModule(record, module)}>Delete</Button>
      ),
    },
  ];

  const problemColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Domains',
      dataIndex: 'domains',
      key: 'domains',
      render: (domains ) => (
        <div>
          <Col span={4}>
            {domains?.slice(0, 1).map((domain) => (
              <Tag key={domain} color="blue">
                {domain}
              </Tag>
            ))}
            {domains?.length > 1 && (
              <Popover
                placement="bottom"
                content={
                  <>
                    {domains?.slice(1).map((domain) => (
                      <Tag key={domain} color="blue">
                        {domain}
                      </Tag>
                    ))}
                  </>
                }
              >
                <Tag color="blue">+{domains?.length - 1} more</Tag>
              </Popover>
            )}
          </Col>
        </div>
      ),
    },
    {
      title: 'LP',
      dataIndex: 'learningPoints',
      key: 'learningPoints',
    },
    {
      title: 'PeP',
      dataIndex: 'practisePoints',
      key: 'practisePoints',
    },
    {
      title: 'Coins',
      dataIndex: 'coins',
      key: 'coins',
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
      render: (creationDate) => new Date(creationDate).toLocaleDateString(),
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record, problem) => (
        <Button onClick={() => showProblemEditModal(record, problem)}>Edit</Button>
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record) => (
        <Button onClick={() => deleteProblem(record)}>Delete</Button>
      ),
    },
  ];


  const columnsCompetition = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Participation Coins',
      dataIndex: 'coins',
      key: 'coins',
    },
    {
      title: 'Pep',
      dataIndex: 'practisePoints',
      key: 'practisePoints',
    },
    {
      title: 'Status',
      dataIndex: 'competitionStatus',
      key: 'competitionStatus',
      render: (competitionStatus) => {
        let color = '';
        let text = '';

        switch (competitionStatus) {
          case 'archived':
            color = 'red';
            text = 'Archived';
            break;
          case 'active':
            color = 'green';
            text = 'Active';
            break;
          case 'pending':
            color = 'orange';
            text = 'Pending';
            break;
          default:
            color = 'default';
            text = 'Unknown';
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },

    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <div>
          {date.map((d) => (
            <Tag color='purple' key={d}>{new Date(d).toLocaleString()}</Tag>
          ))}
        </div>
      ),
    },

    {
      title: 'Domains',
      dataIndex: 'domains',
      key: 'domains',
      render: (domains) => (
        <div>
          <Col span={4}>
            {domains.slice(0, 1).map((domain) => (
              <Tag key={domain} color="blue">
                {domain}
              </Tag>
            ))}
            {domains.length > 1 && (
              <Popover
                placement="bottom"
                content={
                  <>
                    {domains.slice(1).map((domain) => (
                      <Tag key={domain} color="blue">
                        {domain}
                      </Tag>
                    ))}
                  </>
                }
              >
                <Tag color="blue">+{domains.length - 1} more</Tag>
              </Popover>
            )}
          </Col>
        </div>
      ),
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record, competition) => (
        <Button onClick={() => showCompEditModal(record, competition)}>Edit</Button>
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record) => (
        <Button onClick={() => deleteCompetition(record)}>Delete</Button>
      ),
    },
  ];
  const lpColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Participation Coins',
      dataIndex: 'coins',
      key: 'coins',
    },
    {
      title: 'LP',
      dataIndex: 'learningPoints',
      key: 'learningPoints',
    },


    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
      render: (creationDate) => new Date(creationDate).toLocaleDateString(),
    },

    {
      title: 'Domains',
      dataIndex: 'domains',
      key: 'domains',
      render: (domains) => (
        <div>
          <Col span={4}>
            {domains.slice(0, 1).map((domain) => (
              <Tag key={domain} color="blue">
                {domain}
              </Tag>
            ))}
            {domains.length > 1 && (
              <Popover
                placement="bottom"
                content={
                  <>
                    {domains.slice(1).map((domain) => (
                      <Tag key={domain} color="blue">
                        {domain}
                      </Tag>
                    ))}
                  </>
                }
              >
                <Tag color="blue">+{domains.length - 1} more</Tag>
              </Popover>
            )}
          </Col>
        </div>
      ),
    },
    // {
    //   title: '',
    //   dataIndex: 'edit',
    //   key: 'edit',
    //   render: (text, record,lp) => (
    //     <Button onClick={() => showCompEditModal(record,lp)}>Edit</Button>
    //   ),
    // },

  ];
  useEffect(() => {
    // Prepare the data for the leaderboard table
    const questionsData = questionsCreated.map((question) => {
      if (question.message ==="Question not found") {
        // If question.message is defined, skip this question
        return {};
    }
    console.log(question.domains)
      return {
        key: question._id,
        questionText: question.questionText,
        domains: question.domains,
        possibleAnswers: question.possibleAnswers,
        rightAnswers: question.rightAnswers
      };
    });

    setqData(questionsData);
  }, [questionsCreated]);

  useEffect(() => {
    // Prepare the data for the leaderboard table
    const modulesData = modulesCreated.map((module) => {
      if (module.message !== undefined) {
        // If question.message is defined, skip this question
        return null;
    }
      return {
        key: module._id,
        name: module.name,
        domains: module.domains,
        questions: module.questions,

        description: module.description,
        content: module.content,
        creationDate: module.creationDate
      };
    });
    setmData(modulesData);
  }, [modulesCreated]);


  useEffect(() => {
    // Prepare the data for the competition table
    const competitionsData = competitionsCreated.map((competition) => {
      
      if (competition.message !== undefined) {
        // If question.message is defined, skip this question
        return null;
    }
      return {
        key: competition._id,
        title: competition.title,
        coins: competition.coins,
        practisePoints: competition.practisePoints,
        competitionStatus: competition.competitionStatus,
        date: competition.date,
        domains: competition.domains,
        image: competition.image,
        judgingCriteria: competition.judgingCriteria,
        prefferredDate: competition.prefferredDate,
        competitionType: competition.competitionType,
        teamLimit: competition.teamLimit,
        numParticipants: competition.numParticipants,
        prizePool: competition.prizePool,
        design: competition.design,
        problems: competition.problems,
        problemsTime: competition.problemsTime,
        problemsSubmissions: competition.problemsSubmissions,
        questions: competition.questions,
        questionsTime: competition.questionsTime,
        debug: competition.debug,
        debugTime: competition.debugTime,
        competitionStatus: competition.competitionStatus,
        description: competition.description,
        edit: competition
      };
    });

    setcData(competitionsData);
  }, [competitionsCreated]);
  useEffect(() => {
    // Prepare the data for the problem table
    const problemsData = problemsCreated.map((problem) => {
      
      if (problem.message !== undefined) {
        // If question.message is defined, skip this question
        return null;
    }
      return {
        key: problem._id,
        title: problem.title,
        domains: problem.domains,
        learningPoints: problem.learningPoints,
        practisePoints: problem.practisePoints,
        coins: problem.coins,
        creationDate: problem.creationDate,
        description: problem.description,
        judge: problem.judge,
        boilerplate: problem.boilerplate,
        edit: problem
      };
    });

    setpData(problemsData);
  }, [problemsCreated]);
  useEffect(() => {
    // Prepare the data for the problem table
    const lpData = learningPathsManaged.map((lp) => {
      return {
        key: lp._id,
        name: lp.name,
        domains: lp.domains,
        learningPoints: lp.learningPoints,
        coins: lp.coins,
        creationDate: lp.creationDate,
        description: lp.description,

        edit: lp
      };
    });

    setlpData(lpData);
  }, [learningPathsManaged]);
  function deleteProblem() {

  }
  function deleteCompetition() {

  }
  function deleteModule() {

  }
  function deleteQuestion() {

  }
  const ProblemModal = ({ problem, onClose }) => {
    return (
      <Modal visible={true} onCancel={onClose} footer={null}>
        <ProblemCreator problemm={problem} />
      </Modal>
    );
  };
  const handleRecoveryConfirmation = () => {
    if (recoveryAnswer === user.recoveryResponse) {
      handleUpdateSubmit();
    } else {
      // Handle incorrect recovery answer
      // You can show an error message or take appropriate action
    }
  };
  
  return (
    <>
      <Row>
        <Col span={6}>
          <Badge.Ribbon text="Instructor" color="blue">

            <Card
              title="Insctuctor Profile"

            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src={user.avatar} style={{ borderRadius: '50%', width: '150px', height: '150px' }} />
              </div>


              <Descriptions column={1}>
                <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
                <Descriptions.Item label="First Name">{user.firstname}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{user.lastname}</Descriptions.Item>
                <Descriptions.Item label="Wilaya">{user.wilaya}</Descriptions.Item>
                <Descriptions.Item label="Major">{user.major}</Descriptions.Item>
                <Descriptions.Item label="Specialty">{user.specialty}</Descriptions.Item>
                <Descriptions.Item label="Level">{user.level}</Descriptions.Item>


              </Descriptions>
              <Button onClick={handleEditProfile} icon={<UserAddOutlined />}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </Button>
            </Card>
          </Badge.Ribbon>
        </Col>
        <Col span={18} style={{ paddingLeft: 15 }}>
          <Divider></Divider>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Record" key="1">
              <Divider>Statistics</Divider>
              <Row gutter={16}>
                <Col span={6}>
                  <Card bordered={false}>
                    <Statistic
                      title="Problems Created"
                      value={problemsCreated.length}
                      valueStyle={{ color: 'black' }}
                      prefix={<CodeOutlined />}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card bordered={false}>
                    <Statistic
                      title="Modules Created"
                      value={modulesCreated.length}
                      valueStyle={{ color: 'black' }}
                      prefix={<BookOutlined />}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card bordered={false}>
                    <Statistic
                      title="Competitions Created"
                      value={competitionsCreated.length}
                      valueStyle={{ color: 'black' }}
                      prefix={<TrophyOutlined />}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card bordered={false}>
                    <Statistic
                      title="Questions Created"
                      value={questionsCreated.length}
                      valueStyle={{ color: 'black' }}
                      prefix={<QuestionCircleOutlined />}
                    />
                  </Card>
                </Col>
              </Row>
              <Divider>Submissions</Divider>
              <Row gutter={[16, 16]}>
                <ReactCalendarHeatmap
                  startDate={new Date('2023-01-01')}
                  endDate={new Date('2023-12-31')}
                  values={competitionsCreated.map((date) => ({ date }))}
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
              </Row>
            </TabPane>

            <TabPane tab="Competitions Created" key="2">
              <Table columns={columnsCompetition} dataSource={cData} pagination={false} />
            </TabPane>
            <TabPane tab="Problems Created" key="3">
              <Table columns={problemColumns} dataSource={pData} pagination={false} />

            </TabPane>
            <TabPane tab="Questions" key="4">
              <Table columns={columnsQuest} dataSource={qData} pagination={false} />

            </TabPane>
            <TabPane tab="Modules" key="5">
              <Table columns={moduleColumns} dataSource={mData} pagination={false} />

            </TabPane>
          </Tabs>
        </Col>
      </Row>
      <Modal visible={isEditingModalVisible} onOk={handleUpdateSubmit} onCancel={handleModalCancel} title="Edit Profile" footer={null}>
        <RegistrationForm1
        user={user}
        onChangeUsername={changeUsername}
          onChangeFirstname={changeFirstname}
          onChangeLastname={changeLastname}
          onChangeEmail={changeEmail}
          onChangePassword={changePassword}
          onChangeBirthdate={changeBirthdate}
          onChangeNumber={changeNumber} />
        <RegistrationFormInst
        user={user}
         onChangeUniversity={changeUniversity}
        
          onChangeMajor={changeMajor}
          onChangeSpeciality={changeSpeciality}
          onChangeLevel={changeLevel}
          onChangeWilaya={changeWilaya}
          request='patch'
          onChangeImage={changeImage} />
        <Button onClick={()=>setIsRecoveryModalVisible(true)}>Update</Button>
      </Modal>
      <Modal
        width={1000}
        visible={isProblemModalVisible}
        onCancel={() => setIsProblemModalVisible(false)}
        footer={null}
      >
        <ProblemCreator usern={user} request='patch' problemm={prob} />
      </Modal>
      <Modal
        width={1000}
        visible={isCompModalVisible}
        onCancel={() => setIsCompModalVisible(false)}
        footer={null}
      >
        <CompetitionCreator usern={user} request='patch' competitionn={comp} />
      </Modal>
      <Modal
        width={1000}
        visible={isModuleModalVisible}
        onCancel={() => setIsModuleModalVisible(false)}
        footer={null}
      >
        <ModuleCreator usern={user} request='patch' modulee={mod} />
      </Modal>
      <Modal
        width={1000}
        visible={isQuestModalVisible}
        onCancel={() => setIsQuestModalVisible(false)}
        footer={null}
      >
        <QuestionCreator questionn={ques} usern={user} request='patch' />
      </Modal>
      <Modal
        width={1000}
        visible={isRecoveryModalVisible}
        onCancel={() => setIsRecoveryModalVisible(false)}
        footer={null}
      >
        <div>
          <p>{user.recoveryQuestion}</p>
          <Input value={recoveryAnswer} onChange={(e) => setRecoveryAnswer(e.target.value)} />
          <Button type="primary" onClick={handleRecoveryConfirmation}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ProfilePageInst;
