export default async function handler(req, res) {
    // Simple debug endpoint to check bot connection
    const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    const GUILD_ID = '1362760900825845810';
    
    if (!BOT_TOKEN) {
        return res.status(500).json({ error: 'Bot token not configured' });
    }
    
    try {
        // Test bot token by fetching guild info
        const response = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}`, {
            headers: {
                Authorization: `Bot ${BOT_TOKEN.trim()}` // Trim any whitespace
            }
        });
        
        if (!response.ok) {
            const error = await response.text();
            return res.status(response.status).json({ 
                error: 'Bot API request failed',
                status: response.status,
                details: error
            });
        }
        
        const guildData = await response.json();
        
        return res.status(200).json({
            success: true,
            guild: {
                name: guildData.name,
                id: guildData.id,
                memberCount: guildData.approximate_member_count,
                onlineCount: guildData.approximate_presence_count,
                premiumTier: guildData.premium_tier,
                boosts: guildData.premium_subscription_count
            }
        });
    } catch (error) {
        return res.status(500).json({ 
            error: 'Failed to connect to Discord',
            details: error.message 
        });
    }
}