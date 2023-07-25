import { useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Divider } from 'antd';

const RegistrationForm1 = ({
  user,
  onChangeUsername,
  onChangeFirstname,
  onChangeLastname,
  onChangeEmail,
  onChangePassword,
  onChangeBirthdate,
  onChangeNumber
}) => {

  const [username, setUsername] = useState(user.username|| "");
  const [birthdate, setBirthdate] = useState(null);
  const [firstname, setFirstname] = useState(user.firstname || "");
  const [lastname, setLastname] = useState(user.lastname|| "");
  const [email, setEmail] = useState(user.email|| "");
  const [password, setPassword] = useState(user.password|| "");
  const [number, setNumber] = useState(user.number|| "");

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
    onChangeUsername(event.target.value);
  };
  const handleBirthdate = (value) => {
      setBirthdate(value)
      onChangeBirthdate(value)
    }


  const handleChangeFirstname = (event) => {
    setFirstname(event.target.value);
    onChangeFirstname(event.target.value);
  };

  const handleChangeLastname = (event) => {
    setLastname(event.target.value);
    onChangeLastname(event.target.value);
  };
  const validateNumber = (_, value) => {
    if (value && !/^(05|06|07|03)/.test(value)) {
      return Promise.reject(new Error('Enter a valid number.'));
    }
    return Promise.resolve();
  };

  
  const handleChangeEmail = (event) => {
    
    setEmail(event.target.value);

    onChangeEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    onChangePassword(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNumber(event.target.value);
    onChangeNumber(event.target.value);
  };


  const onFinish = (events) => {
    console.log('Received events of form: ', events);
  };

  return (
    <Form
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div


        onFinish={onFinish}
        style={{
          width: '400px',
       
          padding: '20px',
        }}
      >
        <Divider>Email: </Divider>
        <Form.Item

        
rules={[
  {
    required: true,
    message: 'Please input your email!',
  },
]}
>
      <Input name={email} value={email} onChange={handleChangeEmail} type='email'/>
</Form.Item>

      <Divider>First Name: </Divider>
      
        <Input value={firstname} name={firstname} onChange={handleChangeFirstname}/>
   
      <Divider>Last Name: </Divider>
      <Form.Item

        value
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
          },
        ]}
      >
        <Input value={lastname} name={lastname} onChange={handleChangeLastname} />

      </Form.Item>
      <Divider>Username: </Divider>
      <Form.Item


        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input value={username} name={username} onChange={handleChangeUsername} />

      </Form.Item>
      <Divider>Password: </Divider>
      <Form.Item


        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password  name={password} onChange={handleChangePassword} />

      </Form.Item>
      <Divider>Confirm Password:</Divider>
      <Form.Item
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || password === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
        name="confirmPassword"
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>


      <Divider>Birthdate : </Divider>
      <Form.Item


        rules={[
          {
            required: true,
            message: 'Please input your birthdate!',
          },
        ]}
      >
        <DatePicker name={birthdate} value={birthdate} onChange={handleBirthdate} style={{ width: '100%' }} />
      </Form.Item>
      <Divider>Number: </Divider>
      <Form.Item
        name="number"
        
      
        rules={[
          {
            required: true,
            message: 'Please input your number!',
          },
          {
            validator: validateNumber,
          },
        ]}
      >
        <Input type="number" value={number} style={{ width: '100%' }} />
      </Form.Item>

  
    </div>
    </Form>
  );
};

export default RegistrationForm1;
