import React, { useState, useEffect } from 'react';
import './HomeAdmin.css';
import { buddhi } from './firebase';
import { collection , getDocs, doc, deleteDoc } from "firebase/firestore";
import UpdateLec from './UpdateLec';




    function UpdateLecturer() {

      const [lecturers, setLecturers] = useState([]);
      const [selectedLecturer, setSelectedLecturer] = useState(null);
      const [showUpdateForm, setShowUpdateForm] = useState(false);
      const [showSuccessMessage, setShowSuccessMessage] = useState(false);
      const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
      const [deletingLecturerId, setDeletingLecturerId] = useState(null);


        
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const lecturersCollection = collection(buddhi, 'lecturer');
              const querySnapshot = await getDocs(lecturersCollection);
              const lecturerData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
              }));
              setLecturers(lecturerData);
            } catch (error) {
              console.error('Error fetching data:', error.message);
            }
          };
      
          fetchData();
        }, []);
        
        const handleUpdate = (lecturerId) => {
          const selectedLecturer = lecturers.find((lecturer) => lecturer.id === lecturerId);
          setSelectedLecturer({ ...selectedLecturer, id: lecturerId });
          setShowUpdateForm(true);
        };

        const handleDelete = (lecturerId) => {
          setShowConfirmationDialog(true);
          setDeletingLecturerId(lecturerId);
      };
      
        const onUpdateLecturer = async (id, updatedData) => {
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
              await deleteDoc(doc(buddhi, 'lecturer', deletingLecturerId));
              const updatedLecturers = lecturers.filter(lecturer => lecturer.id !== deletingLecturerId);
              setLecturers(updatedLecturers);
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
                <td>{lecturer.employeeNumber}</td>
                <td>{lecturer.name}</td>
                <td>{lecturer.email}</td>
                <td>{lecturer.contactNumber}</td>
                <td>
                  <button className="update-button" onClick={() => handleUpdate(lecturer.id)}>Update</button>
                  <button className="delete-button" onClick={() => handleDelete(lecturer.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showUpdateForm && selectedLecturer && (
        <UpdateLec lecturer={selectedLecturer} onUpdate={onUpdateLecturer} />
      )}
      {showSuccessMessage && (
        <div className="success-message-container">
          <div className="white-box success-message-box">
            <p>Lecturer details updated successfully!</p>
            <a href="/LecturerUpdate" className="ok-button">OK</a>
          </div>
        </div>
      )}
      {showConfirmationDialog && (
                <div className="confirmation-dialog">
                    <div className="confirmation-dialog-box">
                        <p>Are you sure you want to delete this lecturer?</p>
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

export default UpdateLecturer;