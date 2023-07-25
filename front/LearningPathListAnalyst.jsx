import { LikeOutlined, MessageOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Space, Tag, message, notification, Modal, Drawer } from 'antd';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import lpimage from './pics/lp.png';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import {useCurrentPng} from 'recharts-to-png';
import FileSaver from 'file-saver';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const LearningPathListAnalyst = ({ usern }) => {
  const [loading, setLoading] = useState(true);
  const [learningPaths, setLearningPaths] = useState([]);
  const [selectedLearningPath, setSelectedLearningPath] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [getPng1, { ref: chartRef1, isLoading: isLoading1 }] = useCurrentPng();
  const [getPng2, { ref: chartRef2, isLoading: isLoading2 }] = useCurrentPng();
  const colors = ['#8884d8', '#82ca9d', '#ffc658']; // Define an array of colors
  const [user, setUser] = useState(usern);
  const { id } = useParams();
  const [creators, setCreators] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      });
  }, [id]);
  const dataCOMP = selectedLearningPath && selectedLearningPath.modules.map((module, index) => ({
    name: `Module ${index + 1}`,
    points: module.points || 0,
  }));
  const showDrawer = (learningPath) => {
    setSelectedLearningPath(learningPath);
    setIsDrawerVisible(true);
  };

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        const response = await fetch('http://localhost:3000/learning-paths');
        const data = await response.json();
        setLearningPaths(data);
        fetchCreators(data);
      } catch (error) {
        console.error('Failed to fetch learning paths:', error);
      }
    };

    const fetchCreators = async (paths) => {
      try {
        const creatorIds = paths.map((path) => path.creator);
        const response = await Promise.all(creatorIds.map((id) => fetch(`http://localhost:3000/users/${id}`)));
        const data = await Promise.all(response.map((res) => res.json()));
        const creatorsMap = {};
        data.forEach((user) => {
          creatorsMap[user._id] = user.username;
        });
        setCreators(creatorsMap);
      } catch (error) {
        console.error('Failed to fetch creators:', error);
      }
    };

    fetchLearningPaths();
  }, []);

  const handleLike = (learningPath) => {
    // Implement the logic for handling like action
  };

  const handleParticipate = (learningPath) => {
    // Implement the logic for handling participate action
  };

  const closeDrawer = () => {
    setSelectedLearningPath(null);
    setIsDrawerVisible(false);
  };

  const handleExport1 = useCallback(async () => {
    try {
      const chartImage = await getPng1(chartRef1.current);
      if (chartImage) {
        FileSaver.saveAs(chartImage, 'chart1.png');
      }
    } catch (error) {
      console.error('Error exporting chart:', error);
    }
  }, [getPng1, chartRef1]);

  const handleExport2 = useCallback(async () => {
    try {
      const chartImage = await getPng2(chartRef2.current);
      if (chartImage) {
        FileSaver.saveAs(chartImage, 'chart2.png');
      }
    } catch (error) {
      console.error('Error exporting chart:', error);
    }
  }, [getPng2, chartRef2]);

  const downloadChart1 = useCallback(async () => {
    try {
      const chartRef = document.getElementById('chart1');
      const chartImage = await getPng1(chartRef);
      if (chartImage) {
        FileSaver.saveAs(chartImage, 'chart1.png');
      }
    } catch (error) {
      console.error('Error downloading chart:', error);
    }
  }, [getPng1]);

  const downloadChart2 = useCallback(async () => {
    try {
      const chartRef = document.getElementById('chart2');
      const chartImage = await getPng2(chartRef);
      if (chartImage) {
        FileSaver.saveAs(chartImage, 'chart2.png');
      }
    } catch (error) {
      console.error('Error downloading chart:', error);
    }
  }, [getPng2]);

  const openNotification = () => {
    notification.info({
      message: 'Notification',
      description: 'Learning Path Added to your Participation List',
    });
  };

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={learningPaths}
        renderItem={(learningPath) => (
          <List.Item
            key={learningPath.title}
            actions={[
              <IconText icon={UserOutlined} text={learningPath.participationNum} key="list-vertical-star-o" />,
              <Button
                icon={<LikeOutlined />}
                onClick={() => handleLike(learningPath)}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                {learningPath.likedNum}
              </Button>,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
             
                <Button
                  type="primary"
                  style={{ backgroundColor: 'yellow', color: 'black' }}
                  onClick={() => showDrawer(learningPath)}
                >
                  View Analytics
                </Button>
             
            ]}
            extra={<img width={272} alt="logo" src={learningPath.image === undefined || learningPath.image === '' ? lpimage : learningPath.image} />}
          >
            <List.Item.Meta
              title={learningPath.name}
              description={`Creator: ${creators[learningPath.creator]}, Creation Date: ${learningPath.createdAt}`}
            />
            {learningPath.description}
            <br />
            <br />
            <Tag color="orange">{learningPath.coins > 0 ? learningPath.coins : 'free'}</Tag>
            <Tag color="blue">{learningPath.learningPoints}</Tag>
            <br />
            <br />
            {learningPath.domains.slice(1).map((domain) => (
              <Tag key={domain} color="blue">
                {domain}
              </Tag>
            ))}
          </List.Item>
        )}
      />

      <Drawer title="Learning Path Analytics" placement="right" closable={true} onClose={closeDrawer} visible={isDrawerVisible} width={800}>
        {selectedLearningPath && (
          <>
            <h3>Analytics</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <PieChart width={400} height={300} ref={chartRef1}>
                  <Pie
                    data={[
                      { name: 'Participation ', value: selectedLearningPath.participationNum },
                      { name: 'Likes ', value: selectedLearningPath.likedNum },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    <Cell key="participation" fill="#82ca9d" />
                    <Cell key="likes" fill="#8884d8" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
                <button onClick={handleExport1}>Download Chart 1</button>
              </div>
              <div>
                <div>
                  <BarChart width={400} height={300} data={dataCOMP} ref={chartRef2}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="points" fill={colors[1]} />
                  </BarChart>
                  <button onClick={handleExport2}>Download Chart 2</button>
                </div>
               
              </div>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};

export default LearningPathListAnalyst;
