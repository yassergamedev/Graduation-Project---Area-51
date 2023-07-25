import { AndroidOutlined, BugOutlined, BookOutlined } from '@ant-design/icons';
import { Tabs,Statistic, Modal, Row, Col, Progress, Space, Button } from 'antd';
import { useEffect, useState } from 'react';
import { green, red, blue } from '@ant-design/colors';

import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Problem from './Problem';
import ProblemCompetiton from './ProblemCompetition';
import QuestionCompetition from './QuestionCompetition';
import Debugger from './Debugger';
import DebuggerCompetition from './DebuggerCompetition';

const { TabPane } = Tabs;
const { Countdown } = Statistic;
function OneTab({comp, probs,usern, quest,debug,time,subm,titlee}) {

    const [competition, setCompetition] = useState(comp)
    const [problems, setProblems] = useState(probs)
    const [problemSubs, setProblemSubs] =useState([])
    const [questionSubs, setQuestionSubs] = useState([])
    const [debuggerSub, setDebuggerSub] = useState('')
    const [questions, setQuestions] = useState(quest)
    const [deb, setDeb]= useState(debug)
    const [remainingTime, setRemainingTime] = useState(time );
    const [subLeft, setSubLeft] = useState(subm)
   const [title, setTitle] = useState(titlee)
   const [submissionBool, setSubmissionBool] = useState(true)
   const [problemColors, setProblemColors] = useState([])
   const [questionColors, setQuestionColors] = useState([])
   const [problemPercentage, setProblemPercentage] = useState(0)
   const [questionPercentage, setQuestionPercentage] = useState(0)
   const [debugColors, setDebugColors] = useState([])
   const [debugPercentage, setDebugPercentage] = useState(0)
   const [deadline, setDeadline] = useState(Date.now()+ 1000 * 60 *time)
   const [user, setUser] = useState(usern)
   const {id} = useParams()
   const {cid} = useParams()
   const history = useNavigate()
   useEffect(() => {
      setCompetition(comp)
      setProblems(probs)
      setQuestions(quest)
     setDeb(debug)
     setDeadline(Date.now()+ 1000 * 60 *time)
    console.log(competition)
     setTitle(titlee)
     setSubLeft(probs.length + quest.length +1)
     fetch(`http://localhost:3000/users/${id}`)
     .then((res) => res.json())
     .then((data) => {
       setUser(data);
       localStorage.setItem('user', JSON.stringify(data));
     })
     .catch((error) => console.error(error));
    }, [comp, probs,quest,debug,subm,time,titlee] );
  

 
  

    useEffect(() => {

      const intervalId = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(intervalId);
            return 0;
          }
        });
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [time]);
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
    };

    const submitParticipation = () => {
      const updatedParticipations = [...competition.participations];
      const participantId = user._id;

      const currentTime = Date.now();
      const t = deadline - currentTime;
      const participantIndex = updatedParticipations.findIndex(
        (participation) => participation.id === participantId
      );
    
      if (participantIndex !== -1) {
        updatedParticipations[participantIndex].submission = {
          problems: problemSubs,
          questions: questionSubs,
          debug: deb,
         
        };
      } else {
        updatedParticipations.push({
          id: participantId,
          submission: {
            problems: problemSubs,
            questions: questionSubs,
            debug: deb,
           
          },
          time : t
        });
      }
    
      fetch(`http://localhost:3000/competitions/${cid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participations: updatedParticipations,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Participation submitted:', data);
          setCompetition((prevCompetition) => ({ ...prevCompetition, participations: updatedParticipations }));
        })
        .catch((error) => {
          console.error('Error submitting participation:', error);
        });

        Modal.success({
          content: "Participation submitted",
        });
       history(`/dashboard/developer/${id}/competition/${cid}/leaderboard`)
    };
    
    function onChangeQuestionSubs(sub)
    {
      
        setQuestionSubs((prevQuestionSubs)=> [...prevQuestionSubs, sub])
        setQuestionColors((prevQuestionColors)=> [...prevQuestionColors, sub? green[6] : red[5]])
        setQuestionPercentage(questionPercentage + (1/quest.length)*100)
        setSubLeft(subLeft-1)
        const currentTime = Date.now();
const differenceInMilliseconds = deadline - currentTime;

const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));


        if(subLeft <0 || subLeft ===0 )
        {
          submitParticipation()
    
        }
    
      }
    function onChangeDebuggerSubs(sub)
    {
        setDebuggerSub(sub)
        setDebugColors([blue[5]])
        setDebugPercentage(100)
        setSubLeft(subLeft-1)
   
        if(subLeft <0 || subLeft ===0 )
        {
          submitParticipation()
        
        }
    
    }


    function onSubmission(sub)
    {
    
   
        setProblemSubs((prevProblemSubs)=> [...prevProblemSubs, sub])
        setProblemColors((prevProblemColors)=> [...prevProblemColors, sub? green[6] : red[5]])
        setProblemPercentage(problemPercentage + (1/subm)*100)
        setSubLeft(subLeft-1)
 
        if(subLeft <0 || subLeft ===0 )
        {
          submitParticipation()
       
        }
    
    }

    console.log(problems)

    function success() {
      Modal.warning({
        content: "Time's up ",
      });
    };
  console.log(competition)
  
  console.log(questions)


return(
<>
<Row>
  <Col span={14}>
<h1 style={{fontSize: 26}}>{title}</h1>
</Col>
<Col span={10}>
<h3 style={{fontSize: 20}}>Problem Submissions : 
<Progress style={{marginLeft : 10}} steps={subm} percent={problemPercentage} strokeColor={problemColors} />
</h3>
<h3 style={{fontSize: 20}}>Question Submissions : 
<Progress style={{marginLeft : 10}} steps={quest.length} percent={questionPercentage} strokeColor={questionColors} />
</h3>
<h3 style={{fontSize: 20}}>Debugging Submissions : 
<Progress style={{marginLeft : 10}} steps={1} percent={debugPercentage} strokeColor={debugColors} />
</h3>
<Button onClick={submitParticipation}>Submit Participation</Button>
</Col>
</Row>

  <Tabs defaultActiveKey="1">
  
    <TabPane
      tab={
        <span>
          <BookOutlined />
          Problems
        </span>
      }
      key="1"
    >
      <Tabs
    
    type="card"
    items={problems.map((problem) => {
     let title = problem.problem.title +' ' +'('+problem.points+')'
     let id = problem.problem._id
      return {
        label: title,
        key: id,
        children: <ProblemCompetiton  handleSubs={onSubmission} prob={problem.problem} onSub={onSubmission} subBool={submissionBool} />
      };
    })}
  />
    </TabPane>
   
   
  </Tabs>

  </>
)}

export default OneTab;
