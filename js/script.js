document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("quoteForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Capture form data
        const hotelName = document.getElementById("hotel-name").value;
        const email = document.getElementById("email").value;
        const phoneNumber = document.getElementById("phone-number").value;
        const details = document.getElementById("details").value;

        // Send the data to the Node.js backend hosted on Render
        fetch('https://website-gn0e.onrender.com/submit-quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hotelName,
                email,
                phoneNumber,
                details
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById("formDataDisplay").innerHTML = `<p>${data.message}</p>`;
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById("formDataDisplay").innerHTML = `<p>Error submitting form. Please try again.</p>`;
        });
    });
});
