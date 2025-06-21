// Updated callback handler that uses the API endpoint
async function exchangeCodeForToken(code) {
    try {
        const response = await fetch('/api/discord-auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to exchange code for token');
        }
        
        const data = await response.json();
        
        // Store the token
        localStorage.setItem('discord_token', data.access_token);
        
        // Redirect to home
        window.location.href = '/';
    } catch (error) {
        console.error('Authentication error:', error);
        showError('Failed to complete authentication. Please try again.');
        redirectToHome();
    }
}