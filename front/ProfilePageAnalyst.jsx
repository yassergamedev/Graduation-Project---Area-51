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
import AdminStatistics from './AdminStatistics';
import Title from 'antd/es/skeleton/Title';
import Header from './Home/Nav0';
import LearningPathCreator from './LearningPathCreator';
import ReportCreator from './ReportCreator';
import LearningPathAnalytics from './LearningPathAnalytics';
import CompetitionAnalytics from './CompetitionAnalytics';
import JobOfferStatistics from './JobOfferStatistics';

const { TabPane } = Tabs;

const ProfilePageAnalyst = ({ usern }) => {
    const { id } = useParams();
    const [user, setUser] = useState(usern);
    const [prob, setProb] = useState({});
    const [comp, setComp] = useState({})
    const [rep, setRep] = useState({})
    const [offer, setOffer] = useState({})
    const [lp, setLp] = useState({})
    const [applicant, setApplicant] = useState({})
    const [ques, setQues] = useState({})
    const [isEditingModalVisible, setIsEditingModalVisible] = useState(false);
    const [isQuestModalVisible, setIsQuestModalVisible] = useState(false);
    const [isCompModalVisible, setIsCompModalVisible] = useState(false);
    const [isProblemModalVisible, setIsProblemModalVisible] = useState(false);
    const [isOfferModalVisible, setIsOfferModalVisible] = useState(false);
    const [isRecoveryModalVisible, setIsRecoveryModalVisible] = useState(false);
    const [isLpEditModalVisible, setIsLpEditModalVisible] = useState(false);
    const [isReportModalVisible, setIsReportModalVisible] = useState(false);
   
    const [modalVisible, setModalVisible] = useState(false);
    
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
    const [learningPaths, setLearningPaths] = useState([{}])
    const [lData, setlData] = useState([{}])
    const [reports, setReports] = useState([{}])
    const [rData, setrData] = useState([{}])
    
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


    function showLpEditModal(lp) {
        setLp((prevLp) => {
            // Update the prob state with the new problem
            return lp;
        });
        setIsLpEditModalVisible(!isLpEditModalVisible)
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

    function showReportEditModal(report) {
        setRep((prevReport) => {
            // Update the prob state with the new problem
            return report;
        });

        setIsReportModalVisible(true);
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

                    const reportPromises = data.reports_created.map((report) =>
                    fetch(`http://localhost:3000/report/${report}`)
                        .then((res) => res.json())
                        .catch((error) => console.error(error))
                );



                Promise.all(reportPromises)
                    .then((reportData) => {
                        setReports(reportData);
                    })


            }


            )
            .catch((error) => console.error(error));
        fetch('http://localhost:3000/learning-paths')
            .then(response => response.json())
            .then(data => {
                setLearningPaths(data);
            })
            .catch(error => {
                console.error('Failed to fetch learning paths:', error);
            });
        console.log(learningPaths)
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


    const columnsReport = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
       

        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => {
              let tagColor = '';
        
              switch (type) {
                case 'competition':
                  tagColor = 'blue';
                  break;
                case 'learning path':
                  tagColor = 'green';
                  break;
                case 'job offer':
                  tagColor = 'orange';
                  break;
                default:
                  tagColor = 'default';
              }
        
              return <Tag color={tagColor}>{type}</Tag>;
            },
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => (
                
                        <Tag color='purple' key={date}>{new Date(date).toLocaleString()}</Tag>
               
            ),
        },
        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            render: (text, record, report) => (
                <Button onClick={() => showReportEditModal(record, report)}>Edit</Button>
            ),
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            render: (report) => (
                <Button onClick={() => deleteReport(report)}>Delete</Button>
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
    const lpColumns = [
        {
            title: 'Title',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Learning points',
            dataIndex: 'learningPoints',
            key: 'learningPoints',
        },


        {
            title: 'Creation Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => new Date(createdAt).toLocaleDateString(),
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
                <Button onClick={() => showLpEditModal(record, lp)}>Edit</Button>
            ),
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record, lp) => (
                <Button onClick={() => deleteLp(record, lp)}>Delete</Button>
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
        // Prepare the data for the leaderboard table
        const lpData = learningPaths.map((lp) => {
            if (lp.message !== undefined) {
                // If question.message is defined, skip this question
                return null;
            }
            return {
                key: lp._id,
                name: lp.name,
                learningPoints: lp.learningPoints,
                domains: lp.domains,
                createdAt: lp.createdAt,
                edit: lp,
                delete: lp,
            };
        })


        setlData(lpData);
    }, [learningPaths]);
    useEffect(() => {
        // Prepare the data for the leaderboard table
        const jobData = jobOffersCreated.map((offer) => {
            if (JobOfferCreator.message !== undefined) {
                // If question.message is defined, skip this question
                return null;
            }
            return {
                key: offer._id,
                title: offer.name,
                learningPoints: offer.learningPoints,
                domains: offer.domains,
                createdAt: offer.createdAt,
                edit: offer,
                delete: offer,
            };
        })


        setjData(jobData);
    }, [jobOffersCreated]);

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
       console.log(reports)
        const repData = reports.map((report) => {
            if (report.message !== undefined) {
                // If question.message is defined, skip this question
                return null;
            }
            return {
                key: report._id,
                title: report.title,
                type : report.type,
                date: report.date,
                description : report.description,
                content : report.content,
                edit: report,
                delete: report
            };
        }).filter(Boolean);

        setrData(repData);
    }, [reports]);
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
                learningPoints: lp.learningPoints,
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
    function deleteLp(lp) {


        // Send DELETE request to delete the job offer
        fetch(`http://localhost:3000/learning-paths/${lp._id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    // Handle success response if needed
                    console.log('Job offer deleted successfully');


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

    function deleteReport(report) {


        // Send DELETE request to delete the question
        fetch(`http://localhost:3000/repor/${report._id}`, {
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


    function hireApplicant(offer, user) {

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

    function rejectApplicant(offer, user) {

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
                render: (user) => (
                    <Button type="primary" onClick={() => hireApplicant(record.key, user)}>
                        Hire
                    </Button>
                ),
            },
            {
                title: 'Action',
                dataIndex: 'reject',
                key: 'reject',
                render: (user) => (
                    <Button type="primary" onClick={() => rejectApplicant(record.key, user)}>
                        Reject
                    </Button>
                ),
            },

        ];

        const data = record.applications.map((application) => ({
            key: application.user._id,
            avatar: application.user.avatar,
            username: application.user.username,
            lp: application.user.learning_points,
            pep: application.user.practise_points,
            coins: application.user.coins,
            participationDate: application.time,
            score: application.score,
            hire: (record.key, application.user),
            reject: (record.key, application.user)
        }));

        return <Table columns={columns} dataSource={data} pagination={false} />;
    };


    return (
        <>


            <Col  >

                <Tabs defaultActiveKey="1">
                    Wecome Back, {user.username}
                    <TabPane tab="Stats" key="1">
                        <Divider>Stats</Divider>
                        <AdminStatistics />

                    </TabPane>

                    <TabPane tab="Reports Created" key="2">
                        <Table columns={columnsReport} dataSource={rData} pagination={false} />
                    </TabPane>
                    <TabPane tab="Learning Paths Analytics" key="3">
                        <LearningPathAnalytics />
                    </TabPane>
                    <TabPane tab="Competition Analytics" key="4">
                      <CompetitionAnalytics />
                    </TabPane>
                    <TabPane tab="Job Offer Analytics" key="5">
                      <JobOfferStatistics />
                    </TabPane>

                </Tabs>
            </Col>

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
                visible={isLpEditModalVisible}

                onCancel={() => setIsLpEditModalVisible(false)}
                footer={null}
            >
                <LearningPathCreator key={lp.key} lpp={lp} usern={user} request='patch' />
            </Modal>
            <Modal
                width={1000}
                visible={isReportModalVisible}

                onCancel={() => setIsReportModalVisible(false)}
                footer={null}
            >
                <ReportCreator key={rep.key} report={rep} usern={user} request='patch' />
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

export default ProfilePageAnalyst;
