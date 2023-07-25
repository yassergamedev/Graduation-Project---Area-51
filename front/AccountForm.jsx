import React, { useState } from 'react';
import FormInput from './FormInput'
import { useNavigate } from "react-router-dom";


const AccountForm = ({setUsers}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    recoveryQuestion :'',
    role : '',
    response : '',
    password: '',
    confirmPassword: '',
  });
  const history = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email,
         password: formData.password,
         firstname: formData.firstName,
         lastname: formData.lastName,
         username: formData.username,
         recoveryQuestion :formData.recoveryQuestion,
         role : formData.role,
         response :formData.response,
         }),
    };
    fetch("http://localhost:3000/register", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if(data.message === "success") {
        console.log(data.code)
        setUsers(data.user);
      
        history('/dashboard')
      } else if (data.message === "fail") {
     
    
      } else {
        // handle other cases
      }
    })
    .catch((error) => {
      console.error(error);
      // handle the error
    });
  
    
  };


  return (
    <div className="account-form">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="First Name" name="firstName" type="text" value={formData.firstName} handleChange={handleChange} />
        <FormInput label="Last Name" name="lastName" type="text" value={formData.lastName} handleChange={handleChange} />
        <FormInput label="Username" name="username" type="text" value={formData.username} handleChange={handleChange} />
        <FormInput label="Email" name="email" type="email" value={formData.email} handleChange={handleChange} />
        <FormInput label="Password" name="password" type="password" value={formData.password} handleChange={handleChange} />
        <FormInput label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} handleChange={handleChange} />
        <div className="form-group">
  <label htmlFor="role">Role:</label>
  <select name="role" id="role" value={formData.role} onChange={handleChange}>
    <option value="developer">Developer</option>
    <option value="analyste">Analyste</option>
    <option value="company recruiter">Company Recruiter</option>
    <option value="instructor">Instructor</option>
  </select>
</div>

<div className="form-group">
  <label htmlFor="recoveryQuestion">Account Recovery Question:</label>
  <select name="recoveryQuestion" id="recoveryQuestion" value={formData.recoveryQuestion} onChange={handleChange}>
    <option value="What is your childhood nickname?">What is your childhood nickname?</option>
    <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
    <option value="What is your favorite color?">What is your favorite color?</option>
    <option value="What is the name of your first pet?">What is the name of your first pet?</option>
    <option value="What is your favorite movie?">What is your favorite movie?</option>
  </select>
</div>

<FormInput label="Recovery response" name="response" type="text" value={formData.response} handleChange={handleChange} />
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AccountForm;
