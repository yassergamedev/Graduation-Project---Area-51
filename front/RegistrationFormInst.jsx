import { useState } from 'react';
import { Form, Input, Button, Upload, Select, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImageUploader from './ImageUploader';
const { Option } = Select;
const RegistrationFormInst = ({
  user,
  onChangeResume,
  request,
  onChangeUniversity,
  onChangeWilaya,
  onChangeMajor,
  onChangeSpeciality,
  onChangeRecoveryQuestion,
  onChangeRecoveryResponse,
  onChangeLevel,
  onChangeImage
}) => {
  const [image, setImage] = useState('')
  const [resumeFile, setResumeFile] = useState(null);
  const [domains, setDomains] = useState(user.domains || ['']);
  const [speciality, setSpeciality] = useState(user.speciality);
  const [wilaya, setWilaya] = useState(user.wilaya);
  const [recoveryQuestion, setRecoveryQuestion] = useState('');
  const [recoveryResponse, setRecoveryResponse] = useState('');
  const [university, setUniversity] = useState(user.university);
  const [major, setMajor] = useState(user.major);
  const [level, setLevel] = useState(user.level);
  const handleImageChange = (value) => {
    setImage(value);
    onChangeImage(value);
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const handleResumeUpload = (file) => {
    console.log(file)
    setResumeFile(file);
    onChangeResume(file)
  };
  const handleWilayaChange = (selectedType) => {
    setWilaya(selectedType);
    onChangeWilaya(selectedType)
  };
  const handleChangeRecoveryQuestion = (event) => {
    setRecoveryQuestion(event.target.value);
    onChangeRecoveryQuestion(recoveryQuestion);
  };

  const handleChangeRecoveryResponse = (event) => {
    setRecoveryResponse(event.target.value);
    onChangeRecoveryResponse(recoveryResponse);
  };

  const handleUniversityChange = (event) => {
    setUniversity(event.target.value);
    onChangeUniversity(event.target.value)
  };
  const handleSpecialtyChange = (event) => {
    setSpeciality(event.target.value);
    onChangeSpeciality(event.target.alue)
  };


  const handleMajorChange = (event) => {
    setMajor(event.target.value);
    onChangeMajor(event.target.value)
  };

  const handleLevelChange = (value) => {
    setLevel(value);
    onChangeLevel(value)
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form name="register" onFinish={onFinish}>
        <Divider>Profile Image</Divider>
        <center><ImageUploader onChangeImage={handleImageChange} /></center>

        <Divider>University : </Divider>

        <Form.Item
          name="university"

          rules={[
            {
              required: true,
              message: 'Please input your university!',
            },
          ]}
        >


          <Input value={university} onChange={handleUniversityChange} />
        </Form.Item>
        <Divider>Wilaya : </Divider>
        <Select onChange={handleWilayaChange} style={{ width: "100%" }}>
          {Array.from({ length: 58 }, (_, index) => (
            <Select.Option key={index + 1} value={index + 1}>
              {index + 1}
            </Select.Option>
          ))}
        </Select>
        <Divider>Major: </Divider>

        <Form.Item
          name="major"

          rules={[
            {
              required: true,
              message: 'Please input your major!',
            },
          ]}
        >
          <Input value={major} onChange={handleMajorChange} />
        </Form.Item>
        <Divider>Specialty: </Divider>
        <Form.Item
          name="specialty"

          rules={[
            {
              required: true,
              message: 'Please input your specialty!',
            },
          ]}
        >
          <Input value={speciality} onChange={handleSpecialtyChange} />
        </Form.Item>
        <Divider>Level: </Divider>
        <Form.Item
          name="level"

          rules={[
            {
              required: true,
              message: 'Please input your level!',
            },
          ]}
        >
          <Select

            placeholder="Please select Your Level"
            style={{ width: '100%' }}
            onChange={handleLevelChange}
          >

            <Option value="License">
              License
            </Option>
            <Option value="Master">
              Master
            </Option>
            <Option value="Phd">
              PHD
            </Option>

          </Select>
        </Form.Item>
        <Divider>Resume : </Divider>
        <Form.Item name="resume" >
          <Upload beforeUpload={() => false} onChange={(info) => handleResumeUpload(info.file)}>
            <Button icon={<UploadOutlined />} disabled={resumeFile !== null}>
              Upload Resume (PDF)
            </Button>
          </Upload>
        </Form.Item>
        {request !== 'patch' && (<>
        <Divider>Account Recovery Question:</Divider>
        
          <Form.Item name="website">
            <Input label value={recoveryQuestion} onChange={handleChangeRecoveryQuestion} />
          </Form.Item>
        
          <Divider>Account Recovery Response:</Divider>
          <Form.Item >
            <Input value={recoveryResponse} onChange={handleChangeRecoveryResponse} />
          </Form.Item></>
        )}



      </Form>
    </div>
  );
};

export default RegistrationFormInst;
