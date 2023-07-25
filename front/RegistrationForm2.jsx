import { useState } from 'react';
import { Form, Input, Button } from 'antd';

const RegistrationForm2 = ({code, sendCode, handleNext}) => {
  const [form] = Form.useForm();
  const [cd, setCd] = useState(0)
  const [verificationCodeSent, setVerificationCodeSent] = useState(true); // Set to true if code has been sent

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const handleResendCode = () => {
    
    setVerificationCodeSent(true);
  };
  const verifyCode = (value)=>{

    if(code === cd)
    {
        handleNext()
    }
  }
  const handleCDchange = (event)=>{
    console.log(event.target.value)
        setCd(event.target.value)
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      
      <Form form={form} name="register" onFinish={onFinish}>
      <h3>We have sent you a verification code to your email. Please enter it here:</h3>
        <Form.Item
          name="verificationCode"
          label="Verification Code"
          rules={[
            {
              required: true,
              message: 'Please enter the verification code!',
            },
          ]}
        >
          <Input name={cd} value={cd} onChange={handleCDchange} />
        </Form.Item>

        <Form.Item>
        <button className="next-button" onClick={verifyCode} >
            Verify
          </button>
        </Form.Item>
      </Form>

      {!verificationCodeSent && (
        <div style={{ textAlign: 'center' }}>
           <button className="next-button" >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm2;
