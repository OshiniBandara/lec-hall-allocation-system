import React, { useState , useEffect} from 'react';
import './AdminSignup.css';
import './CardSign.css';
import { buddhi } from './firebase'; 
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";


function AddSlot() {
  
  const [formData, setFormData] = useState({
    slotID: '',
    name: '',
    batch: '',
    course: '',
    hallID: '',
    hallName: '',
    day: '',
    date: '',
    time:'',
   
    validationErrors: {
        slotID: '',
        name: '',
        batch: '',
        course: '',
        hallID: '',
        hallName: '',
        day: '',
        date: '',
        time:''
    },
    isFieldDisabled: true, // Initially, all fields are disabled
    successMessage: ''
  });

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
  
    // Set the generated time options
    setFormData((prevData) => ({
      ...prevData,
      timeOptions: generateTimeOptions(),
    }));
  }, []);

  const handleTimeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      time: e.target.value,
    }));
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validationErrors = { ...formData.validationErrors };

    let errorMessage = '';
    
    // Add validation logic for day input
    if (name === 'day') {
      // Check if the selected day matches the day of the selected date
      const selectedDate = new Date(formData.date);
      const selectedDay = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
      if (value !== selectedDay) {
        errorMessage = `Selected day (${value}) does not match the day of the selected date (${selectedDay}).`;
      }
    }

    validationErrors.dayDateMatch = errorMessage;

    setFormData({ ...formData, [name]: value, validationErrors: { ...formData.validationErrors, [name]: errorMessage } });


    // Perform validation
    switch (name) {
      case 'slotID':
        const slotIDRegex = /^\d{3}/;
        validationErrors.slotID = slotIDRegex.test(value) ? '' : 'slot ID is required, 3 number ID';
        break;
      case 'name':
        validationErrors.name = value.trim().length > 0 ? '' : 'name is required';
        break;
      case 'batch':
        const batchRegex = /^\d{2}[a-zA-Z]{3}$/;
        validationErrors.batch = batchRegex.test(value) ? '' : 'Batch is required';
        break;
      case 'course':
        validationErrors.course = value.trim().length > 0 ? '' : 'course is required';
        break;
      case 'hallID':
        const hallIDRegex = /^\d{3}/;
        validationErrors.hallID = hallIDRegex.test(value) ? '' : 'hall is required, 3 number ID';
        break;
      case 'hallName':
        const hallNameRegex = /^[a-zA-Z]{2}\d{3}$/;
        validationErrors.hallName = hallNameRegex.test(value) ? '' : 'hall is required';
        break;
      case 'day':
          const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
          validationErrors.day = validDays.includes(value) ? '' : 'Invalid day selected';
          break;
      case 'date':
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          validationErrors.date = dateRegex.test(value) ? '' : 'Invalid date format (yyyy-mm-dd)';
          break;
        
        case 'time':
          const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
          validationErrors.time = timeRegex.test(value) ? '' : 'Invalid time format (hh:mm)';
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
    const { slotID, name, batch, course, hallID, hallName, day, date, time} = formData;
  
    // Check if there are any validation errors
    const isFormValid = Object.values(formData.validationErrors).every((error) => error === '');
  
    if (isFormValid) {
      try {
      // Check if the slot already exists in the database
      const docRef = doc(buddhi, "lectureSlot", slotID);
      const docSnapshot = await getDoc(docRef);
      
      if (docSnapshot.exists()) {
        setFormData({ ...formData, errorMessage: "Another lecture already scheduled at the same day, date, time, and hall" });
        return;
      }

      // Check if there's already a lecture scheduled at the same day, date, time, and hall
      const querySnapshot = await getDocs(collection(buddhi, "lectureSlot"));
      const existingLectures = querySnapshot.docs.map((doc) => doc.data());

      const conflictingLecture = existingLectures.find((lecture) => {
        return (
          lecture.day === day &&
          lecture.date === date &&
          lecture.time === time &&
          lecture.hallID === hallID &&
          lecture.hallName === hallName
        );
      });

      if (conflictingLecture) {
        setFormData({ ...formData, errorMessage: "Another lecture already scheduled at the same day, date, time, and hall" });
        return;
      }
        
        const data = {
            slotID: slotID,
            name: name,
            batch: batch,
            course: course,
            hallID: hallID,
            hallName: hallName,
            day: day,
            date: date,
            time: time


        };


        await setDoc(doc(buddhi, "lectureSlot", slotID), data); 

        setShowSuccessMessage(true);
        setFormData({ ...formData, successMessage: 'Lecture Slot Added Successfully!' });
      } catch (error) {
        console.error('Error Adding up:', error.message);
        setFormData({ ...formData, errorMessage: 'An error occurred while adding the lecture slot' });
      }
    }
  };
  


  return (
    <div>
      <div className="admin-signup-container1">
        <img src="/images/susl.png" alt="Admin" className="admin-image" width="400px" height="400px" />
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Add Lecture Slot</h2>

          <div className="form-group">
            <label htmlFor="slotID">Slot ID:</label>
            <input type="text" id="slotID" name="slotID" value={formData.slotID} onChange={handleChange} required />
            <span className="error-message">{formData.validationErrors.slotID}</span>
          </div>
          <div className="form-group">
            <label htmlFor="name">Lecturer Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required disabled={!formData.slotID} />
            <span className="error-message">{formData.validationErrors.name}</span>
          </div>
          <div className="form-group">
            <label htmlFor="batch">Batch:</label>
            <input type="text" id="batch" name="batch" value={formData.batch} onChange={handleChange} required disabled={!formData.name} />
            <span className="error-message">{formData.validationErrors.batch}</span>
          </div>
          <div className="form-group">
            <label htmlFor="course">Course:</label>
            <input type="text" id="course" name="course" value={formData.course} onChange={handleChange} required disabled={!formData.batch} />
            <span className="error-message">{formData.validationErrors.course}</span>
          </div>
          <div className="form-group">
            <label htmlFor="hallID">Hall ID:</label>
            <input type="text" id="hallID" name="hallID" value={formData.hallID} onChange={handleChange} required disabled={!formData.course}/>
            <span className="error-message">{formData.validationErrors.hallID}</span>
          </div>
          <div className="form-group">
            <label htmlFor="hallName">Hall Name:</label>
            <input type="text" id="hallName" name="hallName" value={formData.hallName} onChange={handleChange} required disabled={!formData.hallID} />
            <span className="error-message">{formData.validationErrors.hallName}</span>
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity:</label>
            <input type="text" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} required disabled={!formData.hallName} />
            <span className="error-message">{formData.validationErrors.capacity}</span>
          </div>
          <div className="form-group">
            <label htmlFor="day">Day:</label>
            <select id="day" name="day" value={formData.day} onChange={handleChange} required disabled={!formData.capacity}>
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <span className="error-message">{formData.validationErrors.day}</span>
             {/* Display day-date comparison error */}
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required disabled={!formData.day} />
            <span className="error-message">{formData.validationErrors.date}</span>
            <span className="error-message">{formData.validationErrors.dayDateMatch}</span>
          </div>
          <div className="form-group">
            <label htmlFor="time">Time Period:</label>
            <select id="time" name="time" value={formData.time} onChange={handleTimeChange} required>
              <option value="">Select Time Period</option>
              {formData.timeOptions &&
                formData.timeOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
            <span className="error-message">{formData.validationErrors.time}</span>
          </div>

         
         
          <button type="submit" disabled={!formData.time || formData.isSubmitting}>Submit</button>
         
          {showSuccessMessage && (
            <div className="success-message-container">
                <div className="white-box success-message-box">
                <p>{formData.successMessage}</p>
                <a href="/AdminHome" className="ok-button">OK</a>
                </div>
            </div>
            )}
            {formData.errorMessage && (
              <div className="error-message-box">
                <div className="white-box error-message-box">
                  <p className="error-message-text">{formData.errorMessage}</p>
                  <a href="/AdminHome" className="ok-button">OK</a>
                </div>
              </div>
            )}


        </form>
      </div>
    </div>
  );
}

export default AddSlot;