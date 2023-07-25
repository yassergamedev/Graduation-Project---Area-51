import React, { useState } from 'react';


const FormInput = ({name, label, type, value, handleChange}) => (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <input type={type} id={name} name={name} value={value} onChange={handleChange} />
    </div>
  );
  

  export default FormInput;