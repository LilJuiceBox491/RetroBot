const statusInterval = require('../util/statusInterval');
const Help = require('../Handlers/Help');

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

        //Cycle Status
        statusInterval(client);

        // User Cache Sweep, only uncomment this when it becomes strictly necessary.
        //purgeCachedUsers(client);
    }
}