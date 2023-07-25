import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Modal, Row,Button,Tabs, Skeleton, Switch, Tag, Input } from 'antd';
import { useEffect, useState } from 'react';
import PlanificationWindow from './PlanificationWindow';
import { Link, useParams } from 'react-router-dom';
import DomaineSelector from './DomaineSelector';

const { Meta } = Card;

const CompetitionList = ({ usern }) => {
  const [user, setUser] = useState(usern);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
const [selectedTab, setSelectedTab] = useState('description');
const { TabPane } = Tabs;
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
 // Check if the problem ID is present in the problems array
      })
      .catch((error) => console.error(error));
  }, [usern]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [competitions, setCompetitions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

const showModal=(competition)=> {
    setSelectedCompetition(competition);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleReadMore = (competition) => {
    setSelectedCompetition(competition);
    setIsReadModalOpen(true);
  };
  

const renderDescriptionTab = () => {
  return (
    <div dangerouslySetInnerHTML={{ __html: selectedCompetition?.description || ''}}></div>
  );
};

const renderCriteriaTab = () => {
  return (
    <div dangerouslySetInnerHTML={{ __html: selectedCompetition?.judgingCriteria || '' }}></div>
  );
};

  
useEffect(() => {
  fetch('http://localhost:3000/competitions')
    .then((response) => response.json())
    .then((data) => {
      const activeCompetitions = data.filter((competition) =>
        competition.competitionStatus === 'active' &&
        competition.title.toLowerCase().includes(searchValue.toLowerCase()) &&
        (filterValue === "" || competition.domains.includes(filterValue))
      );
      setCompetitions(activeCompetitions);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching competitions:', error);
    });
}, [searchValue, filterValue]);


  function handleParticipateSolo() {
    // Make PATCH request to update competition participants
    let part = selectedCompetition.participants;
    part = [...selectedCompetition.participants, user._id];
  
    // Update the user's competitions attribute
    let userCompetitions = user.competitions;
    userCompetitions = [...user.competitions, selectedCompetition._id];
  
    // Update both the competition participants and the user
    Promise.all([
      fetch(`http://localhost:3000/competitions/${selectedCompetition._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participants: part,
        }),
      }),
      fetch(`http://localhost:3000/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          competitions: userCompetitions,
        }),
      }),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(([competitionData, userData]) => {
        console.log('User added to competition participants:', competitionData);
        console.log('Competition added to user:', userData);
        setSelectedCompetition(null);
      })
      .catch((error) => {
        console.error('Error updating competition participants and user:', error);
      });
  }
  

  const handleParticipateTeam = () => {
    // Perform necessary logic to choose teammates and update competition participants
    // ...
    // After choosing teammates, make PATCH request to update competition participants
    fetch(`http://localhost:3000/competitions/${selectedCompetition._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        participants: [...selectedCompetition.participants, user.id, ...selectedTeam],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('User and teammates added to competition participants:', data);
        setSelectedCompetition(null);
        setSelectedTeam(null);
      })
      .catch((error) => {
        console.error('Error updating competition participants:', error);
      });
  };
  function truncateDescription(description, maxLength) {
    if (!description) return '';
  
    const descriptionElement = document.createElement('div');
    descriptionElement.innerHTML = description;
    const descriptionString = descriptionElement.textContent || descriptionElement.innerText;
  
    return descriptionString.substring(0, maxLength);
  }
  

  return (
    <>
    <Input
  placeholder="Search by title"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  style={{ marginBottom: 16 }}
/>
<DomaineSelector doms={[]} onChange={setFilterValue} />

      <Row gutter={[16, 16]}>
        {competitions.map((competition) => (
          <Col key={competition._id} span={12} lg={8}>
            <Card
              style={{
                marginTop: 16,
              }}
              cover={
                <img
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                  }}
                  alt="example"
                  src={competition.image}
                />
              }
             
            >
              <Skeleton loading={loading} avatar active>
                <Meta
                  title={competition.title}
                  description={
                    truncateDescription(competition.description, 100) 
                  }
                  
                  
                  
                  
                  style={{ marginBottom: 14 }}
                ></Meta>
                <div>
                  Domains:
                  {competition.domains.slice(1).map((domain) => (
                    <Tag key={domain} color="blue">
                      {domain}
                    </Tag>
                  ))}
                </div>
               
                Date:{' '}
                {competition.date != null ? (
                  <>
 <Tag color="purple">{new Date(competition.date[0]).toLocaleString()}</Tag>
<Tag color="purple">{new Date(competition.date[1]).toLocaleString()}</Tag>

                  </>
                ) : (
                  <>
                    <Tag color="purple">Pending</Tag>
                    <Tag color="purple">Pending</Tag>
                  </>
                )}
                <div>
                  Coins:<Tag color="orange"> {competition.coins}</Tag>{' '}
                </div>
                <div>
                  Status:
                  <Tag color={competition.competitionStatus === 'pending' ? 'red' : 'green'}>
                    {' '}
                    {competition.competitionStatus}
                  </Tag>{' '}
                </div>
                
                {competition.competitionType === 'solo' && (
    <button onClick={() => showModal(competition)}>Apply</button>
  )}
  {competition.competitionType === 'team' && (
    <button onClick={() => showModal(competition)}>Apply</button>
  )}
  <Button onClick={() => handleReadMore(competition)}>Read More</Button>

              </Skeleton>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal title="Participate in Competition" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {selectedCompetition && selectedCompetition.competitionType === 'team' && (
          <div>
            {/* Logic to choose teammates */}
            {/* ... */}
            {/* Example of teammate selection */}
            <div>
              <h3>Choose teammates:</h3>
              {/* Render teammate selection UI */}
              {/* ... */}
              {/* Example selection */}
              <div>
                <input
                  type="checkbox"
                  checked={selectedTeam.includes('teammate1')}
                 
                />
                <label>Teammate 1</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={selectedTeam.includes('teammate2')}
                  
                />
                <label>Teammate 2</label>
              </div>
              {/* ... */}
            </div>
            <button onClick={handleParticipateTeam}>Participate</button>
          </div>
        )}
        {selectedCompetition && selectedCompetition.competitionType === 'solo' && (
          <div>
            <p>Would you like to participate in this competition?</p>
            <button onClick={handleParticipateSolo}>Yes</button>
          </div>
        )}
      </Modal>
      <Modal
  title="Competition Details"
  visible={isReadModalOpen}
  onOk={()=>setIsReadModalOpen(false)}
  onCancel={()=>setIsReadModalOpen(false)}
  style={{width : '600px'}}
>
  <Tabs activeKey={selectedTab} onChange={(key) => setSelectedTab(key)}>
    <TabPane tab="Description" key="description">
      {renderDescriptionTab()}
    </TabPane>
    <TabPane tab="Judging Criteria" key="criteria">
      {renderCriteriaTab()}
    </TabPane>
  </Tabs>
</Modal>

    </>
  );
};

export default CompetitionList;
