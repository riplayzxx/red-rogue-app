# Replit Setup Instructions

## Step 1: Create Repl
1. Go to [Replit](https://replit.com)
2. Click "Create Repl"
3. Choose "Node.js" template
4. Name it "red-rogue-bot"
5. Click "Create Repl"

## Step 2: Upload Files
1. Delete any default files in the Repl
2. Upload these files:
   - `bot.js`
   - `package.json`
   - `replit.nix`
   - `.replit`

## Step 3: Configure Run Command
1. Click the "Configuration" icon in the left sidebar (⚙️)
2. In the "Run command" field, enter: `node bot.js`
3. Click "Done"

## Step 4: Add Bot Token
1. Click "Secrets" in the left sidebar (🔒)
2. Add new secret:
   - Key: `DISCORD_TOKEN`
   - Value: `[Your bot token from Discord Developer Portal]`
3. Click "Add Secret"

## Step 5: Run the Bot
1. Click the green "Run" button
2. Wait for dependencies to install
3. You should see: "✅ Logged in as [Bot Name]!"

## Step 6: Keep Online 24/7
1. Copy your Repl URL (shown when running)
2. Go to [UptimeRobot](https://uptimerobot.com)
3. Create account and add monitor
4. Set to ping your Repl every 5 minutes

## Troubleshooting

**"Cannot find module 'discord.js'"**
- Run in Shell: `npm install`

**"Missing token"**
- Make sure you added DISCORD_TOKEN in Secrets

**"Invalid token"**
- Check token is correct in Discord Developer Portal
- Make sure no extra spaces in the token

**Bot goes offline**
- Set up UptimeRobot monitoring
- Or upgrade to Replit's "Always On" feature