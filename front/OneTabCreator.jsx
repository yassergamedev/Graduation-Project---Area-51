import { Card, InputNumber, Row, Tabs } from "antd";
import React, { useState } from "react";
import ProblemList from "./ProblemList";
import CodeEditor from "./CodeEditor";
import QuestionBank from "./QuestionBank";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Link, useParams } from "react-router-dom";
const { TabPane } = Tabs;

const TwoTabsCreator = ({ onChangeProblems, onChangeProblemsTime,
  onChangeSubmissions}) => {
  const [selectedProblems, setSelectedProblems] = useState([]);
const {id} = useParams()


  const [timeLimit, setTimeLimit] = useState(60); // initial time limit of 60 minutes
  const [numSubmissions, setNumSubmissions] = useState(3); // initial number of submissions of 3

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

  function changeSelected(problems) {
    setSelectedProblems(problems);
    onChangeProblems(problems)
  }


  return (
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
                <Card key={problem._id} style={{ margin: "10px" }}>
                  <h4>{problem.title}</h4>
                  <InputNumber min={1} max={10} defaultValue={numSubmissions} onChange={handleNumSubmissionsChange} />
                
                  <p>
                  <div dangerouslySetInnerHTML={{ __html: problem.description }}></div> 
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
      </TabPane>
      
      
    </Tabs>
  );
};

export default TwoTabsCreator;
