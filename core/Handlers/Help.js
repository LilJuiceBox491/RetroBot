const groups = require('../constants/groups');

/**
 * Initializes help command.
 * @param {Discord.Client} client Your Client
 */
module.exports = (client) => {
    client.helpArr = []
    groups.forEach(group => {
        // Filter for the commands in the group.
        const cmd = [...client.commands.filter(m => m.config.group === group.id).values()]

        client.helpArr.push({
            group: group, 
            value: cmd.length > 0 ? cmd.map(m => `\`${m.config.name.toUpperCase()}\` : ${m.config.description}`).join('\n') : 'None.'
        });
    });
}