import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/LPL.css'
import LearningPath from './LearningPath';

const LearningPathsPage = () => {
  const [learningPaths, setLearningPaths] = useState([]);

  useEffect(() => {
    const fetchLearningPaths = async () => {
      const response = await fetch('http://localhost:3000/learning-paths');
      const data = await response.json();
      setLearningPaths(data);
    };

    fetchLearningPaths();
  }, []);

  return (
    <div className="learning-paths-container">
      <h1>Learning Paths</h1>
      <ul className="learning-paths-list">
        {learningPaths.map((path) => (
          <li key={path._id} className="learning-path">
            <Link to={`${path._id}`} className="learning-path-link">
              {path.name} ({path.learningPoints} LP)
            </Link>
            
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default LearningPathsPage;

