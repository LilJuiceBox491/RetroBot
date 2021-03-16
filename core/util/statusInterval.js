const statuses = require('../constants/statuses');

module.exports = (client) => {
    setInterval(() => {
        const rand = Math.floor(Math.random() * statuses.length);
        const status = statuses[rand];
        const statusName = status.name.replace('{prefix}', client.config.prefix);

        client.user.setPresence({ activity: { type: status.type, name: statusName}, status: 'online' });
    }, 20000);
}