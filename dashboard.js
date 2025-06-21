const GUILD_ID = '1362760900825845810';
const DISCORD_API_ENDPOINT = 'https://discord.com/api/v10';

// Elements
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const dashboardContent = document.getElementById('dashboardContent');
const errorMessage = document.getElementById('errorMessage');

// Check authentication and load dashboard
window.addEventListener('load', async () => {
    const token = localStorage.getItem('discord_token');
    
    if (!token) {
        showError('You must be logged in to view the dashboard');
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
        return;
    }
    
    try {
        // Fetch current user data
        const userData = await fetchUserData(token);
        displayCurrentUser(userData);
        
        // Fetch server data through our API
        await fetchServerData(token);
        
        // Show dashboard
        loadingState.style.display = 'none';
        dashboardContent.style.display = 'block';
    } catch (err) {
        console.error('Dashboard error:', err);
        showError('Failed to load dashboard data. Please try again.');
    }
});

async function fetchUserData(token) {
    const response = await fetch(`${DISCORD_API_ENDPOINT}/users/@me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    
    return await response.json();
}

function displayCurrentUser(user) {
    document.getElementById('currentUserName').textContent = user.username;
    
    if (user.avatar) {
        document.getElementById('currentUserAvatar').src = 
            `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    } else {
        document.getElementById('currentUserAvatar').src = 
            `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator || 0) % 5}.png`;
    }
}

async function fetchServerData(token) {
    try {
        // Call our API endpoint
        const response = await fetch('/api/server-stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                token,
                guildId: GUILD_ID 
            }),
        });
        
        if (!response.ok) {
            // If API fails, show mock data for demo
            console.error('API failed:', response.status);
            displayMockServerData();
            return;
        }
        
        const data = await response.json();
        console.log('Server data received:', data);
        displayServerData(data);
    } catch (err) {
        console.error('Error fetching server data:', err);
        // Show mock data for demo
        displayMockServerData();
    }
}

function displayMockServerData() {
    // Display mock data for demonstration
    document.getElementById('serverName').textContent = 'Red Rogue Community';
    document.getElementById('memberCount').textContent = '1,247';
    document.getElementById('onlineCount').textContent = '342';
    document.getElementById('channelCount').textContent = '25';
    document.getElementById('roleCount').textContent = '15';
    
    // Mock channels
    const channelList = document.getElementById('channelList');
    const mockChannels = ['📢 announcements', '💬 general', '🎮 gaming', '🎨 creative', '🔊 voice-1'];
    channelList.innerHTML = mockChannels.map(channel => 
        `<li class="channel-item"><span class="channel-icon">#</span> ${channel}</li>`
    ).join('');
    
    // Mock roles
    const roleList = document.getElementById('roleList');
    const mockRoles = [
        { name: 'Admin', color: '#ff4444' },
        { name: 'Moderator', color: '#5865F2' },
        { name: 'Member', color: '#57F287' },
        { name: 'VIP', color: '#FEE75C' }
    ];
    roleList.innerHTML = mockRoles.map(role => 
        `<span class="role-badge" style="background: ${role.color}22; color: ${role.color}; border: 1px solid ${role.color}44;">${role.name}</span>`
    ).join('');
    
    // Mock online members
    const memberList = document.getElementById('memberList');
    const mockMembers = [
        { name: 'RedLeader', status: 'online' },
        { name: 'RogueOne', status: 'idle' },
        { name: 'ShadowPlayer', status: 'dnd' },
        { name: 'NightHawk', status: 'online' },
        { name: 'CrimsonBlade', status: 'online' }
    ];
    memberList.innerHTML = mockMembers.map(member => `
        <div class="member-item">
            <img class="member-avatar" src="https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 5)}.png" alt="${member.name}">
            <span>${member.name}</span>
        </div>
    `).join('');
    
    // Mock server info
    document.getElementById('serverCreated').textContent = 'April 28, 2021';
    document.getElementById('serverRegion').textContent = 'US East';
    document.getElementById('boostLevel').textContent = 'Level 2';
    document.getElementById('boostCount').textContent = '14';
    
    // Mock activity
    document.getElementById('messagestoday').textContent = '2,847';
    document.getElementById('newMembers').textContent = '12';
    document.getElementById('voiceActive').textContent = '3';
}

function displayServerData(data) {
    // Display real server data when API is working
    document.getElementById('serverName').textContent = data.name || 'Red Rogue Community';
    document.getElementById('memberCount').textContent = data.memberCount?.toLocaleString() || '0';
    document.getElementById('onlineCount').textContent = data.onlineCount?.toLocaleString() || '0';
    document.getElementById('channelCount').textContent = data.channelCount || '0';
    document.getElementById('roleCount').textContent = data.roleCount || '0';
    
    // Display server info
    if (data.premiumTier !== undefined) {
        document.getElementById('boostLevel').textContent = `Level ${data.premiumTier}`;
    }
    if (data.premiumSubscriptionCount !== undefined) {
        document.getElementById('boostCount').textContent = data.premiumSubscriptionCount;
    }
    
    // Calculate server creation date from ID
    if (data.id) {
        const creationTimestamp = Number(BigInt(data.id) >> 22n) + 1420070400000;
        const creationDate = new Date(creationTimestamp);
        document.getElementById('serverCreated').textContent = creationDate.toLocaleDateString();
    }
    
    // Display channels if available
    if (data.channels && data.channels.length > 0) {
        const channelList = document.getElementById('channelList');
        channelList.innerHTML = data.channels.slice(0, 5).map(channel => 
            `<li class="channel-item"><span class="channel-icon">#</span> ${channel.name}</li>`
        ).join('');
    }
    
    // Display roles if available
    if (data.roles && data.roles.length > 0) {
        const roleList = document.getElementById('roleList');
        roleList.innerHTML = data.roles.map(role => 
            `<span class="role-badge" style="background: #${role.color.toString(16).padStart(6, '0')}22; color: #${role.color.toString(16).padStart(6, '0')}; border: 1px solid #${role.color.toString(16).padStart(6, '0')}44;">${role.name}</span>`
        ).join('');
    }
}

function showError(message) {
    errorMessage.textContent = message;
    loadingState.style.display = 'none';
    errorState.style.display = 'block';
    dashboardContent.style.display = 'none';
}