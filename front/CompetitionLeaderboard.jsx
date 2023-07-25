import React, { useEffect, useState } from 'react';
import { Table, Avatar } from 'antd';
import { useParams } from 'react-router-dom';

const CompetitionLeaderboard = () => {
  const [participations, setParticipations] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [data, setData] = useState([]);

  const { cid } = useParams();

  useEffect(() => {
    // Fetch the competition's participations based on the competitionId
    fetch(`http://localhost:3000/competitions/${cid}`)
      .then((res) => res.json())
      .then((data) => {
        setParticipations(data.participations);
        fetchParticipants(data.participations);
      })
      .catch((error) => console.error(error));
  }, [cid]);

  // Fetch the participants' details based on the participation IDs
  const fetchParticipants = async (participations) => {
    const participantIds = participations.map((participation) => participation.id);
    const participantsData = [];

    for (const participantId of participantIds) {
      try {
        const response = await fetch(`http://localhost:3000/users/${participantId}`);
        const participant = await response.json();
        participantsData.push(participant);
      } catch (error) {
        console.error(error);
      }
    }

    setParticipants(participantsData);
  };

  // Calculate the score for each participation
  const calculateScore = (participation) => {
    const problemScore = participation.submission.problems.filter((problem) => problem).length;
    const questionScore = participation.submission.questions.filter((question) => question).length;
    const highestTime = 1;

    return problemScore + questionScore + highestTime;
  };

  useEffect(() => {
    // Prepare the data for the leaderboard table
    const leaderboardData = participations.map((participation) => {
      const participant = participants.find((user) => user._id === participation.id);

      return {
        key: participation._id,
        participant: {
          avatar: participant?.avatar,
          username: participant?.username,
        },
        problemScore: participation.submission.problems.filter((problem) => problem).length,
        questionScore: participation.submission.questions.filter((question) => question).length,
        highestTime: participation.time,
        debuggingScore : "Under Evaluation",
        totalScore: calculateScore(participation),
      };
    });

    setData(leaderboardData);
  }, [participations, participants]);

  // Define the columns for the leaderboard table
  const columns = [
    {
      title: 'Participant',
      dataIndex: 'participant',
      key: 'participant',
      render: (participant) => (
        <div>
          <Avatar src={participant.avatar} alt="Avatar" />
          <span>{participant.username}</span>
        </div>
      ),
    },
    {
      title: 'Problem Score',
      dataIndex: 'problemScore',
      key: 'problemScore',
    },
    {
      title: 'Question Score',
      dataIndex: 'questionScore',
      key: 'questionScore',
    },
    
    {
      title: 'Highest Time',
      dataIndex: 'highestTime',
      key: 'highestTime',
    },
    {
      title: 'Total Score',
      dataIndex: 'totalScore',
      key: 'totalScore',
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default CompetitionLeaderboard;
