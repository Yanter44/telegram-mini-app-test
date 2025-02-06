window.onload = function () {
    fetch('https://cbf4-178-173-127-190.ngrok-free.app/api/data/GetToken', {
        method: 'GET', // HTTP method
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server returned an error: ' + response.statusText);
        }
        return response.json(); // Parse the response as JSON
    })
    .then(data => {
        if (data.token) {
            console.log('Token received:', data.token);
            // Redirect to index.html after success
            window.location.href = 'index.html';
        } else {
            console.error('No token received');
        }
    })
    .catch(error => {
        console.error('Error fetching the token:', error);
    });
};
