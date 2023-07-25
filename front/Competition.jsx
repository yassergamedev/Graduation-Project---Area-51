import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ThreeTabs from './ThreeTabs';
import { Outlet, useParams } from 'react-router-dom';
import TwoTabs from './TwoTabs';
import OneTab from './OneTab';

const Competition = ({ usern }) => {
  const [user, setUser] = useState(usern);
  const { id } = useParams();
  const {jid}= useParams()
  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch((error) => console.error(error));
  }, [usern]);

  const [socket, setSocket] = useState(null);
  const [competition, setCompetition] = useState({});
  const [participants, setParticipants] = useState([]);
  const [leaderboard, setLeaderboard] = useState({});
  const [participantInfo, setParticipantInfo] = useState({ name: '', score: 0 });
  const [problems, setProblems] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [debug, setDebug] = useState('');
  const [time, setTime] = useState(0);
  const [title, setTitle] = useState('');
  const [design, setDesign] = useState('');
  const [type, setType] = useState('');
  const [submissions, setSubmissions] = useState(0);
  const { cid } = useParams();

  const handleJoinRoom = (roomName) => {
    if (socket) {
      socket.emit('joinRoom', roomName, participantInfo);
    }
  };

  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:3000/competitions/${cid}`)
      .then((res) => res.json())
      .then((data) => {
        setDebug(data.debug);
        setTime(data.problemsTime);
        setDesign(data.design)
        setSubmissions(data.problems.length);
        setTitle(data.title);
        setCompetition(data);
        setType(data.competitionStatus)
        setProblems(data.problems);
        console.log(problems);
        data.questions.forEach((question) => {
          fetch(`http://localhost:3000/questions/${question}`)
            .then((res) => res.json())
            .then((questionData) => {
              setQuestions((prevQuestions) => [...prevQuestions, questionData]);
            });
        });
        console.log(questions);
      })
      .catch((error) => console.error(error));
    console.log(competition);

    // const newSocket = io('http://localhost:3000');
    // setSocket(newSocket);
  }, []);

  const calculateCountdown = () => {
    const startDate = new Date(competition.date[0]).getTime();
    const now = new Date().getTime();
    const distance = startDate - now;

    if (distance <= 0) {
      // Start date has arrived, show the competition
      return null;
    }

    // Calculate remaining time
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return (
      <div>
        <h2>Competition Countdown</h2>
        <p>
          {days}d {hours}h {minutes}m {seconds}s
        </p>
      </div>
    );
  };

  return (
    <div>
      {design === 'three-tabs' && (
        <ThreeTabs
          comp={competition}
          probs={problems}
          quest={questions}
          debug={debug}
          time={time}
          subm={submissions}
          titlee={title}
          offer={jid}
          type={type}
        />
      )}
  
      {design === 'two-tabs' && (
        <TwoTabs
          comp={competition}
          probs={problems}
          quest={questions}
          time={time}
          subm={submissions}
          titlee={title}
          offer={jid}
          type={type}
        />
      )}
  
      {design === 'one-tab' && (
        <OneTab
          comp={competition}
          time={time}
          subm={submissions}
          probs={problems}
          titlee={title}
          offer={jid}
          type={type}
        />
      )}
  
      {/* <button onClick={() => handleJoinRoom('competitionRoom')}>Join competition</button> */}
    </div>
  );
  
};

export default Competition;
