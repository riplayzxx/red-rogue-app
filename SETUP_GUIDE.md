# Red Rogue Discord Website Setup Guide

This guide will walk you through setting up your Discord-integrated website on Replit and deploying it to Vercel.

## Prerequisites
- Discord account
- Replit account
- Vercel account
- GitHub account (for Vercel deployment)

## Step 1: Create Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and name it (e.g., "Red Rogue Website")
3. Go to "OAuth2" section in the sidebar
4. Copy your **Client ID** and save it
5. Click "Reset Secret" to generate a **Client Secret** and save it (keep this private!)
6. Add redirect URLs:
   - For development: `http://localhost:3000/callback.html`
   - For production: `https://your-vercel-app.vercel.app/callback.html`

## Step 2: Set Up on Replit

1. Create a new Repl and choose "HTML, CSS, JS" template
2. Upload all the files from this project:
   - `index.html`
   - `app.js`
   - `callback.html`
   - `vercel.json`
   - `api/discord-auth.js`

3. Update the configuration in `app.js`:
   ```javascript
   const CLIENT_ID = 'YOUR_DISCORD_CLIENT_ID'; // Replace with your actual Client ID
   ```

4. For testing on Replit, you can run the site directly

## Step 3: Connect to GitHub

1. In your Replit project, click on the Git icon in the sidebar
2. Initialize a new Git repository
3. Connect to your GitHub account
4. Create a new repository (e.g., "red-rogue-website")
5. Push your code to GitHub

## Step 4: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Import Project"
4. Select your GitHub repository
5. Configure environment variables:
   - `DISCORD_CLIENT_ID`: Your Discord Client ID
   - `DISCORD_CLIENT_SECRET`: Your Discord Client Secret
   - `DISCORD_REDIRECT_URI`: `https://your-app.vercel.app/callback.html`
6. Click "Deploy"

## Step 5: Update Discord OAuth Settings

1. Go back to Discord Developer Portal
2. In OAuth2 settings, add your Vercel URL to redirects:
   - `https://your-vercel-app.vercel.app/callback.html`
3. Save changes

## Step 6: Connect to Your Discord Server

To link this to your Discord server:

1. In Discord Developer Portal, go to "Bot" section
2. Create a bot if you haven't already
3. Go to "OAuth2" > "URL Generator"
4. Select scopes: `bot` and `applications.commands`
5. Select bot permissions as needed
6. Use the generated URL to invite the bot to your server

## Features

- **Discord Login**: Users can authenticate with their Discord account
- **Guest Mode**: Users can browse without logging in (limited features)
- **Black Theme**: Sleek dark design
- **Secure**: Client secret is kept server-side using Vercel Functions

## Customization

### Styling
Edit the CSS in `index.html` to change:
- Colors (currently red accent: `#ff4444`)
- Fonts
- Layout

### Functionality
- Add more Discord API features in `app.js`
- Create additional pages
- Add server-specific content based on guild membership

## Security Notes

1. **Never expose your Client Secret** in client-side code
2. Use environment variables for sensitive data
3. The provided `api/discord-auth.js` handles token exchange securely
4. Consider implementing rate limiting for production

## Troubleshooting

### "Invalid OAuth2 redirect_uri"
- Make sure your redirect URLs in Discord match exactly
- Include the protocol (https://) and path (/callback.html)

### Token not working
- Check that your Client ID and Secret are correct
- Ensure environment variables are set in Vercel

### CORS errors
- The API endpoint includes CORS headers
- For development, you may need to use a proxy

## Next Steps

1. Add Discord server verification (check if user is in your server)
2. Implement role-based access
3. Add more interactive features
4. Create a dashboard for server members

Need help? Check the Discord Developer Documentation or reach out to the community!