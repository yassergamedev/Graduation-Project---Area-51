import React, { useEffect, useState } from 'react';
import Question from './Question';
import './styles/Module.css';

const Module = ({index, modulee,onSubmit}) => {
  const [module, setModule] = useState(modulee);

  useEffect(() => {
    setModule(modulee)
  }, [modulee]);

  if (!module) {
    return <div>Loading...</div>;
  }

  function onSub(evaluation)
  {

      if(evaluation)
      {
        onSubmit(index)
      }
      
  }
  // Apply inline styles to the HTML content string
  const htmlWithStyle = `
  <div class="mod" style="text-align: left;">
    <style>
      .mod img {
        width: 400px; /* Set the desired width */
        height: 300px; /* Set the desired height */
        margin: 0 auto; /* Center horizontally */
      }
      iframe {
        width: 500px; /* Set the desired width */
        height: 300px; /* Set the desired height */
        margin: 0 auto; /* Center horizontally */
      }
    </style>
    ${module.content}
  </div>`;
let questions = module.questions;
  return (
    <div >
      <h2 >{module.name}</h2>
        <p>Creator :  </p>
        <p>Creation Date :  {module.creationDate}</p>
        <p>{module.description}</p>
      <div dangerouslySetInnerHTML={{ __html: htmlWithStyle }} />

       {questions.map((question)=>{
            
        return(
          
          
        <Question key={question._id}  onSubmit={onSub} questionn={question} />
        )
      })}
    </div>
  );
};

export default Module;
