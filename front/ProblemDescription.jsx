import { Divider, Space, Tag } from 'antd';
import React, { useState } from 'react';
function ProblemDescription({problem}) {
  let bro  = problem.description
  const [html, setHtml] = useState(bro);
  const [tags, setTags] = useState(problem.tags)
  console.log("problem sent to description comp !" )
  console.log(problem)
  return (
    <div class="problem-container">
    
  

{problem.domains.map((domain) => (
  <Tag key={domain} color="blue">{domain}</Tag>
))}
<Divider></Divider>
    <Tag color='green'>{problem.learningPoints}</Tag>
    <Tag color='purple'>{problem.practisePoints}</Tag>
    <Tag color='orange'>{problem.coins}</Tag>
   <Divider></Divider>
     <div dangerouslySetInnerHTML={{ __html: html }}></div>
   
</div>
  );
  }

export default ProblemDescription;
