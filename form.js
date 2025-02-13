document.getElementById("webhookForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form data
    var formData = new FormData(this);
    var message = formData.get("message");

    // Construct the payload
    var payload = {
        content: message
    };

    // Send the webhook
    fetch("https://discord.com/api/webhooks/1238089068827381770/omJZCV9qXbjk3wHwWEWIB2rMq77nl03VR5PlQfYkUkLfbvuGpEDFGnRevHpGQy4gFF4a", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Message sent successfully!');
        document.getElementById("message").value = ""; // Clear the form field
    })
    .catch(error => alert('Error: ' + error.message));
});
