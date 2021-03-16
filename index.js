const Discord = require('discord.js');
const client = new Discord.Client({
    messageCacheMaxSize: 10,
    messageCacheLifetime: 5 * 60,
    messageSweepInterval: 5 * 60,
    userCacheLifetime: 60 * 60,
    userSweepInterval: 5 * 60
});

client.log = require('./core/util/Logger');

// Run initialization.
const init = require('./core/init');
init(client);


// If a .env is available, it will use the token defined there, if not, it will use a local token.
// eslint-disable-next-line no-undef
const token = process.env.TOKEN ? process.env.TOKEN : require('./test/token');
client.login(token);