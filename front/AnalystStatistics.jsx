import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Card, Col, Row, Statistic, Button } from 'antd';
import {
  FileSearchOutlined,
  CodeOutlined,
  TrophyOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
} from 'recharts';
import { useCurrentPng } from 'recharts-to-png';
import FileSaver from 'file-saver';

import { saveAs } from 'file-saver';

const AdminStatistics = () => {
  const [userCount, setUserCount] = useState(0);
  const [learningPathCount, setLearningPathCount] = useState(0);
  const [problemsCount, setProblemsCount] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [userRoleData, setUserRoleData] = useState([]);
  const [userCreationData, setUserCreationData] = useState([]);

  const [getPng1, { ref: chartRef1, isLoading: isLoading1 }] = useCurrentPng();
  const [getPng2, { ref: chartRef2, isLoading: isLoading2 }] = useCurrentPng();
  const [getPng3, { ref: chartRef3, isLoading: isLoading3 }] = useCurrentPng();

  useEffect(() => {
    // Fetch the lengths from the appropriate endpoints
    const fetchData = async () => {
      try {
        const userResponse = await fetch('http://localhost:3000/users');
        const userData = await userResponse.json();
        setUserCount(userData.length);

        const learningPathResponse = await fetch('http://localhost:3000/learning-paths');
        const learningPathCountData = await learningPathResponse.json();
        setLearningPathCount(learningPathCountData.length);

        const problemsResponse = await fetch('http://localhost:3000/problems');
        const problemsCountData = await problemsResponse.json();
        setProblemsCount(problemsCountData.length);

        const questionsResponse = await fetch('http://localhost:3000/questions');
        const questionsCountData = await questionsResponse.json();
        setQuestionsCount(questionsCountData.length);

        const userRoleResponse = await fetch('http://localhost:3000/users');
        const userRoleData = await userRoleResponse.json();
        setUserRoleData(userRoleData);

        const userCreationResponse = await fetch('http://localhost:3000/users');
        const userCreationData = await userCreationResponse.json();
        setUserCreationData(userCreationData);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = [
    { name: 'User Count', count: userCount },
    { name: 'Learning Path Count', count: learningPathCount },
    { name: 'Problems Count', count: problemsCount },
    { name: 'Questions Count', count: questionsCount },
  ];

  const userRoleCounts = userRoleData.reduce((counts, user) => {
    counts[user.role] = (counts[user.role] || 0) + 1;
    return counts;
  }, {});

  const userRoleChartData = Object.entries(userRoleCounts).map(([role, count]) => ({
    name: role,
    count,
  }));

  const userCreationCounts = userCreationData.reduce((counts, user) => {
    const createdAt = new Date(user.createdAt).toLocaleDateString();
    counts[createdAt] = (counts[createdAt] || 0) + 1;
    return counts;
  }, {});

  const userCreationChartData = Object.entries(userCreationCounts).map(([date, count]) => ({
    date,
    count,
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

  const handleExport1 = useCallback(async () => {
    try {
      const chartImage = await getPng1(chartRef1);
      console.log(chartImage)
      if (chartImage) {
        // Download with FileSaver
        FileSaver.saveAs(chartImage, 'chart1.png');
      }
    } catch (error) {
      console.error('Error exporting chart:', error);
    }
  }, [getPng1]);

  const handleExport2 = useCallback(async () => {
    try {
      const chartImage = await getPng2(chartRef2);
      if (chartImage) {
        // Download with FileSaver
        FileSaver.saveAs(chartImage, 'chart2.png');
      }
    } catch (error) {
      console.error('Error exporting chart:', error);
    }
  }, [getPng2]);

  const handleExport3 = useCallback(async () => {
    try {
      const chartImage = await getPng3(chartRef3);
      if (chartImage) {
        // Download with FileSaver
        FileSaver.saveAs(chartImage, 'chart3.png');
      }
    } catch (error) {
      console.error('Error exporting chart:', error);
    }
  }, [getPng3]);

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="User Count"
              value={userCount}
              valueStyle={{ color: 'black' }}
              prefix={<FileSearchOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Learning Path Count"
              value={learningPathCount}
              valueStyle={{ color: 'black' }}
              prefix={<CodeOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Problems Count"
              value={problemsCount}
              valueStyle={{ color: 'black' }}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Questions Count"
              value={questionsCount}
              valueStyle={{ color: 'black' }}
              prefix={<QuestionCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart ref={chartRef1} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <Button type="primary" onClick={handleExport1} style={{ marginTop: '10px' }}>
              Export to PNG
            </Button>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart ref={chartRef2}>
                <Pie
                  data={userRoleChartData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {userRoleChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <Button type="primary" onClick={handleExport2} style={{ marginTop: '10px' }}>
              Export to PNG
            </Button>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart ref={chartRef3} data={userCreationChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
            <Button type="primary" onClick={handleExport3} style={{ marginTop: '10px' }}>
              Export to PNG
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminStatistics;
