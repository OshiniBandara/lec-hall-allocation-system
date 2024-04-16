import React, { useState } from 'react';
import './AdminSignup.css';
import './CardSign.css';
import CardItemSign from './CardItemSign';
import { buddhi } from './firebase'; 
import { doc, setDoc } from "firebase/firestore";


function StudentSignup() {
  

  const [formData, setFormData] = useState({
    name: '',
    studentID: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
    validationErrors: {
      name: '',
      studentID: '',
      email: '',
      contactNumber: '',
      password: '',
      confirmPassword: ''
    },
    isFieldDisabled: true, // Initially, all fields are disabled
    successMessage: ''
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    let validationErrors = { ...formData.validationErrors };

    // Perform validation
    switch (name) {
      case 'name':
        validationErrors.name = value.trim().length > 0 ? '' : 'Name is required';
        break;
      case 'studentID':
        const empNumRegex = /^[\d]{2}[a-zA-Z]{3}[\d]{4}$/;
        validationErrors.studentID = empNumRegex.test(value) ? '' : 'Student ID should start with 2 numbers followed by 3 letters and 4 numbers';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validationErrors.email = emailRegex.test(value) ? '' : 'Invalid email address';
        break;
      case 'contactNumber':
        const contactNumRegex = /^\d{10}$/;
        validationErrors.contactNumber = contactNumRegex.test(value) ? '' : 'Contact number should contain 10 digits';
        break;
      case 'password':
        validationErrors.password = value.length >= 6 ? '' : 'Password must be at least 6 characters long';
        break;
      case 'confirmPassword':
        validationErrors.confirmPassword = value === formData.password ? '' : 'Passwords do not match';
        break;
      default:
        break;
    }

     // Enable the next field if the current field is valid
     const updatedFormData = {
      ...formData,
      [name]: value,
      validationErrors,
      isFieldDisabled: validationErrors[name] !== '', // Disable the next field if the current field has an error
      successMessage: ''
    };

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, studentID, email, contactNumber, password, confirmPassword } = formData;
  
    // Check if there are any validation errors
    const isFormValid = Object.values(formData.validationErrors).every((error) => error === '');
  
    if (isFormValid) {
      try {
        // Store user data in Firestore
        console.log(studentID);
       
        const data = {
          name: name,
          studentID: studentID,
          email: email,
          contactNumber: contactNumber,
          password: password,
          confirmPassword: confirmPassword
        };
        
         console.log(setDoc(doc(buddhi, "student", studentID), data)); 
        
       
      
  
        setShowSuccessMessage(true);
        setFormData({ ...formData, successMessage: 'User signed up successfully!' });
      } catch (error) {
        console.error('Error signing up:', error.message);
      }
    }
  };
  


  


  return (
    <div>
      <div className="admin-signup-container">
        <img src="/images/susl.png" alt="Admin" className="admin-image" width="400px" height="400px" />
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Student Sign up</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            <span className="error-message">{formData.validationErrors.name}</span>
          </div>
          <div className="form-group">
            <label htmlFor="studentID">Student ID:</label>
            <input type="text" id="studentID" name="studentID" value={formData.studentID} onChange={handleChange} required disabled={!formData.name} />
            <span className="error-message">{formData.validationErrors.studentID}</span>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={!formData.studentID} />
            <span className="error-message">{formData.validationErrors.email}</span>
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required disabled={!formData.email} />
            <span className="error-message">{formData.validationErrors.contactNumber}</span>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required disabled={!formData.contactNumber} />
            <span className="error-message">{formData.validationErrors.password}</span>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required disabled={!formData.password} />
            <span className="error-message">{formData.validationErrors.confirmPassword}</span>
          </div>
          <button type="submit" disabled={!formData.confirmPassword || formData.isSubmitting}>Sign Up</button>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Already have an account? <a href="/StudentLoginIn">Sign In</a></p>
          {showSuccessMessage && (
            <div className="success-message-container">
                <div className="white-box success-message-box">
                <p>{formData.successMessage}</p>
                <a href="/StudentLoginIn" className="ok-button">OK</a>
                </div>
            </div>
            )}
        </form>
      </div>
      <div className='cards1'>
        <div className='cards__container1'>
          <div className='cards__wrapper1'>
          <div className='cards__items1'>
            <CardItemSign
              src='images/admin.jpg'
              text='Admin Sign Up'
              label='Admin'
              path='/AdminSign'
            />
            </div>
            <div className='cards__items1'>
              <CardItemSign
                src='images/lec.png'
                text='Lecturer SignUp'
                label='Lecturer'
                path='/LecturerSign'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSignup;