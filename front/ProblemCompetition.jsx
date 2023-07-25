import React, { useEffect, useState } from 'react';
import Module from './Module';
import './styles/Problem.css';
import { useParams } from 'react-router-dom';
import ProblemDescription from './ProblemDescription';
import { Card, Col, Modal, Row } from 'antd';
import CodeEditorCompetition from './CodeEditorCompetition';
import ProblemFeedback from './ProblemFeedback';
import SubmissionList from './SubmissionList';
const ProblemCompetiton = ({prob, onSub, usern, handleSubs}) => {
  const [problem, setProblem] = useState(prob);

  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const [activeTabKey2, setActiveTabKey2] = useState('app');
  const [subBool, setSubBool] = useState(true)
  const [output, setOutput] = useState()
  const [result, setResult] = useState('')
  const [cons, setCons] = useState('')
  const [temp, setTemp] = useState(false)
  const [user, setUser] = useState(usern)
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
 function success(data) {
  if(data.evaluation === 'PASS')
  {
  Modal.success({
    content: 'correct answer ',
  });}
  else{
  Modal.error({
    content: 'wrong answer ',
  });}
};
useEffect(() => {
  setProblem(prob)
}, [prob] );



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
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleSubmission(code)
{
  const obj = {
    solutionDev: code,
    problem: problem._id,
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
      success(data);
      let evlau = data.evalution
 
       let obj = {
        solutionDev : code,
        problem : problem._id,
        evaluation : data.evaluation
      }
      if(obj.evaluation === 'PASS')
      {
        onSub(1)
      }else{
        onSub(0)
      }
      
    
      console.log(data)
      console.log(data)
      fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          submissions: [...user.submissions, newSubmission],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })})
    .then((response) => response.json())
    
    .catch((error) => console.log(error));
        setSubBool(false)
}

let boiler = problem.boilerplate
const tabListNoTitle = [
  {
    key: 'Description',
    tab: 'Description',
  },
  {
    key: '.',
    tab: '.',
  },
  
];
let prb = problem
const contentListNoTitle = {
  Submissions: <SubmissionList usern={user} pid={problem._id}/>,
  Description: <ProblemDescription problem={prb} />,
  Solutions: <p>project content</p>,
};
const onTab1Change = (key) => {
  setActiveTabKey1(key);
};
const onTab2Change = (key) => {
  setActiveTabKey2(key);
};





  return (
    <div style={{width : "100%"}}>
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
     
    <CodeEditorCompetition
    style={{}}
    output={output}
    sendCode={handleSend}
    sendSubmission={handleSubmission}
    boilerplate={boiler}
    subBool={subBool}/> 
  
    
    </Col>
    
    </Row>
</div>
  );
};

export default ProblemCompetiton;
