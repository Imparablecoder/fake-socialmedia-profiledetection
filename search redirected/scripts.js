document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    var profileName = document.getElementById('profileName').value;
    if (profileName) {
        var instagramUrl = 'https://www.instagram.com/' + profileName + '/';
        window.location.href = instagramUrl; // Redirect to Instagram profile
    }
});

// Example: Fetching a GIF from Giphy API
// Note: Replace 'YOUR_API_KEY' with your actual API key
fetch('https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=instagram&limit=1')
    .then(response => response.json())
    .then(data => {
        const gifUrl = data.data[0].images.original.url;
        document.getElementById('searchResults').innerHTML = `<img src="${gifUrl}" alt="Instagram GIF">`;
    })
    .catch(error => console.error('Error fetching GIF:', error));



    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        var profileName = document.getElementById('profileName').value;
        if (profileName) {
            var instagramUrl = 'https://www.instagram.com/' + profileName + '/';
            window.location.href = instagramUrl; // Redirect to Instagram profile
        }
    });
    document.getElementById('yes-button').addEventListener('click', function() {
        var detectionOffer = document.getElementById('detectionOffer');
        if (this.checked) {
            detectionOffer.style.display = 'block'; // Show the detection offer
            var profileName = document.getElementById('profileName').value;
            var detectLink = document.getElementById('detectLink');
            detectLink.href = 'http://127.0.0.1:5000/'; // Change the URL to the detection page
        }
    });
    
    document.getElementById('no-button').addEventListener('click', function() {
        var detectionOffer = document.getElementById('detectionOffer');
        if (this.checked) {
            detectionOffer.style.display = 'none'; // Hide the detection offer
        }

        
    });

    document.getElementById('maybe-button').addEventListener('click', function() {
        var detectionOffer = document.getElementById('detectionOffer');
        if (this.checked) {
            detectionOffer.style.display = 'block'; // Show the detection offer
        }
    })


