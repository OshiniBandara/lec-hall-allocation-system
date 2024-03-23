import React, { useState, useEffect } from 'react';
import './HomeAdmin.css';
import { buddhi } from './firebase';

function HomeAdmin() {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hallsRef = buddhi.ref('halls'); // Reference to your 'halls' node in the database
        hallsRef.on('value', (snapshot) => {
          const hallData = snapshot.val();
          if (hallData) {
            const hallsArray = Object.values(hallData);
            setHalls(hallsArray);
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();

    return () => {
      buddhi.ref('halls').off();
    };
  }, []);

  return (
    <div className='container'>
      <div className='table-container'>
        <table className='hall-table'>
          <thead>
            <tr>
              <th>Hall ID</th>
              <th>Hall Name</th>
              <th>Capacity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {halls.map((hall) => (
              <tr key={hall.id}>
                <td>{hall.id}</td>
                <td>{hall.name}</td>
                <td>{hall.capacity}</td>
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
