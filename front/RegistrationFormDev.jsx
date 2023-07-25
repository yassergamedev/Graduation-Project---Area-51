import { useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Divider, Select } from 'antd';
import ImageUploader from './ImageUploader';
const { Option } = Select;
const RegistrationFormDev = ({user,request, onChangeType, onChangeUniversity,
  onChangeWilaya,
  onChangeMajor,
  onChangeSpeciality,
  onChangeRecoveryQuestion,
  onChangeRecoveryResponse,
  onChangeLevel, 
  onChangeGradYear,onChangeImage
}) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState('')
  const [type, setType] = useState('Independent');
  const [wilaya, setWilaya] = useState(user.wilaya);
  const [university, setUniversity] = useState(user.university);
  const [major, setMajor] = useState(user.major);
  const [level, setLevel] = useState(user.level);
  const [speciality, setSpeciality] = useState(user.speciality);
  const [gradYear, setGradYear] = useState(user.gradYear)
  const [recoveryQuestion, setRecoveryQuestion] = useState(user.recoveryQuestion);
  const [recoveryResponse, setRecoveryResponse] = useState(user.recoveryResponse);


  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    onChangeType(selectedType)
  };
  const handleWilayaChange = (selectedType) => {
    setWilaya(selectedType);
    onChangeWilaya(selectedType)
  };
  
  const handleImageChange = (value) => {
    setImage(value);
    onChangeImage(value);
  };
  const handleUniversityChange = (value) => {
    setUniversity(value);
    onChangeUniversity(value)
  };
  const handleSpecialtyChange = (event) => {
    setSpeciality(event.target.value);
    onChangeSpeciality(speciality)
  };


  const handleMajorChange = (event) => {
    setMajor(event.target.value);
    onChangeMajor(event.target.value)
  };

  const handleLevelChange = (value) => {
    setLevel(value);
    onChangeLevel(value)
  };

  const handleSpecialityChange = (value) => {
    setSpeciality(value);
    onChangeSpeciality(value)
  };

  const handleChangeRecoveryQuestion = (event) => {
    setRecoveryQuestion(event.target.value);
    onChangeRecoveryQuestion(event.target.value);
  };

  const handleChangeRecoveryResponse = (event) => {
    setRecoveryResponse(event.target.value);
    onChangeRecoveryResponse(event.target.value);
  };

  const handleChangeGrad = (value) => {
  
    setGradYear(value);  // Set the gradYear to the extracted year
    onChangeGradYear(value);  // Call the onChangeGradYear function with the extracted year
  };

  const universities = [
    'Abbes Laghrour University Khenchela',
    'Abdelhamid Ibn Badis University Mostaganem',
    'Abdelhamid Mehri Constantine 2 University',
    'Abou Bekr Belkaïd University Tlemcen',
    'Ahmed Ben Bella University Oran 1',
    'Ahmed Draia University Adrar',
    'Ahmed Zabana University Relizane',
    'Ain El Hadjadj M\'hamed Bougara University',
    'Ain Shams University',
    'Ain Témouchent University',
    'Akli Mohand Oulhadj University Bouira',
 
    'Algiers 2 University',
    'Algiers 3 University',
    'Annaba University',
    'Arab Academy for Science, Technology & Maritime Transport',
    'Badji Mokhtar University',
    'Batna 1 University',
    'Batna 2 University',
    'Bechar University',
    'Bejaia University',
    'Biskra University',
    'Blida 1 University',
    'Blida 2 University',
    'Boumerdès University',
    'Bouzareah University',
    'Central University',
    'Chlef University',
    'Djelfa University',
    'Dr. Yahia Fares University Medea',
    'Ecole Nationale Supérieure des Mines de Rabat',
    'Ecole Nationale Supérieure en Sciences de l\'Informatique',
    'Ecole Nationale Supérieure en Statistique et en Economie Appliquée',
    'Ecole Normale Supérieure de Bouzaréah',
    'Ecole Normale Supérieure de Constantine',
    'Ecole Normale Supérieure de Laghouat',
    'Ecole Normale Supérieure de Setif',
    'Ecole Normale Supérieure de Tizi Ouzou',]


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const renderAcademicForm = () => {
    if (type === 'Academic') {
      return (
        <>
             <Divider>Profile Image</Divider>
<center><ImageUploader onChangeImage={handleImageChange}/></center>

          <Divider>University : </Divider>
          <Form.Item
        name="university"

        rules={[
          {
            required: true,
            message: 'Please select your university!',
          },
        ]}
      >
        <Select value={university} onChange={handleUniversityChange} placeholder="Select university">
          {universities.map((university) => (
            <Option key={university} value={university}>
              {university}
            </Option>
          ))}
        </Select>
      </Form.Item>    <Divider>Wilaya of Residence : </Divider>
          <Select onChange={handleWilayaChange} style={{width : "100%"}}>
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
            <Input  value={major} onChange={handleMajorChange} />
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
          <Divider>Graduation Year: </Divider>
          <Form.Item
            name="graduationYear"

            rules={[
              {
                required: true,
                message: 'Please input your graduation year!',
              },
            ]}
          >
            <DatePicker value={gradYear} onChange={handleChangeGrad} picker="year" style={{ width: '100%' }} />
            {request === 'post' && (<>
            <Divider>Account Recovery Question:</Divider>
            <Form.Item name="website" >
              <Input name={recoveryQuestion} value={recoveryQuestion} onChange={handleChangeRecoveryQuestion} />
              <Divider>Account Recovery Response:</Divider>
            </Form.Item>
            <Form.Item name="website" >
              <Input name={recoveryResponse} value={recoveryResponse} onChange={handleChangeRecoveryResponse} />
            </Form.Item>
          </>)}
          </Form.Item>
        </>
      );
    } else{
      return (<>
           <Divider>Profile Image</Divider>
<center><ImageUploader onChangeImage={handleImageChange}/></center>

        <Divider>Wilaya : </Divider>
          <Select onChange={handleWilayaChange} style={{width : "100%"}}>
            {Array.from({ length: 58 }, (_, index) => (
              <Select.Option key={index + 1} value={index + 1}>
                {index + 1}
              </Select.Option>
            ))}
          </Select></>
      )
    }

    return null;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          width: '400px',
          border: '1px solid #ccc',
          padding: '20px',
        }}
      >
        <Divider>Type: </Divider>
        <Form.Item
          name="type"

          rules={[
            {
              required: true,
              message: 'Please select a type!',
            },
          ]}
        >
          <select onChange={(e) => handleTypeChange(e.target.value)}>
            <option value="Independent">Independent</option>
            <option value="Academic">Academic</option>
          </select>
        </Form.Item>

        {renderAcademicForm()}




      </Form>
    </div>
  );
};

export default RegistrationFormDev;
