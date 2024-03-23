import React, { useState } from 'react';
import './AdminSignup.css';
import './Cards.css';
import CardItem from './CardItem';
import { ref, get, child } from 'firebase/database';
import { buddhi } from './firebase'; // Import the database instance from firebase.js

function AdminLogin({ history }) {
  const [formData, setFormData] = useState({
    employeeNumber: '',
    password: ''
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 



  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employeeNumber, password } = formData;
  
    try {
      // Reference the users node in the database
      const usersRef = ref(buddhi, 'users');
  
      // Check if the user exists in the database
      const snapshot = await get(child(usersRef, employeeNumber));
  
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.password === password) {
          // Passwords match, user is authenticated
          setShowSuccessMessage(true);
          // Redirect user after 2 seconds
          setTimeout(() => {
            history.push('/AdminHome');
          }, 2000);
        } else {
          // Password is incorrect
          setShowErrorMessage('Incorrect password');
        }
      } else {
        // User not found
        setShowErrorMessage('User not found');
      }
    } catch (error) {
      // Error occurred during authentication
      console.error('Error authenticating user:', error.message);
      setShowErrorMessage('An error occurred during authentication');
    }
  };
  
  

  return (
    <div>
      <div className="admin-signup-container">
        <img src="/images/susl.png" alt="Admin" className="admin-image" width="400px" height="400px" />
        {/* Add the image here */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Admin Sign In</h2>
          <div className="form-group">
            <label htmlFor="EmployeeID">Employee ID:</label>
            <input type="text" id="EmployeeID" name="employeeNumber" value={formData.employeeNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Sign In</button>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <a href="/sign-up">Sign Up</a></p>
        </form>
      </div>
      {showSuccessMessage && (
        <div className="success-message-box">
          <p>You've logged in successfully!</p>
          <button onClick={() => setShowSuccessMessage(false)}>OK</button>
        </div>
      )}
      {showErrorMessage && (
        <div className="error-message-box">
          <p>{showErrorMessage}</p>
          <button onClick={() => setShowErrorMessage('')}>OK</button>
        </div>
      )}
      <div className='cards'>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <div className='cards__items'>
              <CardItem
                src='images/lec.png'
                text='Lecturer Login'
                label='Lecturer'
                path='/LecturerLoginIn'
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

export default AdminLogin;
