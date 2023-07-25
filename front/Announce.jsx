import { Col, Descriptions, Row, Typography } from 'antd';
import React from 'react';

const { Text, Title } = Typography;

function Announce({ announce }) {
  return (
    <Row gutter={[16, 16]} align="middle" style={{backgroundColor: "#F5F5F5"}}>
      <Col span={10}>
        <img src={announce.cover} alt="Announce Cover" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
      </Col>
      <Col span={14} >
        <div style={{ paddingLeft: '16px' }}>
          <Title level={4}>{announce.title}</Title>
          <Descriptions>
            <Descriptions.Item>
              <Text>{announce.description}</Text>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Col>
    </Row>
  );
}

export default Announce;
