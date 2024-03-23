const express = require('express');
const app = express();
const port = 3000; // Change to your desired port
const { buddhi } = require('./firebase.js');

app.use(express.json());

// POST endpoint to handle user signup
app.post('/api/users', async (req, res) => {
  try {
    const { name, employeeNumber } = req.body;
    // Save user data to Firestore
    await buddhi.collection('users').doc(employeeNumber).set({
      name,
      employeeNumber
      // Add other fields here
    });
    res.status(200).send('User signed up successfully!');
  } catch (error) {
    console.error('Error signing up:', error.message);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

