import React, { useState } from 'react';
import './AdminSignup.css';
import './CardSign.css';
import CardItemSign from './CardItemSign';
import { getAuth } from "firebase/auth";
import { buddhi } from './firebase'; 
import { collection } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";


function AdminSignup() {
  
  const auth = getAuth();
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
        validationErrors.name = value.trim().length > 0 ? '' : 'ID is required';
        break;
      case 'hallName':
        const empNumRegex = /^[a-zA-Z]{2}\d{4}$/;
        validationErrors.employeeNumber = empNumRegex.test(value) ? '' : 'Hall Name is required';
        break;
      case 'capacity':
        const capacityRegex = /^\d{3}$/;
        validationErrors.email = capacityRegex.test(value) ? '' : 'Invalid capacity';
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
        // await collection(firestore, "users",employeeNumber,
        //   "name"
          
        // );
        // const docRef = firestore.collection('users').doc('alovelace');

        // const docRef = collection(firestore, "users", employeeNumber, "links");


        // const res = await buddhi.collection('cities').add({
        //   name: 'Tokyo',
        //   country: 'Japan'
        // });
        const data = {
          name: 'Los Angeles',
          state: 'CA',
          country: 'USA'
        };
        
        // console.log(setDoc(doc(buddhi, "cities", "new-city-id"), data)); 
        
       
        // Add a new document in collection "cities" with ID 'LA'
        const res = await buddhi().collection('cities').doc('LA').set(data);

        // await firestore.collection('users').doc(employeeNumber).set({
        //   name,
        //   employeeNumber,
        //   email,
        //   contactNumber,
        //   password,
        //   confirmPassword
        // });
  
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
          <h2>Add Lecture Hall</h2>
         
          <div className="form-group">
            <label htmlFor="hallID">Hall ID:</label>
            <input type="text" id="employeeNumber" name="hallID" value={formData.hallID} onChange={handleChange} required />
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
            <span className="error-message">{formData.validationErrors.email}</span>
          </div>
         
         
          <button type="submit" disabled={!formData.confirmPassword || formData.isSubmitting}>Submit</button>
         
          {showSuccessMessage && (
          <div className="success-message-box">
            <p>{formData.successMessage}</p> 
            </div>)}
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;