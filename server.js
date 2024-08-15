require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;  // Render will provide the PORT environment variable

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS, and images)
app.use(express.static(__dirname));

// Handle form submission and send data to HubSpot
app.post('/submit-quote', async (req, res) => {
    const { hotelName, email, phoneNumber, details } = req.body;

    // Prepare data to send to HubSpot
    const hubspotApiKey = process.env.HUBSPOT_API_KEY;
    const data = {
        properties: {
            firstname: hotelName,
            email: email,
            phone: phoneNumber,
            message: details,
        },
    };

    try {
        // Send form data to HubSpot API
        const response = await axios.post(
            `https://api.hubapi.com/crm/v3/objects/contacts?hapikey=${hubspotApiKey}`,
            data,
            { headers: { 'Content-Type': 'application/json' } }
        );

        console.log('Contact created:', response.data);
        res.json({ message: 'Form submitted and data sent to HubSpot successfully!' });
    } catch (error) {
        console.error('Error creating contact:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error sending data to HubSpot', error: error.message });
    }
});

// Serve the main HTML file (quote.html or index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'quote.html'));  // Adjust this if you want to serve index.html by default
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
