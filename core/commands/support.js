const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'support',
        aliases: [], 
        permissions: [], 
        clientPermissions: [], 
        group: 'util',
        description: 'Replies with a link to the support server.',
        usage: 'support'
    },
    // eslint-disable-next-line no-unused-vars
    run: (client, message, args) => {
        const e = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor(client.config.colors.commands)
        .addFields(
            {name: 'Server:', value: `Please click [here](${client.config.links.supportServer}) to join the support server!`},
            {name: 'Info:', value: `For other important information, please refer to the \`${client.config.prefix}info\` command.`}
        );

        message.channel.send(e);
    }
}