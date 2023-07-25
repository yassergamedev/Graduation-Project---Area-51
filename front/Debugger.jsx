import React, { useState } from 'react'
import { Controlled as CodeMirror } from "react-codemirror2";
export default function Debugger({value}) {
    const [submission, setSubmission] = useState('Explain the bug and debug it here')

  return (
    <>
        <h4>Debugging Explanation</h4>
       
      <textarea style={{ width: '100%' }}></textarea>
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
