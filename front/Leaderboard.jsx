import { Avatar, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [uData, setUData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => {
        const filteredUsers = data.filter((user) => user.role === 'developer');
        const sortedUsers = filteredUsers.sort((a, b) => b.learning_points - a.learning_points || b.practise_points - a.practise_points);
        const usersWithRank = sortedUsers.map((user, index) => ({ ...user, rank: index + 1 }));
        setUData(usersWithRank);
      })
      .catch((error) => console.error(error));
  }, []);

  const userColumns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar, record) => <Avatar src={avatar} alt={record.username} />,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Learning Points',
      dataIndex: 'learning_points',
      key: 'learning_points',
      render: (learningPoints) => <Tag color="purple">{learningPoints}</Tag>,
    },
    {
      title: 'Practice Points',
      dataIndex: 'practise_points',
      key: 'practise_points',
      render: (practicePoints) => <Tag color="blue">{practicePoints}</Tag>,
    },
    {
      title: 'Competitions',
      dataIndex: 'competitions',
      key: 'competitions',
      render: (competitions) => <Tag color="blue">{competitions.length}</Tag>,
    },
    {
      title: 'Problems',
      dataIndex: 'problems',
      key: 'problems',
      render: (problems) => <Tag color="orange">{problems.length}</Tag>,
    },
    {
      title: 'Learning Paths',
      dataIndex: 'learning_paths',
      key: 'learning_paths',
      render: (learningPaths) => <Tag color="green">{learningPaths.length}</Tag>,
    },
  ];

  return <Table dataSource={uData} columns={userColumns} rowKey="id" pagination={false} />;
};

export default Leaderboard;
