import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav0 from './Home/Nav0';
import {
  Nav00DataSource,

} from './Home/data.source';

import './styles/login.css'
const Login = ({ onChangeU }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();
  const history = useNavigate(); // Corrected: useNavigate()

  function navigate() {
    switch (user.role) {
      case 'developer':
        history(`/dashboard/developer/${user._id}`);
        break;
      case 'recruiter':
        history(`/dashboard/recruiter/${user._id}`);
        break;
      case 'analyst':
        history(`/dashboard/analyst/${user._id}`);
        break;
      case 'instructor':
        history(`/dashboard/instructor/${user._id}`);
        break;
      case 'admin':
        history(`/dashboard/admin/${user._id}`);
        break;
      default:
        alert('Wrong password or email');
    }
  }

  const onFinish = () => {
    const credentials = {
      email: email,
      password: password
    };

    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Login successful') {
          setUser(data.user);

          onChangeU(user);
          navigate(); // Corrected: navigate instead of Navigate()
        } else {
          alert('wrong email or password');
        }
        console.log('Received data:', data);
      })
      .catch(error => console.error(error));
  };

  return (
    <>
     <Nav0 id="Nav0_0" key="Nav0_0" dataSource={Nav00DataSource} />

      <div className="login-page">
        <div className="login-form-container">
         
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <h2>Login</h2>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!'
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link  to='/forgotpassword'>
                Forgot password
                </Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <Link to='/register'>register now!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
