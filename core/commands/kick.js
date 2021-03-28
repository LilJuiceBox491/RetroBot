
/**
 * @type {RB.Command}
 */
module.exports = {
    config: {
        name: 'kick',
        aliases: [],
        permissions: ['KICK_MEMBERS'],
        clientPermissions: ['KICK_MEMBERS'],
        ownerOnly: true,
        group: 'mod',
        description: '*Coming Soon...*',
        usage: 'kick <mention|id> [reason]'
    },
    run: (client, message, args) => {
        return;
    }
}