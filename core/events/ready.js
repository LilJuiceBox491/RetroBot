const statusInterval = require('../util/statusInterval');
const Help = require('../Handlers/Help');
const moment = require('moment');

// eslint-disable-next-line no-unused-vars
const purgeCachedUsers = require('../util/purgeCachedUsers');

module.exports = {
    config: {
        name: 'ready'
    },
    run: (client) => {
        // Initialize Help Command
        Help(client);

        client.log.ready(`${client.user.username} is now awake in ${client.guilds.cache.size} servers!`);
        client.lastReset = moment().format('MM/DD/YYYY HH:mm:ss');

        //Cycle Status
        statusInterval(client);

        // User Cache Sweep, only uncomment this when it becomes strictly necessary.
        //purgeCachedUsers(client);
    }
}