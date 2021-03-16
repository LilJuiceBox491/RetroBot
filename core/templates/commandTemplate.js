/* eslint-disable no-unused-vars */
// Remove the above comment.

module.exports = {
    config: {
        name: '', // Command Name
        aliases: [], // Alternate Names
        permissions: [], // Permissions required by users to execute this command.
        clientPermissions: [], // Permissions that the client needs to execute this command.
        group: 'util', // The command's group (found in core/constants/groups.js)
        description: 'Replies with Client AND API latency.', // A description of the command.
        usage: 'ping' // Usage example for this command (omit prefix).
    },
    run: (client, message, args) => {
        // Code here.
    }
}