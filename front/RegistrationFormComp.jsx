import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DomaineSelector from './DomaineSelector';
import CompanySelector from './CompanySelector';
import ImageUploader from './ImageUploader';

const { Option } = Select;

const RegistrationFormComp = ({user,request, onChangeCompany,onChangeCertificateFile,
    onChangeCertificate,
    onChangeSite,
    onChangeRecoveryQuestion,
    onChangeRecoveryResponse, 
onChangeImage}) => {
  const [company, setCompany] = useState(user.company)
  const [image, setImage] = useState(user.image)
  const [certificate, setCertificate] = useState(null)
  const [site, setSite] = useState(user.site);
  const [recoveryQuestion, setRecoveryQuestion] = useState(user.recoveryQuestion);
  const [recoveryResponse, setRecoveryResponse] = useState(user.recoveryResponse);

 

  const handleCompany = (event) => {
    setCompany(event.target.value);
    onChangeCompany(event.target.value);
  };


const handleCertificate = (value) => {
  setCertificate(value);
  onChangeCertificate(value);
};

const handleChangeSite = (event) => {

  setSite(event.target.value);
  onChangeSite(event.target.value);
};

const handleChangeRecoveryQuestion = (event) => {
  setRecoveryQuestion(event.target.value);
  onChangeRecoveryQuestion(event.target.value);
};

const handleChangeRecoveryResponse = (event) => {

  setRecoveryResponse(event.target.value);
  onChangeRecoveryResponse(event.target.value);
};


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const handleCertificateUpload = (file) => {
    setCertificate(file);
    onChangeCertificate(file)
  };
  const handleImageChange = (value) => {
    setImage(value);
    onChangeImage(value);
  };
  

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form  name="register" onFinish={onFinish}>
      <Divider>Profile Image</Divider>
<center><ImageUploader onChangeImage={handleImageChange}/></center>
<Divider>Company</Divider>
<Input value={company}  onChange={handleCompany} />
     

        <Divider>Website</Divider>
        <Form.Item name="website"  rules={[{ required: true, message: 'Please input your website!' }]}>
        <Input value={site} onChange={handleChangeSite} />
 </Form.Item>
 <Divider>Company Certificate</Divider>
        <Form.Item name="certificate" >
          <Upload beforeUpload={() => false} onChange={(info) => handleCertificateUpload(info.file)}>
            <Button icon={<UploadOutlined />} disabled={certificate !== null}>
              Upload Certificate (PDF)
            </Button>
          </Upload>
        </Form.Item>
        
        {request === "post" && (
  <>
  <Divider>Account Recovery Question:</Divider>
    <Form.Item>
      <Input label value={recoveryQuestion} onChange={handleChangeRecoveryQuestion} />
      <Divider>Account Recovery Response:</Divider>
    </Form.Item>
    <Form.Item>
      <Input value={recoveryResponse} onChange={handleChangeRecoveryResponse} />
    </Form.Item>
  </>
)}

       
      </Form>
    </div>
  );
};

export default RegistrationFormComp;
