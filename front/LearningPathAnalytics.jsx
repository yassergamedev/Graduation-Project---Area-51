import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Card, Col, Row, Button } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { useCurrentPng } from 'recharts-to-png';
import FileSaver from 'file-saver';

const LearningPathAnalytics = () => {
  const [learningPaths, setLearningPaths] = useState([]);
  const [getPng1, { ref: chartRef1 }] = useCurrentPng();
  const [getPng2, { ref: chartRef2 }] = useCurrentPng();

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        const response = await fetch('http://localhost:3000/learning-paths');
        const data = await response.json();
        setLearningPaths(data);
      } catch (error) {
        console.error('Error fetching learning paths:', error);
      }
    };

    fetchLearningPaths();
  }, []);

  const domainCounts = learningPaths.reduce((counts, path) => {
    path.domains.forEach((domain) => {
      counts[domain] = (counts[domain] || 0) + 1;
    });
    return counts;
  }, {});

  const domainChartData = Object.entries(domainCounts).map(([domain, LearningPaths]) => ({
    domain,
    LearningPaths,
  }));

  const createdAtCounts = learningPaths.reduce((counts, path) => {
    const createdAt = new Date(path.createdAt).toLocaleDateString();
    counts[createdAt] = (counts[createdAt] || 0) + 1;
    return counts;
  }, {});

  const createdAtChartData = Object.entries(createdAtCounts).map(([date, LearningPathsCreated]) => ({
    date,
   LearningPathsCreated,
  }));

  const handleExport1 = useCallback(async () => {
    try {
      const chartImage = await getPng1(chartRef1);
      if (chartImage) {
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
        FileSaver.saveAs(chartImage, 'chart2.png');
      }
    } catch (error) {
      console.error('Error exporting chart:', error);
    }
  }, [getPng2]);

  return (
    <div>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart ref={chartRef1} data={domainChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="domain" />
                <YAxis />
                <Legend />
                <Bar dataKey="LearningPaths" fill="#8884d8" />
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
              <LineChart ref={chartRef2} data={createdAtChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="LearningPathsCreated" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
            <Button type="primary" onClick={handleExport2} style={{ marginTop: '10px' }}>
              Export to PNG
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LearningPathAnalytics;
