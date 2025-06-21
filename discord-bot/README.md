# Red Rogue Discord Bot

This bot runs on Replit and provides commands and features for your Discord server.

## Setup Instructions

1. **Create a new Repl on Replit**
   - Go to [Replit](https://replit.com)
   - Click "Create Repl"
   - Choose "Node.js" template
   - Name it "red-rogue-bot"

2. **Upload these files:**
   - `bot.js` - Main bot code
   - `package.json` - Dependencies
   - `.replit` - Replit configuration
   - `keep_alive.js` - Optional keep-alive server

3. **Run the bot:**
   - Click the "Run" button
   - The bot will install dependencies and start
   - You'll see "✅ Logged in as Red Rogue#XXXX!"

4. **Keep it online 24/7 (FREE):**
   - Option 1: Use Replit's Deployments (limited free hours)
   - Option 2: Use UptimeRobot:
     1. Copy your Repl's URL (e.g., https://red-rogue-bot.username.repl.co)
     2. Go to [UptimeRobot](https://uptimerobot.com)
     3. Create free account
     4. Add New Monitor → HTTP(s) → Paste your Repl URL
     5. Set interval to 5 minutes
     6. The bot will stay online!

## Bot Commands

- `!ping` - Check if bot is online
- `!serverinfo` - Display server statistics
- `!website` - Get the website link
- `!members` - Show member count
- `!help` - List all commands

## Features

- ✅ Welcome messages for new members
- ✅ Server statistics
- ✅ Custom status ("Playing Red Rogue SSN2")
- ✅ Web dashboard at red-rogue-app.vercel.app
- ✅ Member count tracking

## Customization

Edit `bot.js` to:
- Change bot status (line 24)
- Add new commands (line 33+)
- Modify welcome message (line 108+)
- Change embed colors (0xff4444 = red)

## Environment Variables (REQUIRED)

For security, you MUST use Replit Secrets:
1. Click on "Secrets" (🔒 icon) in your Repl
2. Add key: `DISCORD_TOKEN`
3. Add value: Your bot token (get it from Discord Developer Portal)
4. Click "Add Secret"
5. The bot will automatically use this token

**Never put your bot token directly in the code!**

## Troubleshooting

- **Bot not coming online?** Check the console for errors
- **Commands not working?** Make sure bot has proper permissions
- **Bot going offline?** Set up UptimeRobot monitoring