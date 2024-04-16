import React, { useState } from 'react';
import './AdminSignup.css';
import './Cards.css';
import CardItem from './CardItem';
import { buddhi } from './firebase'; // Import the database instance from firebase.js
import { doc, getDoc } from "firebase/firestore";


function StudentLogin ({ history }){
  const [formData, setFormData] = useState({
    studentID: '',
    password: ''
  });

  const [forgetPasswordMode, setForgetPasswordMode] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForgetPassword = () => {
    setForgetPasswordMode(true);
  };

  const handleResetPassword = async () => {
    try {
      // Send password reset email to the provided email address
      // Here, you should implement your logic to send the reset email
      console.log('Password reset email sent to:', resetEmail);
      // Display a success message
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setForgetPasswordMode(false);
      }, 3000);
    } catch (error) {
      // Display an error message if sending email fails
      setShowErrorMessage('Failed to send password reset email.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const { studentID, password } = formData;

     try {
      console.log('Attempting to authenticate user...');
      // Reference the admin document in the database
      // const adminDocRef = buddhi.collection('admin').doc(employeeNumber);
      const docSnapshot = await getDoc(doc(buddhi, "student", studentID));
      // const docSnapshot = await adminDocRef.get();
  
      if (docSnapshot.exists) {
        console.log('User document found in Firestore');
        console.log(docSnapshot);
        console.log(docSnapshot.data());
        const userData = docSnapshot.data();
        if (userData.password === password) {
          console.log('User authenticated successfully');
          
          setShowSuccessMessage(true);
          
          setTimeout(() => {
            window.location.href = '/AdminHome'; 
          }, 2000);
        } else {
          // Password is incorrect
          console.log('Incorrect password');
          setShowErrorMessage('Incorrect password');
        }
        
        if (userData && userData.password === password) {

          console.log('User authenticated successfully');
          
          setShowSuccessMessage(true);
          
          setTimeout(() => {
            window.location.href = '/AdminHome'; 
          }, 2000);

               } else {
          console.log('Incorrect password');
          setShowErrorMessage('Incorrect password');
        }
      } else {
        console.log('User document not found');
        setShowErrorMessage('User does not exist!');
      }
    } catch (error) {
      // Error occurred during authentication
      console.error('Error authenticating user:', error.message);
      setShowErrorMessage('User does not exist!');
    }
  };
  
  

  return (
    <div>
      <div className="admin-signup-container">
        <img src="/images/susl.png" alt="Admin" className="admin-image" width="400px" height="400px" />
        {/* Add the image here */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Student Sign In</h2>
         
          <div className="form-group">
            <label htmlFor="studentID">Student ID:</label>
            <input type="text" id="studentID" name="studentID" value={formData.studentID} onChange={handleChange} required />
          </div>
         
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
         
          <button type="submit">Sign In</button>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <a href="/Studentsign">Sign Up</a></p>
          <p style={{ textAlign: 'center', marginTop: '20px' }}> <a href="#!" onClick={handleForgetPassword}>Forget your password?</a></p>
        </form>
      </div>
      {showSuccessMessage && (
        <div className="success-message-container">
          <div className="white-box success-message-box">
            <p>You've logged in successfully!</p>
            <a href="/HomeStudent" className="ok-button">OK</a>
          </div>
        </div>
      )}
      {showErrorMessage && (
        <div className="error-message-box">
          <p>{showErrorMessage}</p>
          <button onClick={() => setShowErrorMessage('')}>OK</button>
        </div>
      )}
      {forgetPasswordMode && (
          <div className="forgot-password-container">
            <h2>Forget Password</h2>
            <input type="email" placeholder="Enter your email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
            <button onClick={handleResetPassword}>Reset Password</button>
          </div>
        )}
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
              src='images/lec.png'
              text='Lecturer Login'
              label='Lecturer'
              path='/LecturerLoginIn'
            />
            
         
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
