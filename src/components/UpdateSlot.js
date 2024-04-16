import React, { useState, useEffect } from 'react';
import './AdminSignup.css';
import './CardSign.css';
import { buddhi } from './firebase';
import { doc, updateDoc } from "firebase/firestore";

function UpdateSlot({ lectureSlot, onUpdate }) {

  const [showForm, setShowForm] = useState(true);

  const [formData, setFormData] = useState({
    slotID: lectureSlot.slotID,
    name: lectureSlot.name,
    batch: lectureSlot.batch,
    course: lectureSlot.course,
    hallID: lectureSlot.hallID,
    hallName: lectureSlot.hallName,
    day: lectureSlot.day,
    date: lectureSlot.date,
    time: lectureSlot.time,
    timeOptions: []
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const generateTimeOptions = () => {
      const options = [];
      const periods = ['AM', 'AM', 'PM', 'PM', 'PM', 'PM', 'PM']; // Define time periods for each option
      const startTime = 8; // Start time for the first period
      let currentHour = startTime;

      for (let i = 0; i < 6; i++) {
        const startHour = currentHour < 10 ? `0${currentHour}` : currentHour; // Add leading zero if hour is less than 10
        const endHour = currentHour + 2 < 10 ? `0${currentHour + 2}` : currentHour + 2;
        options.push(`${startHour}.00${periods[i]}-${endHour}.00${periods[i]}`);
        currentHour += 2;
      }
      return options;
    };

    setFormData(prevData => ({
      ...prevData,
      timeOptions: generateTimeOptions(),
    }));
  }, []);

  const handleTimeChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      time: e.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';

    setValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.getAttribute('type') === 'submit') {
    const { slotID, name, batch, course, hallID, hallName, day, date, time } = formData;
  
    const isFormValid = Object.values(validationErrors).every(error => error === '');
  
    if (isFormValid) {
      try {
        const docRef = doc(buddhi, "lectureSlot", slotID);
  
        await updateDoc(docRef, {
          name: name,
          batch: batch,
          course: course,
          hallID: hallID,
          hallName: hallName,
          day: day,
          date: date,
          time: time
        });

        // Call the onUpdate function passed down from parent component
        onUpdate(slotID, formData);
  
        setShowSuccessMessage(true);
      } catch (error) {
        console.error('Error updating lecture slot:', error.message);
      }
    }
  }
  
  setShowForm(false);
  };


  return (
    showForm && (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="update-form-container">
          <h2>Update Lecture Slot Details</h2>
          <form className="update-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="slotID">Slot ID:</label>
              <input
                type="text"
                id="slotID"
                name="slotID"
                value={formData.slotID}
                onChange={handleChange}
                required
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Lecturer Name:</label>
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
              <label htmlFor="batch">Batch:</label>
              <input
                type="text"
                id="batch"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="course">Course:</label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                disabled
              />
            </div>

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
              />
            </div>

            <div className="form-group">
              <label htmlFor="day">Day:</label>
              <select
                id="day"
                name="day"
                value={formData.day}
                onChange={handleChange}
                required
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <span className="error-message">{validationErrors.day}</span>

            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <span className="error-message">{validationErrors.date}</span>
            <span className="error-message">{validationErrors.dayDateMatch}</span>

            <div className="form-group">
              <label htmlFor="time">Time Period:</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleTimeChange}
                required
              >
                <option value="">Select Time Period</option>
                {formData.timeOptions &&
                  formData.timeOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>
            <span className="error-message">{validationErrors.time}</span>

            <button type="submit">Update</button>
            <button class="cancel-button" a href="/SlotUpdate">Cancel</button>

            {showSuccessMessage && (
              <div className="success-message-container">
                <div className="white-box success-message-box">
                  <p>Lecture Slot Details Updated Successfully!</p>
                  <a href="/SlotUpdate" className="ok-button">OK</a>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
    )
  );
}

export default UpdateSlot;

