import React, { useState } from 'react';
import FormInput from './FormInput'
import { useNavigate } from "react-router-dom";
import ForgotPassword from './ForgotPassword';
import { Link } from 'react-router-dom';


const Role= () => {

    const history = useNavigate();
  function onClickBut()
  {
    history("/")
  }

  



  return (
    <div className="account-form">
    <button>
        Developer
    </button>
    <button>
        Instructor
    </button>
    <button>
        Company Recruiter
    </button>
    <button>
        Analyste
    </button>
    </div>
  );
};

export default Role
