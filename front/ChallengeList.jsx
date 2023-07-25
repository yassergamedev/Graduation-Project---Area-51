import React, { useState, useEffect } from "react";
import { Radio, Col, List, Row, Tag, Input, Popover } from "antd";
import { useParams } from "react-router-dom";

const ChallengeList = ({ usern, onChangeSelected }) => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState({})
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [user, setUser] = useState(usern)
  const {id} = useParams()
  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        
        const competitionPromises = data.competitions_created.map((competition) =>
          fetch(`http://localhost:3000/competitions/${competition}`)
            .then((res) => res.json())
            .catch((error) => console.error(error))
        );
  
        Promise.all(competitionPromises)
          .then((competitionData) => {
            setChallenges(competitionData);
            setFilteredChallenges(competitionData)
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, [id]);
  

  const handleSelectChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    onChangeSelected(challenge);
  };

  const handleSearch = (value) => {
    const filtered = challenges.filter((challenge) =>
      challenge.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredChallenges(filtered);
  };

  return (
    <div>
      <Input.Search
        placeholder="Search challenges"
        onSearch={handleSearch}
        style={{ marginBottom: "16px" }}
      />
  
      <List
        bordered
        dataSource={filteredChallenges}
        renderItem={(challenge) => (
          <List.Item key={challenge._id}>
            <Row justify="start" gutter={16} align="middle">
              <Col span={2}>
                <Radio
                  value={challenge._id}
                  checked={selectedChallenge === challenge}
                  onChange={() => handleSelectChallenge(challenge)}
                />
              </Col>
              <Col span={10}>
                <div>
                  <h4>{challenge.title}</h4>
                  <p>Design: {challenge.design}</p>
                </div>
              </Col>
              <Col span={4}>
                {challenge.domains.slice(0, 1).map((domain) => (
                  <Tag key={domain} color="blue">
                    {domain}
                  </Tag>
                ))}
                {challenge.domains.length > 1 && (
                  <Popover
                    placement="bottom"
                    content={
                      <>
                        {challenge.domains.slice(1).map((domain) => (
                          <Tag key={domain} color="blue">
                            {domain}
                          </Tag>
                        ))}
                      </>
                    }
                  >
                    <Tag color="blue">+{challenge.domains.length - 1} more</Tag>
                  </Popover>
                )}
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
  
  
};

export default ChallengeList;
