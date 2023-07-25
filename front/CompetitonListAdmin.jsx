import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Modal, Row, Skeleton, Switch, Tag } from 'antd';
import { useEffect, useState } from 'react';
import PlanificationWindow from './PlanificationWindow';
import { Link, useParams } from 'react-router-dom';

const { Meta } = Card;

const CompetitionList = () => {
  const [loading, setLoading] = useState(true);
  const [competitions, setCompetitions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCompetition, setSelectedCompetition] = useState(null);

const {id} = useParams()
  const showModal = (competition) => {
    setSelectedCompetition(competition)
    setIsModalOpen(true);

  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch('http://localhost:3000/competitions')
      .then((response) => response.json())
      .then((data) => {
        setCompetitions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching competitions:', error);
      });
  }, []);

  const onChange = (checked) => {
    setLoading(!checked);
  };
 
 

  const onOk = () => {
    // Make PATCH request to update competition status to active
    fetch(`http://localhost:3000/competitions/${selectedCompetition._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        competitionstatus: 'active',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Competition status updated successfully:', data);
 
        setSelectedCompetition(null);
      })
      .catch((error) => {
        console.error('Error updating competition status:', error);
      });
  };

  return (
    <>
      <Row gutter={[16, 16]}>
      {competitions
        .filter((competition) => competition.competitionStatus === 'pending')
        .map((competition) => (
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
              actions={[
                <SettingOutlined key="setting" onClick={() => showModal(competition)} />,
                
              ]}
            >
              <Skeleton loading={loading} avatar active>
                <Meta
                  title={competition.title}
                  description={
                    <div dangerouslySetInnerHTML={{ __html: competition.description.substring(0, 100) }}></div>
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
                <div>
                  Preferred Date:{' '}
                  <>
                    <Tag color="blue">{competition.prefferredDate[0]}</Tag>
                    <Tag color="blue">{competition.prefferredDate[1]}</Tag>
                  </>
                </div>
                Date : 
                {
                    competition.date !=null? <>
                    <Tag color="purple">{competition.date[0]}</Tag>
                    <Tag color="purple">{competition.date[1]}</Tag>
                  </> : <>
                    <Tag color="purple">Pending</Tag>
                    <Tag color="purple">Pending</Tag>
                  </>
                }
                <div>
                  Coins:<Tag color="orange"> {competition.coins}</Tag>{' '}
                </div>
                <div>
                  Status:<Tag color={competition.competitionStatus === 'pending'? "red":"green" }> {competition.competitionStatus}</Tag>{' '}
                </div>
                <div>
                <Link to={`/dashboard/admin/${id}/competition/${competition._id}`}>See Preview </Link>
                </div>
              </Skeleton>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <PlanificationWindow competition={selectedCompetition} />
      </Modal>
     
      
    </>
  );
};

export default CompetitionList;
