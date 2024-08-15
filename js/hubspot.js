const axios = require('axios');

// HubSpot API configuration
const hubspotApiKey = process.env.HUBSPOT_API_KEY;

// Function to send form data to HubSpot Contacts API
async function sendDataToHubSpot(formData) {
    try {
        const response = await axios.post(
            `https://api.hubapi.com/crm/v3/objects/contacts?hapikey=${hubspotApiKey}`,
            {
                properties: {
                    firstname: formData.hotelName,
                    email: formData.email,
                    phone: formData.phoneNumber,
                    message: formData.details,
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Contact created:', response.data);
    } catch (error) {
        console.error('Error creating contact:', error.response?.data || error.message);
    }
}

module.exports = sendDataToHubSpot;
