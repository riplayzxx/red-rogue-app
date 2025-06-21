const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const express = require('express');
const app = express();

// Create Discord client
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
    ] 
});

// Bot token - Set this in Replit Secrets
const TOKEN = process.env.DISCORD_TOKEN || 'YOUR_BOT_TOKEN_HERE';

// When bot is ready
client.on('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}!`);
    console.log(`📊 Serving ${client.guilds.cache.size} servers`);
    
    // Set bot status
    client.user.setActivity('Red Rogue SSN2', { type: ActivityType.Playing });
    
    // Alternative status options:
    // client.user.setActivity('!help', { type: ActivityType.Listening });
    // client.user.setActivity('red-rogue-app.vercel.app', { type: ActivityType.Watching });
});

// Simple command handler
client.on('messageCreate', async (message) => {
    // Ignore bot messages
    if (message.author.bot) return;
    
    // Simple ping command
    if (message.content === '!ping') {
        message.reply('🏓 Pong!');
    }
    
    // Server info command
    if (message.content === '!serverinfo') {
        const { guild } = message;
        const embed = {
            color: 0xff4444,
            title: `📊 ${guild.name} Stats`,
            thumbnail: {
                url: guild.iconURL({ dynamic: true })
            },
            fields: [
                {
                    name: '👥 Total Members',
                    value: guild.memberCount.toString(),
                    inline: true
                },
                {
                    name: '🟢 Online',
                    value: guild.members.cache.filter(m => m.presence?.status !== 'offline').size.toString(),
                    inline: true
                },
                {
                    name: '📅 Created',
                    value: guild.createdAt.toDateString(),
                    inline: true
                },
                {
                    name: '💎 Boost Level',
                    value: guild.premiumTier.toString(),
                    inline: true
                },
                {
                    name: '✨ Boosts',
                    value: guild.premiumSubscriptionCount?.toString() || '0',
                    inline: true
                },
                {
                    name: '👑 Owner',
                    value: `<@${guild.ownerId}>`,
                    inline: true
                }
            ],
            footer: {
                text: '🌐 Visit red-rogue-app.vercel.app'
            },
            timestamp: new Date()
        };
        
        message.reply({ embeds: [embed] });
    }
    
    // Website link command
    if (message.content === '!website') {
        message.reply('🌐 Visit our website: https://red-rogue-app.vercel.app');
    }
    
    // Help command
    if (message.content === '!help') {
        const helpEmbed = {
            color: 0xff4444,
            title: '📋 Red Rogue Bot Commands',
            fields: [
                {
                    name: '!ping',
                    value: 'Check if bot is online'
                },
                {
                    name: '!serverinfo',
                    value: 'Display server statistics'
                },
                {
                    name: '!website',
                    value: 'Get the website link'
                },
                {
                    name: '!members',
                    value: 'Show member count'
                }
            ]
        };
        
        message.reply({ embeds: [helpEmbed] });
    }
    
    // Member count command
    if (message.content === '!members') {
        const onlineCount = message.guild.members.cache.filter(m => m.presence?.status !== 'offline').size;
        message.reply(`👥 **Members:** ${message.guild.memberCount}\n🟢 **Online:** ${onlineCount}`);
    }
});

// Welcome message for new members
client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(ch => ch.name === 'welcome' || ch.name === 'general');
    if (!welcomeChannel) return;
    
    const welcomeEmbed = {
        color: 0xff4444,
        title: '👋 Welcome to Red Rogue!',
        description: `Welcome ${member}! You are member #${member.guild.memberCount}`,
        thumbnail: {
            url: member.user.displayAvatarURL({ dynamic: true })
        },
        fields: [
            {
                name: '🌐 Website',
                value: '[Visit Dashboard](https://red-rogue-app.vercel.app)',
                inline: true
            },
            {
                name: '📜 Rules',
                value: 'Check #rules channel',
                inline: true
            }
        ],
        timestamp: new Date()
    };
    
    welcomeChannel.send({ embeds: [welcomeEmbed] });
});

// Express server (keeps Replit alive)
app.get('/', (req, res) => {
    res.send(`
        <h1>Red Rogue Bot Status</h1>
        <p>✅ Bot is online!</p>
        <p>👤 Logged in as: ${client.user ? client.user.tag : 'Starting...'}</p>
        <p>📊 Servers: ${client.guilds.cache.size}</p>
        <p>🌐 <a href="https://red-rogue-app.vercel.app">Visit Website</a></p>
    `);
});

// Start Express server
app.listen(3000, () => {
    console.log('🌐 Web server is ready on port 3000');
});

// Login to Discord
client.login(TOKEN);