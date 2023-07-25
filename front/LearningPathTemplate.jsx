import { Radio, Space, Tabs, Badge } from 'antd';
import { useEffect, useState } from 'react';
import Module from './Module';
import { useParams } from 'react-router-dom';
import { SyncOutlined, UserAddOutlined } from '@ant-design/icons';

const LearningPathTemplate = ({ lpp }) => {
  const [lp, setLp] = useState(lpp);
  const [modules, setModules] = useState([]);
  const [name, setName] = useState('');
  const { l } = useParams();

  useEffect(() => {
    setLp(lpp)
    setModules(lpp.modules)
    setName(lpp.name)
  }, [lpp]);

  function onSubmit(module) {
   
    const updateUserLearningPathTemplate = async () => {
      try {
        // Get the user and learning path IDs
        const user = JSON.parse(localStorage.getItem('user'));
        alert(user.username)
        const learningPathId = l;
        alert(l)
        // Find the specific module in the learning path
        const moduleIndex = user.learning_paths.modules.findIndex((moduleId) => moduleId === module._id);
  
        // If the module is found, update its status
        if (moduleIndex !== -1) {
          user.learning_paths.module[moduleIndex] = [module._id, true];
        } else {
          // If the module is not found, add it to the learning path
          user.learning_paths.module.push([module._id, true]);
        }
  
        // Send a PATCH request to update the user's learning path
        const updateUserResponse = await fetch(
          `http://localhost:3000/users/${user._id}/learningpath/${learningPathId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              learning_paths: user.learning_paths,
            }),
          }
        );
  
        if (updateUserResponse.ok) {
          // Success! Handle any additional logic here
          console.log('Module updated successfully');
        } else {
          console.error('Failed to update module');
        }
      } catch (error) {
        console.error('Failed to update module:', error);
      }
    };
  
    updateUserLearningPathTemplate();
  }
  


  return (
    <>
      <h1 style={{ fontSize: '20px' }}>{name}</h1>
      <div style={{ display: 'flex', height: '100%' }}>
        <Tabs
          tabBarStyle={{ width: '20%' }}
          tabPosition="left"
          icon={<UserAddOutlined />}
          items={modules.map((module) => {
            const id = module.module._id;
            let mod = module.module;
            let name = module.module.name;
            let points = module.points
            let processing = module.module.processing; // Assuming there is a "processing" property for each module
            
            return {
              label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                   <SyncOutlined spin />
                  <div style={{ whiteSpace: 'normal', marginLeft: '8px' }}>{name} ({points})</div>
                </div>
              ),
              key: id,
              children: <div style={{ overflowX: 'scroll' }}><Module onSubmit={onSubmit} modulee={mod} /></div>,
            };
          })}
        />
      </div>
    </>
  );
};

export default LearningPathTemplate;
