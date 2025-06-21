// This is a Vercel serverless function for handling Discord OAuth
// Place this file in /api/discord-auth.js

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
    
    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({ error: 'Authorization code required' });
    }
    
    const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
    const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
    const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
    
    try {
        console.log('Discord Auth Debug:', {
            CLIENT_ID,
            REDIRECT_URI,
            hasClientSecret: !!CLIENT_SECRET,
            codeLength: code.length
        });
        
        // Exchange code for token
        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
        });
        
        console.log('Token exchange params:', params.toString());
        
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        });
        
        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json();
            console.error('Discord token exchange failed:', errorData);
            throw new Error(`Failed to exchange code for token: ${errorData.error || 'Unknown error'}`);
        }
        
        const tokenData = await tokenResponse.json();
        
        // Return the access token to the client
        // In production, you might want to store this server-side and return a session token instead
        return res.status(200).json({
            access_token: tokenData.access_token,
            token_type: tokenData.token_type,
            expires_in: tokenData.expires_in,
            scope: tokenData.scope,
        });
    } catch (error) {
        console.error('Discord auth error:', error);
        return res.status(500).json({ 
            error: 'Authentication failed',
            details: error.message,
            redirect_uri_used: REDIRECT_URI 
        });
    }
}