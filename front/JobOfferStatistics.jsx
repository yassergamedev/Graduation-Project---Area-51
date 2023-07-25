import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Card, Col, Row, Button } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useCurrentPng } from 'recharts-to-png';
import FileSaver from 'file-saver';

const JobOfferStatistics = ({ selectedJobOffer }) => {
  const [jobOffers, setJobOffers] = useState([]);
  const [getPng1, { ref: chartRef1 }] = useCurrentPng();
  const [getPng2, { ref: chartRef2 }] = useCurrentPng();
  const [getPng3, { ref: chartRef3 }] = useCurrentPng();

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await fetch('http://localhost:3000/job-offers');
        const data = await response.json();
        setJobOffers(data);
      } catch (error) {
        console.error('Error fetching job offers:', error);
      }
    };

    fetchJobOffers();
  }, []);

  const companyCounts = jobOffers.reduce((counts, jobOffer) => {
    counts[jobOffer.company] = (counts[jobOffer.company] || 0) + 1;
    return counts;
  }, {});

  const companyChartData = Object.entries(companyCounts).map(([company, count]) => ({
    company,
    count,
  }));

  const creationDateCounts = jobOffers.reduce((counts, jobOffer) => {
    const creationDate = new Date(jobOffer.creationDate).toLocaleDateString();
    counts[creationDate] = (counts[creationDate] || 0) + 1;
    return counts;
  }, {});

  const creationDateChartData = Object.entries(creationDateCounts).map(([date, count]) => ({
    date,
    count,
  }));

  const categoryCounts = jobOffers.reduce((counts, jobOffer) => {
    counts[jobOffer.category] = (counts[jobOffer.category] || 0) + 1;
    return counts;
  }, {});

  const categoryChartData = Object.entries(categoryCounts).map(([category, count]) => ({
    category,
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
        <Col span={12}>
          <Card bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart ref={chartRef1} data={companyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="company" />
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
              <LineChart ref={chartRef2} data={creationDateChartData}>
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
        
      </Row>
    </div>
  );
};

export default JobOfferStatistics;
