# Red Rogue Discord Integration

A Discord-integrated website with authentication, server stats dashboard, and a Discord bot.

## 🌐 Live Website
Visit: [red-rogue-app.vercel.app](https://red-rogue-app.vercel.app)

## 📁 Project Structure

```
red-rogue-app/
├── index.html          # Main landing page
├── app.js             # Frontend authentication logic
├── callback.html      # Discord OAuth callback page
├── dashboard.html     # Server statistics dashboard
├── dashboard.js       # Dashboard functionality
├── vercel.json        # Vercel deployment config
├── api/
│   ├── discord-auth.js    # OAuth token exchange
│   └── server-stats.js    # Server data API
└── discord-bot/
    ├── bot.js         # Discord bot code
    ├── package.json   # Bot dependencies
    └── README.md      # Bot setup guide
```

## 🚀 Features

### Website
- ✅ Discord OAuth login
- ✅ Guest mode access
- ✅ Server membership verification
- ✅ Live server statistics dashboard
- ✅ Member, channel, and role display
- ✅ Black/red theme design

### Discord Bot
- ✅ Server info commands
- ✅ Welcome messages
- ✅ Member tracking
- ✅ Custom status
- ✅ Website integration

## 🛠️ Setup Instructions

### Website Deployment

1. **Fork/Clone this repository**

2. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Set Environment Variables in Vercel:**
   - `DISCORD_CLIENT_ID` - Your Discord app client ID
   - `DISCORD_CLIENT_SECRET` - Your Discord app client secret
   - `DISCORD_BOT_TOKEN` - Your Discord bot token
   - `DISCORD_REDIRECT_URI` - `https://your-app.vercel.app/callback.html`

4. **Configure Discord App:**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Add redirect URI: `https://your-app.vercel.app/callback.html`
   - Add bot to your server

### Discord Bot Setup

1. **Create a new Repl on [Replit](https://replit.com)**
   - Choose Node.js template
   - Name it "red-rogue-bot"

2. **Upload bot files from `discord-bot/` folder**

3. **Run the bot** - Click "Run" button

4. **Keep online 24/7** - Use [UptimeRobot](https://uptimerobot.com)

## 🔧 Configuration

### Update Server ID
Edit `app.js` and `dashboard.js`:
```javascript
const GUILD_ID = 'YOUR_SERVER_ID';
```

### Update Bot Token
Edit `discord-bot/bot.js`:
```javascript
const TOKEN = 'YOUR_BOT_TOKEN';
```

### Customize Theme
Edit CSS in `index.html` and `dashboard.html`

## 📝 Bot Commands

- `!ping` - Check bot status
- `!serverinfo` - Display server stats
- `!website` - Get website link
- `!members` - Show member count
- `!help` - List all commands

## 🔒 Security Notes

- Never commit tokens to GitHub
- Use environment variables for sensitive data
- Bot token should only be in Replit Secrets
- Client secret must stay server-side

## 📜 License

MIT License - feel free to use for your own Discord server!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---
Made with ❤️ for the Red Rogue community