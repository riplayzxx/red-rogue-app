export default async function handler(req, res) {
    // Only show in development or with secret query param
    if (req.query.secret !== 'debug123') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    
    return res.status(200).json({
        hasClientId: !!process.env.DISCORD_CLIENT_ID,
        hasClientSecret: !!process.env.DISCORD_CLIENT_SECRET,
        hasRedirectUri: !!process.env.DISCORD_REDIRECT_URI,
        hasBotToken: !!process.env.DISCORD_BOT_TOKEN,
        redirectUri: process.env.DISCORD_REDIRECT_URI,
        clientId: process.env.DISCORD_CLIENT_ID,
    });
}