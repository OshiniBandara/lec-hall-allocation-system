import React, { useState, useEffect } from 'react';
import './HomeAdmin.css';
import { buddhi } from './firebase';


    function HomeAdmin() {
        const [lecturers, setLecturers] = useState([]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const lecturersRef = buddhi.ref('lecturers'); // Reference to your 'lecturers' node in the database
              lecturersRef.on('value', (snapshot) => {
                const lecturerData = snapshot.val();
                if (lecturerData) {
                  const lecturersArray = Object.values(lecturerData);
                  setLecturers(lecturersArray);
                }
              });
            } catch (error) {
              console.error('Error fetching data:', error.message);
            }
          };
      
          fetchData();

          return () => {
            buddhi.ref('lecturers').off();
          };
        }, []);

  return (
    <div className='container'>
      <div className='table-container'>
        <table className='lecturer-table'>
          <thead>
            <tr>
              <th>Lecturer ID</th>
              <th>Lecturer Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lecturers.map((lecturer) => (
              <tr key={lecturer.id}>
                <td>{lecturer.id}</td>
                <td>{lecturer.name}</td>
                <td>{lecturer.email}</td>
                <td>{lecturer.contactNumber}</td>
                <td>
                  <button className="update-button">Update</button>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomeAdmin;