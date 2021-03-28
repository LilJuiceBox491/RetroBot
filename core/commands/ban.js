/**
 * @type {RB.Command}
 */
module.exports = {
    config: {
        name: 'ban',
        aliases: [],
        permissions: ['BAN_MEMBERS'],
        clientPermissions: ['BAN_MEMBERS'],
        ownerOnly: true,
        group: 'mod',
        description: '*Coming Soon...*',
        usage: 'ban <mention|id> [reason]'
    },
    run: (client, message, args) => {
        return;
    }
}