// HomeAdmin.js
import React, { useState, useEffect } from 'react';
import './HomeAdmin.css'; // Import CSS file for styling
import { buddhi } from './firebase'; // Import the database instance from firebase.js
import { collection , getDocs} from "firebase/firestore";

function StudentHome() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hallCollection = collection(buddhi, 'lectureSlot');
        const querySnapshot = await getDocs(hallCollection);
        const hallData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setSlots(hallData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='container'>
      

    <div className='table-container1'>
    <h2 style={{ paddingBottom: '20px'}}>All the bookings made by the lecturers are shown below!</h2>
      <table className='lecturer-table1'>
        <thead>
          <tr>
            
            <th>Lecturer Name</th>
            <th>Batch</th>
            <th>Course</th>
            
            <th>Hall Name</th>
            <th>Day</th>
            <th>Date</th>
            <th>Time Period</th>
           
          </tr>
        </thead>
        <tbody>
          {slots.map((lectureSlot) => (
            <tr key={lectureSlot.slotID}>
               
              <td>{lectureSlot.name}</td>
              <td>{lectureSlot.batch}</td>
              <td>{lectureSlot.course}</td>
             
              <td>{lectureSlot.hallName}</td>
              <td>{lectureSlot.day}</td>
              <td>{lectureSlot.date}</td>
              <td>{lectureSlot.time}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
   
  );
}

export default StudentHome;
