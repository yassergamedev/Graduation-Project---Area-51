import React, { useEffect, useState } from 'react';
import './styles/Question.css'; // import the CSS file
import { Modal,message } from 'antd';

const QuestionCompetition = ({ questionn, handleSubs }) => {
  
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [question, setQuestion] = useState(questionn);
  const [messageApi, contextHolder] = message.useMessage();
 
 

  const handleAnswerClick = (answerIndex) => {
    // If the answer is already selected, remove it
    // Otherwise, add it to the list of selected answers
    if (selectedAnswers.includes(answerIndex)) {
      setSelectedAnswers(selectedAnswers.filter((index) => index !== answerIndex));
    } else {
      setSelectedAnswers([...selectedAnswers, answerIndex]);
    }
  };

  const isAnswerSelected = (answerIndex) => selectedAnswers.includes(answerIndex);

  const isAnswerCorrect = (answerIndex) =>
  {
   
      if (selectedAnswers.length !== question.rightAnswers.length){      
                return false;
      }
      for (let i = 0; i < selectedAnswers.length; i++) {
        if (question.rightAnswers[i] !== selectedAnswers[i]) {
          
          return false;
        }
      }
      return true;
    
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the selected answers are correct
    const selectedCorrectAnswers = selectedAnswers.filter(isAnswerCorrect);
    const isQuestionCorrect = selectedCorrectAnswers.length === question.rightAnswers.length;


    // Display a message to the user
    if (isQuestionCorrect) {
      message.success('Correct Answer!');
      handleSubs(1)
      
    } else {
        handleSubs(0)
        message.error('Wrong Answer!');
    }
  };

  console.log(question)
  let arr = question.possibleAnswers || [];
  


  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="question">{question.questionText}</div>
      <ul className="possible-answers">
        {arr.map((answerText, index) => (
          
          <li
            key={index}
            className={`possible-answer ${isAnswerSelected(index) ? 'selected' : ''}`}
            onClick={() => handleAnswerClick(index)}
          >
            <input type="checkbox" checked={isAnswerSelected(index)} readOnly />
            <div className="answer-text">{answerText}</div>
          </li>
        ))}

      </ul>
     
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionCompetition;
