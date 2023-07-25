import React, { useEffect, useState } from 'react';
import Module from './Module';
import './styles/Problem.css';
import { useParams } from 'react-router-dom';
import ProblemDescription from './ProblemDescription';
import { Badge, Card, Col, Modal, Row, Tabs } from 'antd';
import CodeEditor from './CodeEditor';
import ProblemFeedback from './ProblemFeedback';
import SubmissionList from './SubmissionList';
import { UserAddOutlined } from '@ant-design/icons';
const Problem = ({prob, usern, compId}) => {
  let [problem, setProblem] = useState({});

  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const [activeTabKey2, setActiveTabKey2] = useState('app');
  const [output, setOutput] = useState()
  const [result, setResult] = useState('')
  const [cons, setCons] = useState('')
  const [temp, setTemp] = useState(false)
  


 const {pid} = useParams()
 const [user, setUser] = useState(usern)
 const {id} = useParams()
  const [isProblemComplete, setIsProblemComplete] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        setIsProblemComplete(data.problems.includes(pid)); // Check if the problem ID is present in the problems array
      })
      .catch((error) => console.error(error));
  
    fetch(`http://localhost:3000/problems/${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setProblem(data);
      })
      .catch((error) => console.error(error));
  }, []);
  
function success(data) {
  if (data.evaluation === 'PASS') {
    Modal.success({
      content: 'correct answer, Prize Awarded',
      onOk: async () => {
        if(!isProblemComplete){
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          const updatedCoins = user.coins + problem.coins;
          const updatedPractisePoints = user.practise_points + problem.practisePoints;

          const updateUserResponse = await fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              coins: updatedCoins,
              
              practise_points: updatedPractisePoints,
              problems: [...user.problems, problem], // Add the problem to the user's problems array
            }),
          });

          if (updateUserResponse.ok) {
            console.log('User coins, learningPoints, and practisePoints updated successfully');
            setIsProblemComplete(true); // Update the isProblemComplete state
          } else {
            console.error('Failed to update user coins, learningPoints, and practisePoints');
          }
        } catch (error) {
          console.error('Failed to update user coins, learningPoints, and practisePoints:', error);
        }
      }}
    });
  } else {
    Modal.error({
      content: 'wrong answer',
    });
  }
}





function handleSend(code)
{
    const fullcode =  code+ problem.judge 
    const runCode = async () => {
      try {
        const response = await fetch('http://localhost:3000/compile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: fullcode
          }),
        });
        const data = await response.json()
        if(data.output.passed !=undefined)
        {
          setOutput(data.output.passed);
        }
        else{
          setOutput(data.output);
          console.log(output)
        }
        
      } catch (error) {
        console.error(error);
      }
    };
    runCode()
}

function handleSubmission(code) {
  
  const obj = {
    solutionDev: code,
    problem: pid,
    developer : id
  };

  fetch("http://localhost:3000/submissions", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const newSubmission = data;
      console.log(data)
      success(data)
      fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          submissions: [...user.submissions, newSubmission],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}



let boiler = problem.boilerplate
const tabListNoTitle = [
  {
    key: 'Description',
    tab: 'Description',
  },
  {
    key: 'Solutions',
    tab: 'Solutions',
  },
  {
    key: 'Submissions',
    tab: 'Submissions',
  },
];
let prb = problem
const contentListNoTitle = {
  Submissions: <SubmissionList usern={user} pid={pid}/>,
  Description: <ProblemDescription problem={prb} />,
  Solutions: <p>project content</p>,
};
const onTab1Change = (key) => {
  setActiveTabKey1(key);
};
const onTab2Change = (key) => {
  setActiveTabKey2(key);
};



if(problem.boilerplate === undefined)
{
  return <h1>Loading</h1>
}

  return (
    <div style={{width : "100%"}}>
       {isProblemComplete ? (
        <Badge.Ribbon text="Completed" color="#52c41a">
          <Tabs
            tabBarStyle={{ width: '20%' }}
            tabPosition="left"
            icon={<UserAddOutlined />}
             // Existing code for rendering modules
          />
        </Badge.Ribbon>
      ) : (
        <Tabs
          tabBarStyle={{ width: '20%' }}
          tabPosition="left"
          icon={<UserAddOutlined />}
        // Existing code for rendering modules
        />
      )}
    <Row>
      <h1 style={{fontSize:'20px'}}>{problem.title}</h1>
    </Row>
    <Row>
  
    <Col span={12}
    style={{paddingRight : 4}}>
    <Card
  style={{
    width: '100%',
    
  }}
  tabList={tabListNoTitle}
  
  defaultActiveTabKey = 'Description'
  onTabChange={onTab2Change}
  
>
  {contentListNoTitle[activeTabKey2]}
</Card>

      </Col>
      
     
     <Col span={12}
     style={{paddingLeft : 4}}>
     
    <CodeEditor
    style={{}}
    output={output}
    sendCode={handleSend}
    subBool={true}
    sendSubmission={handleSubmission}
    boilerplate={boiler}/> 
  
    
    </Col>
    
    </Row>
</div>
  );
};

export default Problem;
