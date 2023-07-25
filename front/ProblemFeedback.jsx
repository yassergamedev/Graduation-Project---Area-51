import { Card } from 'antd';
import { useState } from 'react';


const ProblemFeedback = ({output, result, console}) => {

    const tabListNoTitle = [
        {
          key: 'Output',
          tab: 'Output',
        },
        
      ];
      const contentListNoTitle = {
        Output:output===true? <h3 style={{color:'green'}}> Correct</h3> : (!output? <h3 style={{color:'red'}}> Incorrect</h3> :
        <h3 style={{color:'red'}}> {output}</h3>),
        Result: <p>{result}</p>,
        project: <p>{console}</p>,
      };

  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const [activeTabKey2, setActiveTabKey2] = useState('app');
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  return (
    <>
    
      <Card
        style={{
          width: '100%',
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
    
        onTabChange={onTab2Change}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};
export default ProblemFeedback;