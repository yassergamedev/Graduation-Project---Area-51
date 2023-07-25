import React, { useState, useEffect } from 'react';
import { Carousel, Card, Typography, Divider, Space, Skeleton, Col, Tag } from 'antd';
import Announce from './Announce';
import Meta from 'antd/es/card/Meta';

const { Title } = Typography;

function Feed({ user }) {
  const [announces, setAnnounces] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [learningPaths, setLearningPaths] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchAnnounces();
    fetchCompetitions();
    fetchLearningPaths();
  }, []);

  const fetchAnnounces = async () => {
    try {
      const response = await fetch('http://localhost:3000/announce');
      const data = await response.json();
      const sortedData = data.sort((a, b) => {
        return new Date(b.creationDate) - new Date(a.creationDate);
      });
      setAnnounces(sortedData);
    } catch (error) {
      console.error('Error fetching announces:', error);
    }
  };
  

  const fetchCompetitions = async () => {
    try {
      const response = await fetch('http://localhost:3000/competitions');
      const data = await response.json();
      setCompetitions(data);
    } catch (error) {
      console.error('Error fetching competitions:', error);
    }
  };

  const fetchLearningPaths = async () => {
    try {
      const response = await fetch('http://localhost:3000/learning-paths');
      const data = await response.json();
      setLearningPaths(data);
    } catch (error) {
      console.error('Error fetching learning paths:', error);
    }
  };

  return (
    <div>
    <Carousel autoplay>
  {announces.reverse().map((announce) => (
    <div key={announce.id}>
      <Announce announce={announce} />
    </div>
  ))}
</Carousel>

     

      
       
      
    </div>
  );
}

export default Feed;
