import { Button, Col, Row } from 'antd';
import React, { useState } from 'react'
import { Controlled as CodeMirror } from "react-codemirror2";
export default function DebuggerCompetition({value, handleSub}) {
    const [submission, setSubmission] = useState('Explain the bug and debug it here')
    const [explanation, setExplanation] = useState('')


    const handleChange = (event)=>{
        setExplanation(event.target.value)
    }

    function handleSubmit()
    {
            handleSub(explanation)
    }

  return (
    <>
    <Row>
    <Col span={20}>
        <h4>Debugging Explanation</h4>
        </Col>
        <Col span={4}>
        <Button onClick={handleSubmit}>Submit</Button>
        </Col>
        </Row>
      <textarea onChange={(event)=>handleChange(event)} style={{ width: '100%' }}>{explanation}</textarea>
     <h4>Code to Debug</h4>
       <CodeMirror
                style={{width : 400}}
                className="CodeMirror"
                  value={value}
                
             
                options={{
                  mode: 'text/javascript',
                  theme: "dracula",
                  lineNumbers: true,
                  fontSize: 1
                }}
              />
           
           
     </>
  )
}
