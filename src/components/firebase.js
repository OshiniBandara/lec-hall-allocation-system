// Import the functions you need from the SDKs you need


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyBAdotRDaVEN2N60UpizvtH8dHGBl43BNM",
  authDomain: "project1-a6685.firebaseapp.com",
  projectId: "project1-a6685",
  storageBucket: "project1-a6685.appspot.com",
  messagingSenderId: "333054041946",
  appId: "1:333054041946:web:06770127f2ddc887041d63"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const buddhi = getFirestore(app);

export { auth, buddhi };



