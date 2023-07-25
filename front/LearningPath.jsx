import { Radio, Space, Tabs, Badge, FloatButton, message } from 'antd';
import { useEffect, useState } from 'react';
import Module from './Module';
import { useParams } from 'react-router-dom';
import { SyncOutlined, UserAddOutlined, CheckCircleTwoTone } from '@ant-design/icons';

const LearningPath = ({ lpp }) => {
  const [lp, setLp] = useState(lpp);
  const [modules, setModules] = useState([]);
  const [name, setName] = useState('');
  const [user, setUser] = useState({});
  const [progress, setProgress] = useState([0]) 
  const [isModuleComplete, setIsModuleComplete] = useState(Array(modules.length).fill(false));
  const [isLearningPathComplete, setIsLearningPathComplete] = useState(false);

  const { l } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/learning-paths/${l}`)
      .then((res) => res.json())
      .then((data) => {
        setLp(data);
   
        setModules(data.modules);
        let m = data.modules.length
        setIsModuleComplete(new Array(m).fill(false))
      
        setName(data.name);
        const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  
    // Check if the learning path progress is true in the user's learning_paths
    const learningPath = user.learning_paths.find((path) => path.lp === l);
    if (learningPath && learningPath.progress) {
      setIsLearningPathComplete(true);
      setIsModuleComplete(Array(modules.length).fill(true).map(() => false));

      console.log(isModuleComplete)
    }
      });
    
    
  }, []);
  
  const onSubmit = async (index) => {
    console.log(isModuleComplete)
    const updatedCompleteState = [...isModuleComplete];
    updatedCompleteState[index - 1] = true; // Update the completion state for the corresponding module
    setIsModuleComplete(updatedCompleteState);
  
    if (updatedCompleteState.every((complete) => complete === true) &&!isLearningPathComplete) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const learningIndex = user.learning_paths.findIndex((obj) => l === obj.lp);
  
        if (learningIndex !== -1) {
          user.learning_paths[learningIndex].progress = true;
        } else {
          user.learning_paths.push({ lp: l, progress: true });
        }
  
        const updateUserResponse = await fetch(`http://localhost:3000/users/${user._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            learning_paths: user.learning_paths,
          }),
        });
  
        if (updateUserResponse.ok) {
          console.log('Learning path updated successfully');
          const learningPathPoints = lp.learningPoints;
          const updatedLearningPoints = user.learning_points + learningPathPoints;
        
          try {
            const updateUserLearningPointsResponse = await fetch(`http://localhost:3000/users/${user._id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                learning_points: updatedLearningPoints,
              }),
            });
        
            if (updateUserLearningPointsResponse.ok) {
              console.log('User learningPoints updated successfully');
              setIsLearningPathComplete(true);
              message.success({ content: "Congratulations for completing the path! +" + lp.learningPoints });
            } else {
              console.error('Failed to update user learningPoints');
            }
          } catch (error) {
            console.error('Failed to update user learningPoints:', error);
          }
        } else {
          console.error('Failed to update learning path');
        }
      } catch (error) {
        console.error('Failed to update learning path:', error);
      }
    }
  };
  
  
  
  
let counter = 0;
  return (
    <>
      <h1 style={{ fontSize: '20px' }}>{name}</h1>
      <div style={{ display: 'flex', height: '100%' }}>
        
        <Tabs
          tabBarStyle={{ width: '20%' }}
          tabPosition="left"
          icon={<UserAddOutlined />}
          items={modules.map((module) => {
            counter++;
            const id = module.module._id;
            let mod = module.module;
            let name = module.module.name;
            let points = module.points;
            let processing = module.module.processing; // Assuming there is a "processing" property for each module
            let learningPathProgress = user.learning_paths.find((obj) => obj.lp === l)?.progress;
   
            return {
              label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {isModuleComplete[counter - 1] ? (
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                  ) : (
                    <SyncOutlined spin />
                  )}
                  <div style={{ whiteSpace: 'normal', marginLeft: '8px' }}>
                    {name} ({points})
                  </div>
                </div>
              ),
              key: id,
              children: (
                <div style={{ overflowX: 'scroll' }}>
                  {isLearningPathComplete ? (
        <Badge.Ribbon text="Completed" color="#52c41a">
          <Tabs
            tabBarStyle={{ width: '20%' }}
            tabPosition="left"
            icon={<UserAddOutlined />}
             // Existing code for rendering modules
          />
        </Badge.Ribbon>
      ) : (
        <Tabs
          tabBarStyle={{ width: '20%' }}
          tabPosition="left"
          icon={<UserAddOutlined />}
        // Existing code for rendering modules
        />
      )}
                  <Module index={counter} onSubmit={onSubmit} modulee={mod} />
                  
                </div>
              ),
              
            };
          })}
        />
      </div>
      
    
    </>
  );
};

export default LearningPath;
