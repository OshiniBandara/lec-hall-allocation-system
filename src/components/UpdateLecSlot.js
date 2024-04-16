import React, { useState, useEffect } from 'react';
import './HomeAdmin.css';
import { buddhi } from './firebase';
import { collection , getDocs, doc, deleteDoc } from "firebase/firestore";
import UpdateSlot from './UpdateSlot';

function UpdateLecSlot() {

  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedHalls] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [deletingSlotID, setDeletingSlotID] = useState(null);

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
  
  const handleUpdate = (slotId) => {
    const selectedSlots = slots.find((lectureSlot) => lectureSlot.id === slotId);
    setSelectedHalls({ ...selectedSlots, id: slotId });
    setShowUpdateForm(true);
  };

  const handleDelete = (slotId) => {
    setShowConfirmationDialog(true);
    setDeletingSlotID(slotId);
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
        await deleteDoc(doc(buddhi, 'lectureSlot', deletingSlotID));
        const updatedLectureSlots = slots.filter(lectureSlot => lectureSlot.id !== deletingSlotID);
        setSlots(updatedLectureSlots);
        setShowConfirmationDialog(false);
        setShowSuccessMessage(true);
    } catch (error) {
        console.error('Error deleting lecturer:', error.message);
    }
};


  
return (
  <div className='container'>
    <div className='table-container1'>
      <table className='lecturer-table1'>
        <thead>
          <tr>
            <th>Slot ID</th>
            <th>Lecturer Name</th>
            <th>Batch</th>
            <th>Course</th>
            <th>Hall ID</th>
            <th>Hall Name</th>
            <th>Day</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((lectureSlot) => (
              <tr key={lectureSlot.slotID}>
              <td>{lectureSlot.slotID}</td>
              <td>{lectureSlot.name}</td>
              <td>{lectureSlot.batch}</td>
              <td>{lectureSlot.course}</td>
              <td>{lectureSlot.hallID}</td>
              <td>{lectureSlot.hallName}</td>
              <td>{lectureSlot.day}</td>
              <td>{lectureSlot.date}</td>
              <td>{lectureSlot.time}</td>
              <td>
                <button className="update-button1" onClick={() => handleUpdate(lectureSlot.id)}>Update</button>
                <button className="delete-button1" onClick={() => handleDelete(lectureSlot.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {showUpdateForm && selectedSlots && (
      <UpdateSlot lectureSlot={selectedSlots} onUpdate={onUpdateLectureHall} />
    )}
    {showSuccessMessage && (
      <div className="success-message-container">
        <div className="white-box success-message-box">
          <p>Lecture Slot Details Updated Successfully!</p>
          <a href="/SlotUpdate" className="ok-button">OK</a>
        </div>
      </div>
    )}
    {showConfirmationDialog && (
              <div className="confirmation-dialog">
                  <div className="confirmation-dialog-box">
                      <p>Are you sure you want to delete this Lecture Slot?</p>
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

export default UpdateLecSlot;
