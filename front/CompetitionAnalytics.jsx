import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Card, Col, Row, Button } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useCurrentPng } from 'recharts-to-png';
import FileSaver from 'file-saver';

const CompetitionAnalytics = () => {
  const [competitions, setCompetitions] = useState([]);
  const [getPng1, { ref: chartRef1 }] = useCurrentPng();
  const [getPng2, { ref: chartRef2 }] = useCurrentPng();
  const [getPng3, { ref: chartRef3 }] = useCurrentPng();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch('http://localhost:3000/competitions');
        const data = await response.json();
        setCompetitions(data);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };

    fetchCompetitions();
  }, []);

  const statusCounts = competitions.reduce((counts, competition) => {
    counts[competition.competitionStatus] = (counts[competition.competitionStatus] || 0) + 1;
    return counts;
  }, {});

  const statusChartData = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  const createdAtCounts = competitions.reduce((counts, competition) => {
    const createdAt = new Date(competition.createdAt).toLocaleDateString();
    counts[createdAt] = (counts[createdAt] || 0) + 1;
    return counts;
  }, {});

  const createdAtChartData = Object.entries(createdAtCounts).map(([date, count]) => ({
    date,
    count,
  }));

  const designCounts = competitions.reduce((counts, competition) => {
    counts[competition.design] = (counts[competition.design] || 0) + 1;
    return counts;
  }, {});

  const designChartData = Object.entries(designCounts).map(([design, count]) => ({
    design,
    count,
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f00', '#ff5500'];

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

  const handleExport3 = useCallback(async () => {
    try {
      const chartImage = await getPng3(chartRef3);
      if (chartImage) {
        FileSaver.saveAs(chartImage, 'chart3.png');
      }
    } catch (error) {
      console.error('Error exporting chart:', error);
    }
  }, [getPng3]);

  return (
    <div>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={8}>
          <Card bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart ref={chartRef1} data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
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
        <Col span={8}>
          <Card bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart ref={chartRef2} data={createdAtChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
            <Button type="primary" onClick={handleExport2} style={{ marginTop: '10px' }}>
              Export to PNG
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart ref={chartRef3}>
                <Pie data={designChartData} dataKey="count" nameKey="design" cx="50%" cy="50%" outerRadius={80}>
                  {designChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
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

export default CompetitionAnalytics;
