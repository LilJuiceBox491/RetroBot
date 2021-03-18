const Discord = require('discord.js');
const client = new Discord.Client({
    messageCacheMaxSize: 10, // This can be increased as needed.
    messageCacheLifetime: 5 * 60, // I recommend you keep this the same.
    messageSweepInterval: 5 * 60, // ^
    userCacheLifetime: 60 * 60, // These are for custom user cache sweeping, leave them alone.
    userSweepInterval: 5 * 60 // ^
});

client.log = require('./core/util/Logger');
client.commandsRun = 0;

// Run initialization.
const init = require('./core/init');
init(client);


// If a .env is available, it will use the token defined there, if not, it will use a local token.
// eslint-disable-next-line no-undef
const token = process.env.TOKEN ? process.env.TOKEN : require('./test/token');
client.login(token);