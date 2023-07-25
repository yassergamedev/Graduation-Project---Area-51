import { Card, Space, Typography } from 'antd';
import devImage from './pics/dev.png';
import instImage from './pics/inst.png';
import compImage from './pics/comp.jpg';

const {Title} = Typography
function RegistrationForm3({onChangeRole,handleNext}) {
 
  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <Title level={3}>Please Choose Your Role</Title>

      <Card
        hoverable
        style={{ marginBottom: '16px' }}
        onClick={() =>{
            onChangeRole('developer')
            handleNext()}}
      >
        <Card.Meta
          avatar={<img src={devImage} alt="Developer" style={{ width: '64px', height: '64px' }} />}
          title="Developer"
          description="Click to select Developer role"
        />
      </Card>

      <Card
        hoverable
        style={{ marginBottom: '16px' }}
        onClick={() => {
            onChangeRole('instructor')
            handleNext()}}
      >
        <Card.Meta
          avatar={<img src={instImage} alt="Instructor" style={{ width: '64px', height: '64px' }} />}
          title="Instructor"
          description="Click to select Instructor role"
        />
      </Card>

      <Card
        hoverable
        style={{ marginBottom: '16px' }}
        onClick={() =>  {
            onChangeRole('recruiter')
            handleNext()}}
      >
        <Card.Meta
          avatar={<img src={compImage} alt="Company Recruiter" style={{ width: '64px', height: '64px' }} />}
          title="Company Recruiter"
          description="Click to select Company Recruiter role"
        />
      </Card>
    </div>
  );
}

export default RegistrationForm3;
