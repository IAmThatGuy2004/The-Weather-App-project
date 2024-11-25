document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send the login credentials to the server
    try {
        const response = await fetch('/login', { // Replace '/login' with our backend login endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        const result = await response.json();

        if (result.success) {
            // Login successful
            // Optionally store some login state
            // Redirect to main page
            window.location.href = 'main.html';
        } else {
            // Login failed
            document.getElementById('error-message').textContent = 'Incorrect username or password. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'An error occurred. Please try again later.';
    }
});
