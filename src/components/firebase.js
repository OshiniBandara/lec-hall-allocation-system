// Import the functions you need from the SDKs you need


// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// const firebaseConfig = {
//   apiKey: "AIzaSyBBBgyWE1xJqgYBSs4B7S5mSBaR6aXDk_U",
//   authDomain: "lec-hall-system.firebaseapp.com",
//   databaseURL: "https://lec-hall-system-default-rtdb.firebaseio.com/"  ,
//   projectId: "lec-hall-system",
//   storageBucket: "lec-hall-system.appspot.com",
//   messagingSenderId: "178925524505",
//   appId: "1:178925524505:web:95e1a0a6f205440e2e3c88",
//   measurementId: "G-LGBRPSRTKQ"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const buddhi = getFirestore(app);

// export { auth, buddhi };

const { initializeApp, cert } = require ('firebase-admin/app')
const { getFirestore } = require ('firebase-admin/firestore')

const serviceAccount = require('../creds.json')

initializeApp({
  credential: cert(serviceAccount)
})

const buddhi = getFirestore()

module.exports = { buddhi }


