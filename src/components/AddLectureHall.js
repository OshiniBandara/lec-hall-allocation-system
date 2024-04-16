import React, { useState } from 'react';
import './AdminSignup.css';
import './CardSign.css';
import { buddhi } from './firebase'; 
import { doc, setDoc } from "firebase/firestore";


function AddLectureHall() {
  
  const [formData, setFormData] = useState({
    hallID: '',
    hallName: '',
    capacity: '',
   
    validationErrors: {
      hallID: '',
      hallName: '',
      capacity: ''
    },
    isFieldDisabled: true, // Initially, all fields are disabled
    successMessage: ''
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validationErrors = { ...formData.validationErrors };

    // Perform validation
    switch (name) {
      case 'hallID':
        const hallIDRegex = /^\d{3}/;
        validationErrors.hallID = hallIDRegex.test(value) ? '' : 'Hall ID is required, maximum length 3 numbers';
        break;
      case 'hallName':
        const hallNameRegex = /^[a-zA-Z]{2}\d{3}$/;
        validationErrors.hallName = hallNameRegex.test(value) ? '' : 'Hall Name is required';
        break;
      case 'capacity':
        const capacityRegex = /^\d{3}$/;
        validationErrors.capacity = capacityRegex.test(value) ? '' : 'Invalid capacity';
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
    const { hallID, hallName, capacity} = formData;
  
    // Check if there are any validation errors
    const isFormValid = Object.values(formData.validationErrors).every((error) => error === '');
  
    if (isFormValid) {
      try {
        // Store user data in Firestore
        console.log(hallID);
        
        const data = {
            hallID: hallID,
            hallName: hallName,
            capacity: capacity

        }


        console.log(setDoc(doc(buddhi, "lectureHall", hallID), data)); 
  
        setShowSuccessMessage(true);
        setFormData({ ...formData, successMessage: 'Lecture Hall Added Successfully!' });
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
          <h2>Add Lecture Hall</h2>
         
          <div className="form-group">
            <label htmlFor="hallID">Hall ID:</label>
            <input type="text" id="hallID" name="hallID" value={formData.hallID} onChange={handleChange} required />
            <span className="error-message">{formData.validationErrors.hallID}</span>
          </div>
          <div className="form-group">
            <label htmlFor="hallName">Hall Name:</label>
            <input type="text" id="hallName" name="hallName" value={formData.hallName} onChange={handleChange} required disabled={!formData.hallID} />
            <span className="error-message">{formData.validationErrors.hallName}</span>
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity:</label>
            <input type="text" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} required disabled={!formData.hallID} />
            <span className="error-message">{formData.validationErrors.capacity}</span>
          </div>
         
         
          <button type="submit" disabled={!formData.capacity || formData.isSubmitting}>Submit</button>
         
          {showSuccessMessage && (
            <div className="success-message-container">
                <div className="white-box success-message-box">
                <p>{formData.successMessage}</p>
                <a href="/AdminHome" className="ok-button">OK</a>
                </div>
            </div>
            )}
        </form>
      </div>
    </div>
  );
}

export default AddLectureHall;