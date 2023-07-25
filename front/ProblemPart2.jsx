import React, { useEffect, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import './styles/ProblemPart2.css'
import { Card, Col, Divider, Input, Row, Space } from "antd";
const ProblemPart2 = ({ onBoilerChange,problem,
  onJudgeChange
}) => {
  const [boilerplate, setBoilerplate] = useState(problem.boilerplate);
  const [judge, setJudge] = useState(problem.judge);
  // const [Jinput, setJInput] = useState("")
  // const [Joutput, setJOutput] = useState("")
  // const [Binput, setBInput] = useState("")
  // const [Boutput, setBOutput] = useState("")
  // const [newTestCase, setNewTestCase] = useState({input: "", output: ""});
  // const [newBoilerTestCase, setNewBoilerTestCase] = useState({input: "", output: ""});
  // const [testCases, setTestCases] = useState([
  //   { input: Jinput,
  //     output : Joutput }
  // ]);
  // const [boilerTestCases, setBoilerTestCases] = useState([
  //   { input: Binput,
  //   output : Boutput }
  // ]);

 

  const handleBChange = (editor, data, value, event) => {

    setBoilerplate(value);
    onBoilerChange(value)
  };
  const handleJChange = (editor, data, value) => {
    setJudge(value);
    onJudgeChange(value)
  };
  // const handleAddTestCase = (value) => {
  //   setTestCases([...testCases, value]);
  //   setNewTestCase({input: "", output: ""});
  // };
  // const handleAddBoilerTestCase = (value) => {
  //   setBoilerTestCases([...boilerTestCases, value]);
  //   setNewBoilerTestCase({input: "", output: ""});
  // };
  // const handleRemoveTestCase = () => {
  //   setTestCases(testCases.slice(0, -1));
  // };
  
  // const handleRemoveBoilerTestCase = () => {
  //   setBoilerTestCases(boilerTestCases.slice(0, -1));
  // };
  
  // const handleJOchange = (value)=>{
  //   setJOutput(value)
  // }
  // const handleJIchange = (value)=>{
  //   setJInput(value)
  // }
  // const handleBOchange = (value)=>{
  //   setBOutput(value)
  // }
  // const handleBIchange = (value)=>{
  //   setBInput(value)
  // }
  
  return (
    <div className="form-container">
      <div>
        <Row>
          <Col span={12}>
            <Divider>Judge</Divider>

            <center>Please write the Judge logic in Javascript</center>
            <br />
          </Col>
          <Col span={12}>
            <Divider>Boilerplate</Divider>
            <center>Please write the Judge Boilerplate in Javascripti</center>
          </Col>
        </Row>
        <Row>
          <Space size="large">
            <Col span={12}>
              <CodeMirror
                className="Code"
                value={judge}

                
                onBeforeChange={handleJChange}
                options={{
                  mode: 'text/javascript',
                  theme: "dracula",
                  lineNumbers: true,
                  fontSize: 1
                }}
              />

            </Col>
            <Divider type="vertical" />
            <Col span={12}><CodeMirror
              className="Code"
              value={boilerplate}

              onBeforeChange={handleBChange}
              options={{
                mode: 'text/javascript',
                theme: "dracula",
                lineNumbers: true,
              }}
            /></Col>
          </Space>
        </Row>
        {/* <Row>
          <Col span={12}>
            <Divider>Test Cases : </Divider>
            {testCases.map((testCase) => (
              <Card title="test case ">
                <Input name="input"
                onChange={handleJIchange}
               placeholder="Borderless"  />
               
                
                
                  <Input name="output"
                  onChange={handleJOchange}
                  
                    placeholder="Borderless"/>
                
              </Card>
            ))}
            <Space>
            <button onClick={() => handleAddTestCase(newTestCase)}>Add Test Case</button>
           
            <button onClick={() => handleRemoveTestCase(newTestCase)}>Remove Test Case</button>
            </Space>
          </Col>
          <Col span={12}>
            <Divider type="vertical" />
            <Divider>Boiler Test Cases : </Divider>
            {boilerTestCases.map((testCase) => (
              <Card size="small" title="test case ">
                <Input name="input" onChange={handleBIchange}
                  placeholder="Borderless" />
               
                 <Input name="output" onChange={handleBOchange}  placeholder="Borderless"  />
                </Card>
             ))}
             <Space>
<button onClick={() => handleAddBoilerTestCase(newBoilerTestCase)}>Add Test Case</button>
<button onClick={() => handleRemoveBoilerTestCase(newBoilerTestCase)}>Remove Test Case</button>
            </Space>
   

          </Col>
        </Row> */}



      </div>
    </div>
  );
};

export default ProblemPart2;
