// Vercel serverless function for fetching Discord server stats
// Note: This requires a bot token with proper permissions to access server data

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { token, guildId } = req.body;
    
    if (!token || !guildId) {
        return res.status(400).json({ error: 'Token and guild ID required' });
    }
    
    try {
        // First verify the user is in the guild
        const guildsResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (!guildsResponse.ok) {
            throw new Error('Failed to fetch user guilds');
        }
        
        const guilds = await guildsResponse.json();
        const userGuild = guilds.find(g => g.id === guildId);
        
        if (!userGuild) {
            return res.status(403).json({ error: 'User is not a member of this server' });
        }
        
        // Get basic guild info available to users
        // Note: Full server stats require a bot token with proper permissions
        // For now, return what's available from the user's perspective
        const serverData = {
            id: userGuild.id,
            name: userGuild.name,
            icon: userGuild.icon,
            owner: userGuild.owner,
            permissions: userGuild.permissions,
            features: userGuild.features,
            
            // These would require bot token to get actual data
            memberCount: null, // Requires bot token
            onlineCount: null, // Requires bot token
            channelCount: null, // Requires bot token
            roleCount: null, // Requires bot token
            
            // User-specific data
            userPermissions: userGuild.permissions,
            isOwner: userGuild.owner || false
        };
        
        // If you have a bot token, you can fetch more detailed stats:
        const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN?.trim();
        
        if (BOT_TOKEN) {
            try {
                // Fetch guild details with bot token
                const guildResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
                    headers: {
                        Authorization: `Bot ${BOT_TOKEN}`
                    }
                });
                
                if (guildResponse.ok) {
                    const guildData = await guildResponse.json();
                    serverData.memberCount = guildData.approximate_member_count;
                    serverData.onlineCount = guildData.approximate_presence_count;
                    serverData.premiumTier = guildData.premium_tier;
                    serverData.premiumSubscriptionCount = guildData.premium_subscription_count;
                }
                
                // Fetch channels
                const channelsResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, {
                    headers: {
                        Authorization: `Bot ${BOT_TOKEN}`
                    }
                });
                
                if (channelsResponse.ok) {
                    const channels = await channelsResponse.json();
                    serverData.channelCount = channels.length;
                    serverData.channels = channels.slice(0, 10).map(ch => ({
                        id: ch.id,
                        name: ch.name,
                        type: ch.type
                    }));
                }
                
                // Fetch roles
                const rolesResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
                    headers: {
                        Authorization: `Bot ${BOT_TOKEN}`
                    }
                });
                
                if (rolesResponse.ok) {
                    const roles = await rolesResponse.json();
                    serverData.roleCount = roles.length;
                    serverData.roles = roles.filter(r => r.name !== '@everyone').slice(0, 10).map(r => ({
                        id: r.id,
                        name: r.name,
                        color: r.color,
                        position: r.position
                    }));
                }
            } catch (botError) {
                console.error('Bot API error:', botError);
                // Continue with limited data
            }
        }
        
        return res.status(200).json(serverData);
    } catch (error) {
        console.error('Server stats error:', error);
        return res.status(500).json({ error: 'Failed to fetch server stats' });
    }
}