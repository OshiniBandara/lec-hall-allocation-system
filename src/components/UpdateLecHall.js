import React, { useState } from 'react';
import './AdminSignup.css';
import './CardSign.css';
import { buddhi } from './firebase';
import { doc, updateDoc} from "firebase/firestore";




function UpdateLecHall({ lectureHall, onUpdate }) {

    const [formData, setFormData] = useState({
        hallID: lectureHall.hallID,
        hallName: lectureHall.hallName,
        capacity: lectureHall.capacity
       
      });
    
      const [showForm, setShowForm] = useState(true);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const action = e.target.getAttribute('data-action');
        
       
        console.log('Updated data:', formData);
        console.log('Updated buddhi data:', formData); // Log the updated data
        if (action === 'submit') {
          try {
            const lecturerRef = doc(buddhi, 'lectureHall', formData.hallID);
            await updateDoc(lecturerRef, formData);
            onUpdate(formData);
            alert('Lecturer details updated successfully!');
            console.log(updateDoc(lecturerRef, formData));
            // setShowUpdateForm(false);
            // setShowSuccessMessage(true);
          } catch (error) {
            console.error('Error updating lecturer:', error.message);
          }
      
        // Call onUpdate function with updated data
        //onUpdate(formData);
        }
        
        setShowForm(false);
      };

      
      
      return (
        showForm && (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="update-form-container">
          <h2>Update Lecture Hall Details</h2>
          <form className="update-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="hallID">Hall ID:</label>
              <input
                type="text"
                id="hallID"
                name="hallID"
                value={formData.hallID}
                onChange={handleChange}
                required
                disabled
              />
              
            </div>
            <div className="form-group">
              <label htmlFor="hallName">Hall Name:</label>
              <input
                type="text"
                id="hallName"
                name="hallName"
                value={formData.hallName}
                onChange={handleChange}
                required
                 // Prevent editing employee number
              />
             
            </div>
            <div className="form-group">
              <label htmlFor="capacity">Capacity:</label>
              <input
                type="text"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            
             
            </div>
           
            
            
            <button type="submit">Update</button>
            {/* <button class="cancel-button" a href="/UpdateHall">Cancel</button> */}
            <button className="cancel-button" onClick={(e) => handleSubmit(e)} data-action="cancel">Cancel</button>

          </form>
        </div>
      </div>
    </div>
    )
  );
}

export default UpdateLecHall;