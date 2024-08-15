const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();  // Ensure this is at the top of the file

const app = express();
const PORT = process.env.PORT || 8080;  // Use the port provided by Render or default to 8080

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define your routes, for example:
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
        const response = await axios.post(`https://api.hubapi.com/crm/v3/objects/contacts?hapikey=${hubspotApiKey}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Contact created:', response.data);
        res.json({ message: 'Form submitted and data sent to HubSpot successfully!' });
    } catch (error) {
        console.error('Error creating contact:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error sending data to HubSpot', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
