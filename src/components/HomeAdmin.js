// HomeAdmin.js
import React, { useState, useEffect } from 'react';
import './HomeAdmin.css'; // Import CSS file for styling
import { ref, get, child } from 'firebase/database';
import { buddhi } from './firebase'; // Import the database instance from firebase.js
import { Link } from 'react-router-dom';

function HomeAdmin() {
  const [lecturerData, setLecturerData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the database and update state
    const fetchData = async () => {
      try {
        const lecturerRef = ref(buddhi, 'lecturers');
        const snapshot = await get(lecturerRef);
        if (snapshot.exists()) {
          const lecturers = [];
          snapshot.forEach((childSnapshot) => {
            lecturers.push(childSnapshot.val());
          });
          setLecturerData(lecturers);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData(); // Call the function to fetch data when component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className='container'>
      <div className='buttons-container'>
        <Link to='/LecturerAdd'>
          <button className='add-lecturer-button'>Add Lecturer</button>
        </Link>
        <Link to='/LecturerUpdate'>
          <button className='update-lecturer-button'>Update Lecturer</button>
        </Link>
      </div>
      <div className='buttons-container'>
        <Link to='/AddHall'>
          <button className='add-lecturer-button'>Add Lecture Hall</button>
        </Link>
        <Link to='/UpdateHall'>
          <button className='update-lecturer-button'>Update Lecture Hall</button>
        </Link>
      </div>
      {/* Second rectangle for displaying lecturer data */}
      <div className='rectangle lecturer-data'>
        <h2>All the bookings made by the lecturers are shown below!</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Batch</th>
              <th>Course</th>
              <th>Hall</th>
              <th>Day</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {lecturerData.map((lecturer, index) => (
              <tr key={index}>
                <td>{lecturer.name}</td>
                <td>{lecturer.batch}</td>
                <td>{lecturer.course}</td>
                <td>{lecturer.hall}</td>
                <td>{lecturer.day}</td>
                <td>{lecturer.date}</td>
                <td>{lecturer.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='buttons-container'>
        <Link to='/AddHall'>
          <button className='add-lecturer-button'>Add Lecture Hall</button>
        </Link>
       
      </div>
    </div>
  );
}

export default HomeAdmin;
