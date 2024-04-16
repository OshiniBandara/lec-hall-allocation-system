import React, { useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';


function SportTimeTable() {

    const [showPanel, setShowPanel] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [fileName, setFileName] = useState('');

    const openPanel = (url, name) => {
        setShowPanel(true);
        setFileUrl(url);
        setFileName(name);
    };
    
    const closePanel = () => {
        setShowPanel(false);
        setFileUrl('');
        setFileName('');
    };
    
    const handleDownload = async () => {
        // Trigger download of the file
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  return (
    <div className='cards'>
     

          <h1>Check Your Time Tables!</h1>
          <div className='cards__container'>
           <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/7.jpg'
              text='18/19 Batch'
              label='18/19'
              onClick={() => openPanel('https://firebasestorage.googleapis.com/v0/b/project1-a6685.appspot.com/o/Year%20I%20Sem.%20II%20Timetable%2027.12.2021.pdf?alt=media&token=c31c3860-6c26-43bd-b88c-933a8b66738d', 'Year I Sem. II Timetable 27.12.2021.pdf')}
               path = 'https://firebasestorage.googleapis.com/v0/b/project1-a6685.appspot.com/o/Year%20I%20Sem.%20II%20Timetable%2027.12.2021.pdf?alt=media&token=c31c3860-6c26-43bd-b88c-933a8b66738d'
                        />
            <CardItem
              src='images/3.jpg'
              text='19/20 Batch'
              label='19/20'
              onClick={() => openPanel('https://firebasestorage.googleapis.com/v0/b/project1-a6685.appspot.com/o/Year%20I%20Sem.%20II%20Timetable%2027.12.2021.pdf?alt=media&token=c31c3860-6c26-43bd-b88c-933a8b66738d', 'Year I Sem. II Timetable 27.12.2021.pdf')}
              path = 'https://firebasestorage.googleapis.com/v0/b/project1-a6685.appspot.com/o/Year%20I%20Sem.%20II%20Timetable%2027.12.2021.pdf?alt=media&token=c31c3860-6c26-43bd-b88c-933a8b66738d'
              />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/5.jpg'
              text='20/21 Batch'
              label='20/21'
              onClick={() => openPanel('https://firebasestorage.googleapis.com/v0/b/project1-a6685.appspot.com/o/Year%20I%20Sem.%20II%20Timetable%2027.12.2021.pdf?alt=media&token=c31c3860-6c26-43bd-b88c-933a8b66738d', 'Year I Sem. II Timetable 27.12.2021.pdf')}
              path = 'https://firebasestorage.googleapis.com/v0/b/project1-a6685.appspot.com/o/Year%20I%20Sem.%20II%20Timetable%2027.12.2021.pdf?alt=media&token=c31c3860-6c26-43bd-b88c-933a8b66738d'
              />
            <CardItem
              src='images/4.jpg'
              text='21/22 Batch'
              label='21/22'
              onClick={() => openPanel('https://firebasestorage.googleapis.com/v0/b/project1-a6685.appspot.com/o/Year%20I%20Sem.%20II%20Timetable%2027.12.2021.pdf?alt=media&token=c31c3860-6c26-43bd-b88c-933a8b66738d', 'Year I Sem. II Timetable 27.12.2021.pdf')}
              path = 'https://firebasestorage.googleapis.com/v0/b/project1-a6685.appspot.com/o/Year%20I%20Sem.%20II%20Timetable%2027.12.2021.pdf?alt=media&token=c31c3860-6c26-43bd-b88c-933a8b66738d'
              />
            
          </ul>
        </div>
      </div>
      {showPanel && (
            <div className='file-panel'>
                <div className='panel-buttons'>
                <button onClick={handleDownload}>Download {fileName}</button>
                <button onClick={closePanel}>Cancel</button>
                <button onClick={() => window.open(fileUrl, '_blank')}>View</button>
                </div>
            </div>
            )}

    </div>
  );
}

export default SportTimeTable;