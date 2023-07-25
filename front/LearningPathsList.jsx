import { LikeOutlined, MessageOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Space, Tag, message, notification, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useNavigate, useParams } from 'react-router-dom';
import lpimage from './pics/lp.png';
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const LearningPathsList = ({ usern }) => {
  const [learningPaths, setLearningPaths] = useState([]);
  const [creators, setCreators] = useState({});
  const [likedPaths, setLikedPaths] = useState([]);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [selectedLearningPath, setSelectedLearningPath] = useState({});
  const [user, setUser] = useState(usern);
  const { id } = useParams();
  let {page} = useParams()
  useEffect(() => {
      fetch(`http://localhost:3000/users/${id}`)
          .then((res) => res.json())
          .then((data) => {
              setUser(data);
              setLikedPaths(data.liked_learning_paths)
              localStorage.setItem('user', JSON.stringify(data));
          });
  }, [id]);

  const history = useNavigate();

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
        const response = await Promise.all(
          creatorIds.map((id) => fetch(`http://localhost:3000/users/${id}`))
        );
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



  const handleParticipate = async (learningPath) => {
    try {
      const isParticipating = user.learning_paths.includes(learningPath._id);

      if (!isParticipating) {
        if (learningPath.coins > 0) {
          setPurchaseModalVisible(true);
          setSelectedLearningPath(learningPath);
        } else {
            const updatedLearningPaths = [...user.learning_paths, {lp :selectedLearningPath._id, progress : false}];
            learningPath.participationNum += 1;

          const updateUserResponse = await fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              learning_paths: updatedLearningPaths,
            }),
          });

          const updateLearningPathResponse = await fetch(
            `http://localhost:3000/learning-paths/${learningPath._id}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                participationNum: learningPath.participationNum,
              }),
            }
          );

          if (updateUserResponse.ok && updateLearningPathResponse.ok) {
            message.success('Learning Path added to your Participation List');
            history(`${learningPath._id}`);
          } else {
            console.error('Failed to update user or learning path');
          }
        }
      } else {
        message.warning('You have already participated in this Learning Path');
        history(`${learningPath._id}`);
      }
    } catch (error) {
      console.error('Failed to update user or learning path:', error);
    }
  };

  const handlePurchase = async () => {
    try {
      const updatedLearningPaths = [...user.learning_paths, {lp :selectedLearningPath._id,progress : false}];
      selectedLearningPath.participationNum += 1;

      const updateUserResponse = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          learning_paths: updatedLearningPaths,
          coins: user.coins - selectedLearningPath.coins,
        }),
      });

      const updateLearningPathResponse = await fetch(
        `http://localhost:3000/learning-paths/${selectedLearningPath._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            participationNum: selectedLearningPath.participationNum,
          }),
        }
      );

      if (updateUserResponse.ok && updateLearningPathResponse.ok) {
        history(`${selectedLearningPath._id}`);
        message.success('Learning Path added to your Participation List');
        setPurchaseModalVisible(false);
        setSelectedLearningPath(null);
        
      } else {
        console.error('Failed to update user or learning path');
      }
    } catch (error) {
      console.error('Failed to update user or learning path:', error);
    }
  };

  const handleCancelPurchase = () => {
    setPurchaseModalVisible(false);
    setSelectedLearningPath(null);
  };

  const handleLike = async (learningPath) => {
    try {
      const isLiked = likedPaths.includes(learningPath._id);
      let updatedLikedPaths;

      if (isLiked) {
        updatedLikedPaths = likedPaths.filter((pathId) => pathId !== learningPath._id);
        learningPath.likedNum -= 1;
      } else {
        updatedLikedPaths = [...likedPaths, learningPath._id];
        learningPath.likedNum += 1;
      }

      const updateUserResponse = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          liked_learning_paths: updatedLikedPaths,
        }),
      });

      const updateLearningPathResponse = await fetch(
        `http://localhost:3000/learning-paths/${learningPath._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            likedNum: learningPath.likedNum,
          }),
        }
      );

      if (updateUserResponse.ok && updateLearningPathResponse.ok) {
        setLikedPaths(updatedLikedPaths);

        if (isLiked) {
          message.success('Learning Path removed from your Liked Paths');
        } else {
          message.success('Learning Path added to your Liked Paths');
        }
      } else {
        console.error('Failed to update user or learning path');
      }
    } catch (error) {
      console.error('Failed to update user or learning path:', error);
    }
  };

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
              learningPath.coins > 0 ? (
                <Button
  type="primary"
  style={{ backgroundColor: 'yellow', color: 'black' }}
  onClick={() => {
    // Check if the learning path is already in the user's learning paths
    const isAlreadyPurchased = user.learning_paths.includes(learningPath._id);

    if (isAlreadyPurchased) {
      // If the learning path is already purchased, show the learning path page
      history(`${learningPath._id}`);
    } else {
      // Check if the user has enough coins to purchase the learning path
      if (user.coins >= learningPath.coins) {
        setPurchaseModalVisible(true);
        setSelectedLearningPath(learningPath);
      } else {
        message.error("You don't have enough coins to purchase this Learning Path");
      }
    }
  }}
>
  Purchase
</Button>

              ) : (
                <Button type="primary" onClick={() => handleParticipate(learningPath)}>
                  <Link to={`${learningPath._id}`}>Participate</Link>
                </Button>
              ),
            ]}
            extra={<img width={272} alt="logo" src={learningPath.image === undefined || learningPath.image === ''? lpimage : learningPath.image } />}
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

      <Modal
        title="Purchase Learning Path"
        visible={purchaseModalVisible}
        onOk={handlePurchase}
        onCancel={handleCancelPurchase}
      >
        <p>Would you like to purchase this Learning Path?</p>
        <p>Coin Price: {selectedLearningPath?.coins}</p>
      </Modal>
    </>
  );
};

export default LearningPathsList;
