const Discord = require('discord.js');

/**
 * @type {RB.Command}
 */
module.exports = {
    config: {
        name: 'ping',
        aliases: ["latency"],
        permissions: [],
        clientPermissions: [],
        ownerOnly: false,
        group: 'util',
        description: 'Replies with Client AND API latency.',
        usage: 'ping'
    },
    // eslint-disable-next-line no-unused-vars
    run: (client, message, args) => {
        message.channel.send('Calculating Ping...').then(msg => {
            const e = new Discord.MessageEmbed()
            .setColor(client.config.colors.commands)
            .addField('Client Latency', `**${client.ws.ping}ms**`, true)
            .addField('API Latency', `**${msg.createdTimestamp - message.createdTimestamp}ms**`, true)
    
            msg.edit('', e);
        })
    }
}