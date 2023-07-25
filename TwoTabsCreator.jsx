import { Card, InputNumber, Modal, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import ProblemList from "./ProblemList";
import CodeEditor from "./CodeEditor";
import QuestionBank from "./QuestionBank";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Link, useParams } from "react-router-dom";
import QuestionCreator from "./QuesionCreator";
const { TabPane } = Tabs;

const TwoTabsCreator = ({ onChangeProblems, onChangeProblemsTime,
  onChangeSubmissions, onChangeQuestions, onChangeQuestionsTime}) => {
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isQuestModalVisible, setIsQuestModalVisible] = useState(false);
 
  const [timeLimit, setTimeLimit] = useState(60); // initial time limit of 60 minutes
  const [numSubmissions, setNumSubmissions] = useState(3); // initial number of submissions of 3
 const[user, setUser] = useState({})
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
   },[])
  const handleTabClick = (key) => {
    console.log("Selected tab:", key);
  };

  const handleTimeLimitChange = (value) => {
    setTimeLimit(value);
    onChangeProblemsTime(value)
  };

  const handleNumSubmissionsChange = (value) => {
    setNumSubmissions(value);
    onChangeSubmissions(value)
  };
  function showQuestEditModal() {
  
    setIsQuestModalVisible(!isQuestModalVisible)
  }
  function changeSelected(problems) {
    const problemsWithPoints = problems.map(problem => {
      return { problem: problem, points: 3 };
    });
    setSelectedProblems(problemsWithPoints);
    onChangeProblems(problemsWithPoints);
  }
  function changeSelectedQuestions(questions) {
    setSelectedQuestions(questions);
    onChangeQuestions(questions)
  }
const handlePointChange = (problem, value) => {
  // Find the index of the problem in the selected problems array
  const index = selectedProblems.findIndex(p => p.problem === problem);

  // If the problem is found, update its points value
  if (index >= 0) {
    const updatedProblem = {
      ...selectedProblems[index],
      points: value
    };
    const updatedProblems = [      ...selectedProblems.slice(0, index),      updatedProblem,      ...selectedProblems.slice(index + 1)    ];
    setSelectedProblems(updatedProblems);
    onChangeProblems(updatedProblems);
  }
};

  return (<>
    <Tabs onTabClick={handleTabClick}>
      <TabPane tab="Problems" key="problems">
      <div style={{ marginTop: "20px" }}>
          <label style={{ marginRight: "20px" }}>Time Limit (minutes):</label>
          <InputNumber min={1} max={240} defaultValue={timeLimit} onChange={handleTimeLimitChange} />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label style={{ marginRight: "20px" }}>Number of Submissions:</label>
          <InputNumber min={1} max={10} defaultValue={numSubmissions} onChange={handleNumSubmissionsChange} />
        </div>
        <div style={{ display: "flex" }}>
            
          <div style={{ width: "50%" }}>
            <h3>Problems(<Link to={`/dashboard/instructor/${id}/problemcreator`}>Create one here</Link>)</h3>
            <div style={{ height: "500px", overflowY: "scroll" }}>
              <ProblemList onChangeSelected={changeSelected} />
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <h3>Selected Problems</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {selectedProblems.map((problem) => (
                <Card key={problem.problem._id} style={{ margin: "10px" }}>
                  <h4>{problem.problem.title}</h4>
                  <InputNumber min={1} max={10} defaultValue={numSubmissions} onChange={value => handlePointChange(problem, value)} />
                
                  <p>
                  <div dangerouslySetInnerHTML={{ __html: problem.problem.description }}></div> 
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
      </TabPane>
      <TabPane tab="Questions" key="questions">
      <div style={{ display: "flex" }}>
            
            <div style={{ width: "50%" }}>
              <h3>Question Bank(<Link onClick={showQuestEditModal}>Create one here</Link>)</h3>
              <div style={{ height: "500px", overflowY: "scroll" }}>
                <QuestionBank onChangeSelected={changeSelectedQuestions} />
              </div>
            </div>
            <div style={{ width: "50%" }}>
              <h3>Selected Questions</h3>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {selectedQuestions.map((question) => (
                  <Card key={question._id} style={{ margin: "10px" }}>
                    <h4>{question.questionText}</h4>
                
                    
                  </Card>
                ))}
              </div>
            </div>
          </div>
      </TabPane>
      
    </Tabs>
    <Modal
          width={1000}
          visible={isQuestModalVisible}
          onCancel={() => setIsQuestModalVisible(false)}
          footer={null}
        >
          <QuestionCreator questionn={{}} onCreate={()=>{console.log('created')}} usern={user} request='post' />
        </Modal>
    </>
    
  );
};

export default TwoTabsCreator;
