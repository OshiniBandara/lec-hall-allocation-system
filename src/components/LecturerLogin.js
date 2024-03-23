import React, { useState } from 'react';
import './AdminSignup.css';
import './Cards.css';
import CardItem from './CardItem';

function LecturerLogin() {
  const [formData, setFormData] = useState({
    
    employeeNumber: '',
    
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

  return (
    <div>
      <div className="admin-signup-container">
        <img src="/images/susl.png" alt="Admin" className="admin-image" width="400px" height="400px" />
        {/* Add the image here */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Lecturer Sign In</h2>
         
          <div className="form-group">
            <label htmlFor="EmployeeID">Employee ID:</label>
            <input type="text" id="EmployeeID" name="EmployeeID" value={formData.EmployeeID} onChange={handleChange} required />
          </div>
         
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
         
          <button type="submit">Sign In</button>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <a href="/sign-up">Sign Up</a></p>
        </form>
      </div>
      
      <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <div className='cards__items'>
            <CardItem
              src='images/admin.jpg'
              text='Admin Login'
              label='Admin'
              path='/AdminLoginIn'
            />
           
             <CardItem
              src='images/student.jpg'
              text='Student Login'
              label='Student'
              path='/StudentLoginIn'
            />
         
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default LecturerLogin;
