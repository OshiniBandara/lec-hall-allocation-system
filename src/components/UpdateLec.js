import React, { useState } from 'react';
import './AdminSignup.css';
import './CardSign.css';
import { buddhi } from './firebase';
import { doc, updateDoc} from "firebase/firestore";



function UpdateLec({ lecturer, onUpdate }) {

    

    const [formData, setFormData] = useState({
        name: lecturer.name,
        employeeNumber: lecturer.employeeNumber,
        email: lecturer.email,
        contactNumber: lecturer.contactNumber
       
      });

      const [showForm, setShowForm] = useState(true);

    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form data here if needed

        if (e.nativeEvent.submitter.getAttribute('type') === 'submit') {
      
        // Log updated data
        console.log('Updated data:', formData);
        console.log('Updated buddhi data:', formData); // Log the updated data
          try {
            const lecturerRef = doc(buddhi, 'lecturer', formData.employeeNumber);
            await updateDoc(lecturerRef, formData);
            onUpdate(formData);
            //alert('Lecturer details updated successfully!');
            console.log(updateDoc(lecturerRef, formData));
            // setShowUpdateForm(false);
            // setShowSuccessMessage(true);
          } catch (error) {
            console.error('Error updating lecturer:', error.message);
          }
        }
        // Call onUpdate function with updated data
       
        setShowForm(false);
      };
      
      return (
        showForm && (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="update-form-container">
          <h2>Update Lecturer Details</h2>
          <form className="update-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
            </div>
            <div className="form-group">
              <label htmlFor="employeeNumber">Employee Number:</label>
              <input
                type="text"
                id="employeeNumber"
                name="employeeNumber"
                value={formData.employeeNumber}
                onChange={handleChange}
                required
                disabled // Prevent editing employee number
              />
             
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            
             
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            
            </div>
            <button type="submit">Update</button>
            <button class="cancel-button" a href="/LecturerUpdate">Cancel</button>
          </form>
        </div>
      </div>
    </div>
        )
  );
}

export default UpdateLec;