import React, { useEffect, useState } from 'react';
import Module from './Module';
import './styles/Problem.css';
import { useParams } from 'react-router-dom';
import ProblemDescription from './ProblemDescription';
import { Card, Col, Row } from 'antd';
import CodeEditor from './CodeEditor';
const ProblemTemplate = ({problem}) => {

  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const [activeTabKey2, setActiveTabKey2] = useState('app');
 



const tabList = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];
const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};
const tabListNoTitle = [
  {
    key: 'Description',
    tab: 'Description',
  },
  {
    key: 'Solutions',
    tab: 'Solutions',
  },
  {
    key: 'Submissions',
    tab: 'Submissions',
  },
];
const contentListNoTitle = {
  article: <p>article content</p>,
  Description: <ProblemDescription problem={problem} />,
  project: <p>project content</p>,
};
const onTab1Change = (key) => {
  setActiveTabKey1(key);
};
const onTab2Change = (key) => {
  setActiveTabKey2(key);
};





  return (
    <div >
    {problem.title}
    <Row>
  
    <Col span={14}>
      <Card
        style={{
          width: '100%',
        }}
        defaultActiveTabKey='Description'
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        
        onTabChange={onTab2Change}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
      </Col>
     
     <Col span={10}>
    <CodeEditor
    
    boilerplate={problem.boilerplate}/> </Col>
    
    </Row>
</div>
  );
};

export default ProblemTemplate;
