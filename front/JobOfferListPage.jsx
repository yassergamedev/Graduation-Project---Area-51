import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Avatar, Button, Tag, Modal } from 'antd';
import { useHistory, useNavigate, useParams } from 'react-router-dom';

const JobOfferListPage = ({ usern }) => {
  const [jobOffers, setJobOffers] = useState([]);
  const [user, setUser] = useState(usern);
  const [selectedJobOffer, setSelectedJobOffer] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [notEnoughCoinsModalVisible, setNotEnoughCoinsModalVisible] = useState(false);
  const {id} = useParams()
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const renderDescriptionTab = () => {
    return (
      <div dangerouslySetInnerHTML={{ __html: selectedJobOffer?.description || ''}}></div>
    );
  };
  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch((error) => console.error(error));},[])
 
  const history = useNavigate();

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await fetch('http://localhost:3000/job-offers');
        const jobOffersData = await response.json();

        const updatedJobOffers = [];
        for (const jobOffer of jobOffersData) {
          const creatorResponse = await fetch(`http://localhost:3000/users/${jobOffer.creator}`);
          const creatorData = await creatorResponse.json();

          const updatedJobOffer = {
            ...jobOffer,
            creator: {
              ...creatorData,
              company: jobOffer.coins ? jobOffer.company : null
            }
          };
          updatedJobOffers.push(updatedJobOffer);
        }

        setJobOffers(updatedJobOffers);
      } catch (error) {
        console.error('Error fetching job offers:', error);
      }
    };

    fetchJobOffers();
  }, []);

  const handleApply = (jobOffer) => {
    if (jobOffer.coins > user.coins) {
      setNotEnoughCoinsModalVisible(true);
    } else {
      setSelectedJobOffer(jobOffer);
      setConfirmModalVisible(true);
    }
  };

  const handleConfirmApply = () => {
    // Update user's coins
    const updatedCoins = user.coins - selectedJobOffer.coins;
    setUser((prevUser) => ({
      ...prevUser,
      coins: updatedCoins
    }));
  
    // Close the modal
    setConfirmModalVisible(false);
  
    // Update user data on the server
    fetch(`http://localhost:3000/users/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        job_offers: [...user.job_offers, selectedJobOffer.id],
        coins: updatedCoins
      })
    })
      .then((response) => response.json())
      .then((data) => {
        // Navigate to 'joboffchallenge' route
       
        history(`/dashboard/developer/${id}/competition/${selectedJobOffer.challenge}/${selectedJobOffer._id}`)
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };
  
  const handleReadMore = (jobOffer)=>{
    setSelectedJobOffer((prevJobOffer)=>{
      return jobOffer
    })
    setIsReadModalOpen(true)
  }

  const handleCancelApply = () => {
    setConfirmModalVisible(false);
  };

  const MAX_DESCRIPTION_LENGTH = 100;

  return (
    <div>
      <h1>Job Offers</h1>
      {jobOffers.map((jobOffer) => (
        <Card key={jobOffer.id} style={{ marginBottom: '16px' }}>
          <Row>
            <Col span={8}>
              <div style={{ width: '200px', height: '200px' }}>
                <img
                  src={jobOffer.image}
                  alt="Job Offer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </Col>
            <Col span={14} style={{ paddingLeft: '16px' }}>
              <h2>{jobOffer.title}</h2>
              <p>
                <strong>Domains: </strong>
                {jobOffer.domains.map((domain) => (
                  <Tag color="blue" key={domain}>
                    {domain}
                  </Tag>
                ))}
              </p>
              <p>
                <strong>Company: </strong>
                <Tag color="red">{jobOffer.creator.company}</Tag>
              </p>
              <p>
                <strong>Coins: </strong>
                <Tag color="orange">{jobOffer.coins}</Tag>
              </p>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                <Avatar src={jobOffer.creator.avatar} />
                <span style={{ marginLeft: '8px' }}>{jobOffer.creator.username}</span>
              </div>
            </Col>
            <Col
              span={2}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button
                type="primary"
                style={{ marginBottom: '8px' }}
                onClick={() => handleApply(jobOffer)}
              >
                Apply
              </Button>
              <Button onClick={()=>handleReadMore(jobOffer)}>Read More</Button>
            </Col>
          </Row>
        </Card>
      ))}

      <Modal
        title="Confirm Application"
        visible={confirmModalVisible}
        onOk={handleConfirmApply}
        onCancel={handleCancelApply}
      >
        <p>
          Are you sure you want to apply to "{selectedJobOffer?.title}"? This will cost you{' '}
          {selectedJobOffer?.coins} coins.
        </p>
      </Modal>

      <Modal
        title="Not Enough Coins"
        visible={notEnoughCoinsModalVisible}
        onCancel={() => setNotEnoughCoinsModalVisible(false)}
      >
        <p>You don't have enough coins to apply for this job offer.</p>
      </Modal>
      <Modal
  title="Job Offer Details"
  visible={isReadModalOpen}
  onOk={()=>setIsReadModalOpen(false)}
  onCancel={()=>setIsReadModalOpen(false)}
  style={{width : '600px'}}
>
  
      {renderDescriptionTab()}
    
</Modal>
    </div>
  );
};

export default JobOfferListPage;
