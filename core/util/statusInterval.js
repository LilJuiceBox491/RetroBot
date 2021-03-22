const statuses = require('../constants/statuses');

module.exports = (client) => {
    client.user.setPresence({ activity: { type: 'LISTENING', name: 'startup events...'}, status: 'dnd' });
    setInterval(() => {
        const rand = Math.floor(Math.random() * statuses.length);
        const status = statuses[rand];
        const statusName = status.name.replace('{prefix}', client.config.prefix);

        client.user.setPresence({ activity: { type: status.type, name: statusName}, status: status.status });
    }, 20000);
}