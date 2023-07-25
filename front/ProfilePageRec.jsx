import { ArrowDownOutlined, ArrowUpOutlined, BookOutlined, CodeOutlined, FileSearchOutlined, QuestionCircleOutlined, TrophyOutlined, UserAddOutlined } from '@ant-design/icons';
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
import RegistrationFormComp from './RegistrationFormComp';
import ChallengeCreator from './ChallengeCreator';
import JobOfferCreator from './JobOfferCreator';
import Icon from '@ant-design/icons/lib/components/Icon';
import TextArea from 'antd/es/input/TextArea';

const { TabPane } = Tabs;

const ProfilePageRec = ({ usern }) => {
    const { id } = useParams();
    const [user, setUser] = useState(usern);
    const [prob, setProb] = useState({});
    const [comp, setComp] = useState({})
    const [offer, setOffer] = useState({})
    const [applicant, setApplicant] = useState({})
    const [ques, setQues] = useState({})
    const [isEditingModalVisible, setIsEditingModalVisible] = useState(false);
    const [isQuestModalVisible, setIsQuestModalVisible] = useState(false);
    const [isCompModalVisible, setIsCompModalVisible] = useState(false);
    const [isProblemModalVisible, setIsProblemModalVisible] = useState(false);
    const [isOfferModalVisible, setIsOfferModalVisible] = useState(false);
    const [isRecoveryModalVisible, setIsRecoveryModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [username, setUsername] = useState(user.username);
    const [firstname, setFirstname] = useState(user.firstname);
    const [avatar, setAvatar] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthdate, setBirthdate] = useState()
    const [number, setNumber] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [learningPathsManaged, setLearningPathsManaged] = useState([{}])
    const [recoveryAnswer, setRecoveryAnswer] = useState("")

    const [company, setCompany] = useState('')
    const [image, setImage] = useState('')
    const [certificate, setCertificate] = useState(null)
    const [site, setSite] = useState('');


    const [problemsCreated, setProblemsCreated] = useState([{}])
    const [pData, setpData] = useState([])
    const [questionsCreated, setQuestionsCreated] = useState([{}])
    const [qData, setqData] = useState([])
    const [competitionsCreated, setCompetitionsCreated] = useState([{}])
    const [cData, setcData] = useState([])
    const [jobOffersCreated, setJobOffersCreated] = useState([{}])
    const [jData, setjData] = useState([])
    const [aData, setaData] = useState([])


    const [newuser, setNewUser] = useState({
        username: '',
        firstname: '',
        lastname: '',
        wilaya: 1,
        avatar: '',
        email: '',
        password: '',
        birthdate: '',
        role: 'recruiter',
        certificate: null,

        company: '',
        certificate: null,
        site: '',

        number: ''
    });
    useEffect(() => {
        setNewUser({
            username,
            firstname,
            avatar,
            lastname,
            email,
            password,
            birthdate,
            company,
            certificate,
            site,
            number
        });
    }, [username, avatar, birthdate, company,
        certificate,
        site, firstname, lastname, email, password, number]);
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

    function showOfferEditModal(offer) {
        setOffer((prevOffer) => {
            // Update the prob state with the new problem
            return offer;
        });

        setIsOfferModalVisible(true);
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







    function changeUsername(name) {
        setUsername(name)
    }

    function changeImage(image) {
        setAvatar(image)
    }





    function changeNumber(number) {
        setNumber(number);
    }

    function changeCompany(company) {
        setCompany(company)
    }

    function changeCertificate(cer) {
        setCertificate(cer)
    }

    function changeSite(site) {
        setSite(site)
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

                setLastname(data.lastname);
                setBirthdate(data.birthdate);
                setNumber(data.number);
                setEmail(data.email);
                setPassword(data.password);
                setCompany(data.company);
                setImage(data.avatar);
                setCertificate(data.certificate);
                setSite(data.site);

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
                const offersPromises = data.job_offers_created.map((competition) =>
                    fetch(`http://localhost:3000/job-offers/${competition}`)
                        .then((res) => res.json())
                        .catch((error) => console.error(error))
                );



                Promise.all(offersPromises)
                    .then((jobOfferData) => {
                        setJobOffersCreated(jobOfferData);
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

    const applicantColumns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => <Avatar src={avatar} />,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'LP',
            dataIndex: 'lp',
            key: 'lp',
        },
        {
            title: 'PeP',
            dataIndex: 'pep',
            key: 'pep',
        },
        {
            title: 'Coins',
            dataIndex: 'coins',
            key: 'coins',
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Hire',
            dataIndex: 'hire',
            key: 'hire',
            render: (offer, user) => (
                <Button onClick={() => handleConfirm(offer, user)}>Hire</Button>
            ),
        },
        {
            title: 'Reject',
            dataIndex: 'reject',
            key: 'reject',
            render: (offer, user) => (
                <Button onClick={() => handleReject(offer, user)}>Reject</Button>
            ),
        },
    ];




    const handleConfirm = () => {
        // Send PATCH request to update job application
        fetch(`http://localhost:3000/users/${applicant._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                job_applications: applicant.job_applications.map((application) =>
                    application.offer === offer
                        ? {
                            ...application,
                            response: response,
                            message: message,
                        }
                        : application
                ),
            }),
        })
            .then((response) => {
                if (response.ok) {
                    // Handle success response if needed
                    console.log('Job application updated successfully');
                } else {
                    throw new Error('Error updating job application');
                }
            })
            .catch((error) => {
                console.error('Error updating job application:', error);
            });

        // Close the modal
        setModalVisible(false);
    };
    const handleReject = (offer, user) => {
        // Send PATCH request to update job application
        fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                job_applications: user.job_applications.map((application) =>
                    application.offer === offer._id
                        ? {
                            ...application,
                            response: 'rejected',
                            message: message,
                        }
                        : application
                ),
            }),
        })
            .then((response) => {
                if (response.ok) {
                    // Handle success response if needed
                    console.log('Job application updated successfully');
                } else {
                    throw new Error('Error updating job application');
                }
            })
            .catch((error) => {
                console.error('Error updating job application:', error);
            });

        // Close the modal
        setModalVisible(false);
    };

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
            render: (competition) => (
                <Button onClick={() => deleteCompetition(competition)}>Delete</Button>
            ),
        },
    ];
    const jobOfferColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Application Coins',
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
            render: (text, record, lp) => (
                <Button onClick={() => showOfferEditModal(record, lp)}>Edit</Button>
            ),
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record, lp) => (
                <Button onClick={() => deleteJobOffer(record, lp)}>Delete</Button>
            ),
        },

    ];
    useEffect(() => {
        // Prepare the data for the leaderboard table
        const questionsData = questionsCreated.map((question) => {
            if (question.message !== undefined) {
                // If question.message is defined, skip this question
                return null;
            }

            return {
                key: question._id,
                questionText: question.questionText,
                domains: question.domains,
                possibleAnswers: question.possibleAnswers,
                rightAnswers: question.rightAnswers,
                delete: question,
            };
        }).filter(Boolean);


        setqData(questionsData);
    }, [questionsCreated]);



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
                edit: competition,
                delete: competition
            }
        }).filter(Boolean);

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
                edit: problem,
                delete: problem
            };
        }).filter(Boolean);

        setpData(problemsData);
    }, [problemsCreated]);
    useEffect(() => {
        // Prepare the data for the problem table
        const jobOffData = jobOffersCreated.map((lp) => {
          let applications = [];
          if (lp.message !== undefined) {
            // If question.message is defined, skip this question
            return null;
          }
      
          // Fetch competition data
          fetch(`http://localhost:3000/competitions/${lp.challenge}`)
            .then((response) => response.json())
            .then((competition) => {
              const applicationPromises = competition.participations.map((participation) =>
                fetch(`http://localhost:3000/users/${participation.id}`)
                  .then((res) => res.json())
                  .then((user) => {
                    const problemsScore = participation.submission.problems.filter(Boolean).length;
                    const questionsScore = participation.submission.questions.filter(Boolean).length;
                    const score = problemsScore + questionsScore;
                    const applicationTime = participation.time;
      
                    return {
                      user: user,
                      score: score,
                      time: applicationTime,
                    };
                  })
              );
      
              Promise.all(applicationPromises)
                .then((applications) => {
                  // Update the applications data
                  const updatedData = [...jobOffData];
                  const index = updatedData.findIndex((item) => item.key === lp._id);
                  if (index !== -1) {
                    updatedData[index].applications = applications;
                    setjData(updatedData);
                  }
                })
                .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
            
          return {
            key: lp._id,
            title: lp.title,
            domains: lp.domains,
            coins: lp.coins,
            edit: lp,
            delete: lp,
            applications: [], // Initialize with an empty array for applications
          };
        });
      
        setjData(jobOffData);
      }, [jobOffersCreated]);
      

    function deleteProblem() {

    }
    function deleteCompetition(competition) {


        // Send DELETE request to delete the competition
        fetch(`http://localhost:3000/competitions/${competition._id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    // Handle success response if needed
                    console.log('Competition deleted successfully');

                    // Send PATCH request to remove the competition from user's challenges_created
                    fetch(`http://localhost:3000/users/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            competitions_created: {
                                $pull: { _id: competition._id },
                            },
                        }),
                    })
                        .then((response) => {
                            if (response.ok) {
                                // Handle success response if needed
                                console.log('Competition removed from user challenges_created successfully');
                            } else {
                                throw new Error('Error removing competition from user challenges_created');
                            }
                        })
                        .catch((error) => {
                            console.error('Error removing competition from user challenges_created:', error);
                        });
                } else {
                    throw new Error('Error deleting competition');
                }
            })
            .catch((error) => {
                console.error('Error deleting competition:', error);
            });
    }


    function deleteJobOffer(offer) {


        // Send DELETE request to delete the job offer
        fetch(`http://localhost:3000/job-offers/${offer._id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    // Handle success response if needed
                    console.log('Job offer deleted successfully');

                    // Send PATCH request to remove deleted job offer from user's job_offers_created
                    fetch(`http://localhost:3000/users/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            job_offers_created: {
                                $pull: { _id: offer._id },
                            }
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            // Handle success response if needed
                        })
                        .catch((error) => {
                            console.error('Error removing job offer from user:', error);
                        });
                } else {
                    throw new Error('Error deleting job offer');
                }
            })
            .catch((error) => {
                console.error('Error deleting job offer:', error);
            });
    }


    function deleteQuestion(question) {


        // Send DELETE request to delete the question
        fetch(`http://localhost:3000/questions/${question._id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    // Handle success response if needed
                    console.log('Question deleted successfully');

                    // Send PATCH request to remove deleted question from user's questions_created
                    fetch(`http://localhost:3000/users/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            questions_created: {
                                $pull: { _id: id },
                            }
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            // Handle success response if needed
                        })
                        .catch((error) => {
                            console.error('Error removing question from user:', error);
                        });
                } else {
                    throw new Error('Error deleting question');
                }
            })
            .catch((error) => {
                console.error('Error deleting question:', error);
            });
    }



    function hireApplicant(offer,user) {

       setApplicant((prevUser) => {
        // Update the prob state with the new problem
        return user;
    });
    setOffer((prevOffer) => {
        // Update the prob state with the new problem
        return offer;
    });
   console.log(offer)
     
    
    console.log(applicant)
    setResponse('accepted')


     setModalVisible(!modalVisible)
    }
    
    function rejectApplicant(offer,user) {

        setApplicant((prevUser) => {
            // Update the prob state with the new problem
            return user;
        });
        setOffer((prevOffer) => {
            // Update the prob state with the new problem
            return offer;
        });
 
     setResponse('rejected')
 
 
     setModalVisible(!modalVisible)
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

    const renderApplications = (record) => {
        
        const columns = [
            {
                title: '',
                dataIndex: 'avatar',
                key: 'avatar',
                render: (avatar) => (
                  <Avatar src={avatar} alt="avatar" />
                ),
              },
          {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
          },
          {
            title: 'LP',
            dataIndex: 'lp',
            key: 'lp',
          },
          {
            title: 'PeP',
            dataIndex: 'pep',
            key: 'pep',
          },
          {
            title: 'Coins',
            dataIndex: 'coins',
            key: 'coins',
          },
          
          {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
          },
          {
            title: 'Action',
            dataIndex: 'hire',
            key: 'hire',
            render: ( user) => (
              <Button type="primary" onClick={() => hireApplicant(record.key, user)}>
                Hire
              </Button>
            ),
          },
          {
            title: 'Action',
            dataIndex: 'reject',
            key: 'reject',
            render: ( user) => (
              <Button type="primary" onClick={() => rejectApplicant(record.key, user)}>
                Reject
              </Button>
            ),
          },
          
        ];
      
        const data = record.applications.map((application) => ({
          key: application.user._id,
          avatar : application.user.avatar,
          username: application.user.username,
          lp: application.user.learning_points,
          pep: application.user.practise_points,
          coins: application.user.coins,
          participationDate: application.time,
          score: application.score,
          hire : (record.key, application.user),
          reject : (record.key, application.user)
        }));
      
        return <Table columns={columns} dataSource={data} pagination={false} />;
      };
      

    return (
        <>
            <Row>
                <Col span={6}>
                    <Badge.Ribbon text="Company Recruiter" color="orange">

                        <Card
                            title="Recruiter Profile"

                        >
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Image src={user.avatar} style={{ borderRadius: '50%', width: '150px', height: '150px' }} />
                            </div>


                            <Descriptions column={1}>
                                <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
                                <Descriptions.Item label="First Name">{user.firstname}</Descriptions.Item>
                                <Descriptions.Item label="Last Name">{user.lastname}</Descriptions.Item>
                                <Descriptions.Item label="Company">{user.company}</Descriptions.Item>
                                <Descriptions.Item label="Website">{user.site}</Descriptions.Item>


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
                            <Divider>Record</Divider>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Card bordered={false}>
                                        <Statistic
                                            title="Job Offers Posted"
                                            value={jobOffersCreated.length}
                                            valueStyle={{ color: 'black' }}
                                            prefix={<Icon component={FileSearchOutlined} />}
                                        />
                                    </Card>
                                </Col>
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
                                            title="Challenges Created"
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

                        <TabPane tab="Challenges Created" key="2">
                            <Table columns={columnsCompetition} dataSource={cData} pagination={false} />
                        </TabPane>
                        <TabPane tab="Problems Created" key="3">
                            <Table columns={problemColumns} dataSource={pData} pagination={false} />

                        </TabPane>
                        <TabPane tab="Questions" key="4">
                            <Table columns={columnsQuest} dataSource={qData} pagination={false} />

                        </TabPane>
                        <TabPane tab="Job Offers" key="5">
                            <Table
                                columns={jobOfferColumns}
                                dataSource={jData}
                                pagination={false}
                                expandedRowRender={(record) => renderApplications(record)}
                            />
                        </TabPane>

                    </Tabs>
                </Col>
            </Row>
            <Modal visible={isEditingModalVisible} onOk={handleUpdateSubmit} onCancel={handleModalCancel} title="Edit Profile" footer={null}>

                <RegistrationFormComp
                    user={user}
                    onChangeCertificate={changeCertificate}

                    onChangeCompany={changeCompany}
                    onChangeSite={changeSite}
                    onChangeImage={changeImage}

                    request='patch'
                />
                <Button onClick={() => setIsRecoveryModalVisible(true)}>Update</Button>
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
                <ChallengeCreator usern={user} request='patch' competitionn={comp} />
            </Modal>
            <Modal
                width={1000}
                visible={isOfferModalVisible}
                onCancel={() => setIsOfferModalVisible(false)}
                footer={null}
            >
                <JobOfferCreator usern={user} request='patch' joboff={offer} />
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
            <Modal
                title="Write Your Message"
                visible={modalVisible}
                onCancel={() => { setModalVisible(false) }}
                footer={[
                    <Button key="cancel" onClick={() => { setModalVisible(false) }}>
                        Cancel
                    </Button>,
                    <Button key="confirm" type="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>,
                ]}
            >
                <TextArea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message"
                />
            </Modal>
         
        </>
    );
};

export default ProfilePageRec;
