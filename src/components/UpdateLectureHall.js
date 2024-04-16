import React, { useState, useEffect } from 'react';
import './HomeAdmin.css';
import { buddhi } from './firebase';
import { collection , getDocs, doc, deleteDoc } from "firebase/firestore";
import UpdateLecHall from './UpdateLecHall';

function UpdateLectureHall() {

  const [halls, setHalls] = useState([]);
  const [selectedHalls, setSelectedHalls] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [deletingHallID, setDeletingHallID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hallCollection = collection(buddhi, 'lectureHall');
        const querySnapshot = await getDocs(hallCollection);
        const hallData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setHalls(hallData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);
  
  const handleUpdate = (hallId) => {
    const selectedHalls = halls.find((lectureHall) => lectureHall.id === hallId);
    setSelectedHalls({ ...selectedHalls, id: hallId });
    setShowUpdateForm(true);
  };

  const handleDelete = (lectureHall) => {
    setShowConfirmationDialog(true);
    setDeletingHallID(lectureHall);
};

  const onUpdateLectureHall = async (id, updatedData) => {
    console.log('Updated buddhi data:', updatedData); // Log the updated data
    try {
      
      
     
      setShowUpdateForm(false);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error updating lecturer:', error.message);
    }
  };
  const confirmDelete = async () => {
    try {
        await deleteDoc(doc(buddhi, 'lectureHall', deletingHallID));
        const updatedLectureHall = halls.filter(lectureHall => lectureHall.id !== deletingHallID);
        setHalls(updatedLectureHall);
        setShowConfirmationDialog(false);
        setShowSuccessMessage(true);
    } catch (error) {
        console.error('Error deleting lecturer:', error.message);
    }
};


  
return (
  <div className='container'>
    <div className='table-container'>
      <table className='lecturer-table'>
        <thead>
          <tr>
            <th>Hall ID</th>
            <th>Hall Name</th>
            <th>Capacity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {halls.map((lectureHall) => (
            <tr key={lectureHall.id}>
              <td>{lectureHall.hallID}</td>
              <td>{lectureHall.hallName}</td>
              <td>{lectureHall.capacity}</td>
              <td>
                <button className="update-button" onClick={() => handleUpdate(lectureHall.id)}>Update</button>
                <button className="delete-button" onClick={() => handleDelete(lectureHall.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {showUpdateForm && selectedHalls && (
      <UpdateLecHall lectureHall={selectedHalls} onUpdate={onUpdateLectureHall} />
    )}
    {showSuccessMessage && (
      <div className="success-message-container">
        <div className="white-box success-message-box">
          <p>Lecture Hall Details Updated Successfully!</p>
          <a href="/UpdateHall" className="ok-button">OK</a>
        </div>
      </div>
    )}
    {showConfirmationDialog && (
              <div className="confirmation-dialog">
                  <div className="confirmation-dialog-box">
                      <p>Are you sure you want to delete this lecture hall?</p>
                      <div>
                          <button className="confirm-delete-button" onClick={confirmDelete}>OK</button>
                          <button className="cancel-delete-button" onClick={() => setShowConfirmationDialog(false)}>Cancel</button>
                      </div>
                  </div>
              </div>
          )}
  </div>
 
);
}

export default UpdateLectureHall;
