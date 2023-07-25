import React, { useEffect, useState } from "react";
import { Divider, Input, Checkbox, Button, Row, Col, Modal } from "antd";
import DomaineSelector from "./DomaineSelector";
import { useParams } from "react-router-dom";

const QuestionCreator = ({ questionn,usern, request, onCreate }) => {
  const [questionText, setQuestionText] = useState(questionn.questionText);
  const [possibleAnswers, setPossibleAnswers] = useState(questionn.possibleAnswers || []);
  const [rightAnswers, setRightAnswers] = useState(questionn.rightAnswers || []);
    const [domains, setDomains] = useState(questionn.domains);

      const [user, setUser] = useState(usern)
      const [newQuest, setNewQuest] = useState({
        questionText : questionText,
        possibleAnswers : possibleAnswers,
        rightAnswers : rightAnswers,
        domains : domains,
        creator: user,
      })

  
      
      useEffect(()=>{
        setNewQuest({
          questionText,
        possibleAnswers,
        rightAnswers,
        domains ,
 
        })
      } , [questionText,
        possibleAnswers,
        rightAnswers,
        domains ,
        user])
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

   function success() {
    Modal.success({
      content: 'Question has been created successfully! ',
    });
  };
  function fail() {
    Modal.success({
      content: 'Question has been updated successfully! ',
    });
  };

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleDomainChange = (value) => {
    setDomains(value);

  };

  const handlePossibleAnswerChange = (index, e) => {
    const newPossibleAnswers = [...possibleAnswers];
    newPossibleAnswers[index] = e.target.value;
    setPossibleAnswers(newPossibleAnswers);
  };

  const handleCheckboxChange = (index, e) => {
    const newRightAnswers = [...rightAnswers];
    if (e.target.checked) {
      newRightAnswers.push(index);
    } else {
      const indexToRemove = newRightAnswers.indexOf(index);
      if (indexToRemove !== -1) {
        newRightAnswers.splice(indexToRemove, 1);
      }
    }
    setRightAnswers(newRightAnswers);
  };

  const handleAddPossibleAnswer = () => {
    const newPossibleAnswers = [...possibleAnswers, ""];
    setPossibleAnswers(newPossibleAnswers);
  };

  const handleCreateQuestion = () => {
  
  console.log(newQuest)
  if (request === 'post') {
  
    // Post request
    fetch('http://localhost:3000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuest),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        success();
  
        // Patch request to update user
        fetch(`http://localhost:3000/users/${user._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ questions_created: [...user.questions_created, data._id] }),
        })
          .then((response) => response.json())
          .then((userData) => {
            // Handle the updated user data
            console.log(userData);
          })
          .catch((error) => {
            // Handle any errors
            console.error('Error:', error);
          });
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });
      onCreate()
  }
   else if (request === 'patch') {
      // Patch request
      fetch(`http://localhost:3000/questions/${questionn.key}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuest),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          fail();
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });
    }
  };
  

  return (
    <>
      <Row>
        <Col span={24}>
          <Divider>Question Text</Divider>
          <Input value={questionText} onChange={handleQuestionTextChange} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
       
          <DomaineSelector doms={domains} onChange={handleDomainChange} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Divider>Possible Answers</Divider>
          {possibleAnswers.map((answer, index) => (
            <div key={index}>
              <Checkbox
                onChange={(e) => handleCheckboxChange(index, e)}
                checked={rightAnswers.includes(index)}
              />
              <Input
                value={answer}
                onChange={(e) => handlePossibleAnswerChange(index, e)}
              />
            </div>
          ))}
          <Button onClick={handleAddPossibleAnswer}>Add Possible Answer</Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button onClick={handleCreateQuestion}>Create Question</Button>
        </Col>
      </Row>
    </>
  );
};

export default QuestionCreator;
