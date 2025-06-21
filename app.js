// Configuration - You'll need to update these values
const CLIENT_ID = '1385867026827968512'; // Your Discord app client ID
const REDIRECT_URI = window.location.origin + '/callback.html'; // Update for production
const DISCORD_API_ENDPOINT = 'https://discord.com/api/v10';
const GUILD_ID = '1362760900825845810'; // Your Discord server ID

// Elements
const authContainer = document.getElementById('authContainer');
const userInfo = document.getElementById('userInfo');
const guestInfo = document.getElementById('guestInfo');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const discordLogin = document.getElementById('discordLogin');
const guestMode = document.getElementById('guestMode');
const logoutBtn = document.getElementById('logoutBtn');
const exitGuestBtn = document.getElementById('exitGuestBtn');

// Check authentication status on load
window.addEventListener('load', () => {
    checkAuthStatus();
});

// Discord login button
discordLogin.addEventListener('click', (e) => {
    e.preventDefault();
    initiateDiscordOAuth();
});

// Guest mode button
guestMode.addEventListener('click', () => {
    enterGuestMode();
});

// Logout button
logoutBtn.addEventListener('click', () => {
    logout();
});

// Exit guest mode button
exitGuestBtn.addEventListener('click', () => {
    exitGuestMode();
});

function checkAuthStatus() {
    const token = localStorage.getItem('discord_token');
    const guestMode = localStorage.getItem('guest_mode');
    
    if (token) {
        // User is authenticated with Discord
        fetchUserInfo(token);
    } else if (guestMode === 'true') {
        // User is in guest mode
        showGuestMode();
    } else {
        // User is not authenticated
        showAuthOptions();
    }
}

function initiateDiscordOAuth() {
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        scope: 'identify guilds'
    });
    
    window.location.href = `https://discord.com/api/oauth2/authorize?${params}`;
}

function fetchUserInfo(token) {
    loading.classList.add('active');
    authContainer.style.display = 'none';
    
    fetch(`${DISCORD_API_ENDPOINT}/users/@me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }
        return response.json();
    })
    .then(user => {
        displayUserInfo(user);
        loading.classList.remove('active');
    })
    .catch(err => {
        console.error('Error fetching user info:', err);
        showError('Failed to load user information. Please try logging in again.');
        logout();
    });
}

function displayUserInfo(user) {
    document.getElementById('userName').textContent = user.username;
    document.getElementById('userDiscriminator').textContent = `#${user.discriminator || '0'}`;
    
    if (user.avatar) {
        document.getElementById('userAvatar').src = 
            `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    } else {
        document.getElementById('userAvatar').src = 
            `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator || 0) % 5}.png`;
    }
    
    authContainer.style.display = 'none';
    guestInfo.style.display = 'none';
    userInfo.classList.add('active');
    
    // Check server membership and fetch additional data
    const token = localStorage.getItem('discord_token');
    checkServerMembership(token, user.id);
}

function enterGuestMode() {
    localStorage.setItem('guest_mode', 'true');
    showGuestMode();
}

function showGuestMode() {
    authContainer.style.display = 'none';
    userInfo.classList.remove('active');
    guestInfo.style.display = 'block';
}

function showAuthOptions() {
    authContainer.style.display = 'flex';
    userInfo.classList.remove('active');
    guestInfo.style.display = 'none';
}

function logout() {
    localStorage.removeItem('discord_token');
    localStorage.removeItem('guest_mode');
    showAuthOptions();
}

function exitGuestMode() {
    localStorage.removeItem('guest_mode');
    showAuthOptions();
}

function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
    loading.classList.remove('active');
    
    setTimeout(() => {
        error.style.display = 'none';
    }, 5000);
}

async function checkServerMembership(token, userId) {
    try {
        // Check if user is in the server
        const response = await fetch(`${DISCORD_API_ENDPOINT}/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch guilds');
        }
        
        const guilds = await response.json();
        const isInServer = guilds.some(guild => guild.id === GUILD_ID);
        
        if (isInServer) {
            // User is in the server, show dashboard button
            showDashboardAccess();
            // Fetch server stats
            fetchServerStats(token);
        } else {
            // User is not in the server
            showJoinServerPrompt();
        }
    } catch (err) {
        console.error('Error checking server membership:', err);
    }
}

function showDashboardAccess() {
    const dashboardBtn = document.createElement('a');
    dashboardBtn.href = '/dashboard.html';
    dashboardBtn.className = 'btn btn-discord';
    dashboardBtn.textContent = 'View Server Dashboard';
    dashboardBtn.style.marginTop = '1rem';
    userInfo.appendChild(dashboardBtn);
}

function showJoinServerPrompt() {
    const joinPrompt = document.createElement('div');
    joinPrompt.innerHTML = `
        <div style="margin-top: 2rem; padding: 1rem; background: #1a1a1a; border-radius: 8px; border: 1px solid #ff4444;">
            <p style="margin-bottom: 1rem;">You're not a member of our Discord server yet!</p>
            <a href="https://discord.gg/55q9dPMdUv" class="btn btn-discord" target="_blank">
                Join Red Rogue Server
            </a>
        </div>
    `;
    userInfo.appendChild(joinPrompt);
}

async function fetchServerStats(token) {
    // Store token for use in dashboard
    sessionStorage.setItem('temp_token', token);
}