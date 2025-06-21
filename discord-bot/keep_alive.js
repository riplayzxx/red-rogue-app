// This file helps keep your bot online using UptimeRobot
// Not needed if you have Replit's Always On feature

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bot is alive!');
});

function keepAlive() {
    app.listen(3000, () => {
        console.log('Keep-alive server is ready.');
    });
}

module.exports = keepAlive;