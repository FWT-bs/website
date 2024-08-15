require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sendDataToHubSpot = require('./hubspot');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (e.g., your HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Handle form submission
app.post('/submit-quote', async (req, res) => {
  const formData = req.body;

  try {
    // Send data to HubSpot
    await sendDataToHubSpot(formData);

    // Respond to the client with success
    res.json({ message: 'Form submitted and contact created in HubSpot!' });
  } catch (error) {
    // Respond to the client with an error
    console.error(error);
    res.status(500).json({ message: 'Error sending data to HubSpot', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
