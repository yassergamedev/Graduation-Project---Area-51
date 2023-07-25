import { useEffect, useState } from "react";
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import Output from "./Output";
import './styles/CodeEditor.css'
import ProblemFeedback from "./ProblemFeedback";
import { Modal } from "antd";

function CodeEditor({boilerplate , sendCode , sendSubmission, output, result, console,subBool}) {

  const [code, setCode] = useState("");
  const [subb, setSubb]= useState(subBool)
  const [language, setLanguage] = useState('50'); // default to C language (language_id: 50)

  useEffect(() => {
    setCode(boilerplate);
    setSubb(subBool)
  }, [boilerplate,subBool]);

  function handleCodeChange(editor, data, value) {
    setCode(value);
  }

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const options = {
    mode: 'text/javascript', // set the mode based on the selected language
    theme: 'dracula',
    lineNumbers: true,
  };

  return (
    <>
      <CodeMirror
        style={{width : 1000}}
        value={code}
        onBeforeChange={handleCodeChange}
        options={options}
      />

      <ProblemFeedback output={output} result={result} console={console} />

      <button style={{ textAlign: 'right' }} onClick={() => sendCode(code)}>Run Code</button>
    {subBool ? <button style={{ textAlign: 'left', marginLeft : '14px' }} onClick={() => sendSubmission(code)}>Submit</button> :
    <button style={{ textAlign: 'left', marginLeft : '14px' }} >Submit</button> }
    </>
  );
}

export default CodeEditor;
