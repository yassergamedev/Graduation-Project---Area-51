import React, { useState } from 'react';
import FormInput from './FormInput'
import { useNavigate } from "react-router-dom";




const Auth = (code) => {
  console.log(code)
  const [codee, setCo] = useState()
  const history = useNavigate();
  const handleChange = (event) => {
    setCo(event.target.codee)
  };

  const handleSubmit = (event) => {
    
    
    
   if(event.target.codee === code){
      history('/dashboard')
   }else{
    console.log('wrong code')
   }
  };

  return (
    <div className="account-form">
      <h2>Enter Verification Code : </h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="Code" name="Code" type="text" value={codee} handleChange={handleChange} />
      <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default Auth;
