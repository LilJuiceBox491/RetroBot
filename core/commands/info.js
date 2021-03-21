const { MessageEmbed } = require("discord.js")
const { readFileSync } = require('fs');

const package = JSON.parse(readFileSync('package.json', 'utf8'));

module.exports = {
    config: {
        name: 'info',
        aliases: [], 
        permissions: [], 
        clientPermissions: [], 
        group: 'util',
        description: 'Replies with info about the bot, as well as where to report bugs, request features, or get support.',
        usage: 'info'
    },
    // eslint-disable-next-line no-unused-vars
    run: (client, message, args) => {
        const e = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor(client.config.colors.commands)
        .addFields(
            {name: 'Client Version:', value: `${client.user.username} is currently running on version \`${package.version}\``},
            {name: 'Source:', value: `${client.user.username} is Open-Source, you can find it's repository [here](${package.homepage}).`},
            {name: 'Bug Reports/Feature Requests:', value: `To submit a bug report or a feature request, please click [here](${package.bugs.url}).`},
            {name: 'Email:', value: 'Need to email the team? Do so at `retrobotdev@gmail.com`'},
            {name: 'Invite:', value: `Click [here](https://discord.com/oauth2/authorize?client_id=822909138102648892&scope=bot&permissions=8) to invite RetroBot to your server.`},
            {name: 'Last Reset:', value: `${client.lastReset}`, inline: true},
            {name: 'Commands Run Since Last Reset:', value: `${client.commandsRun}`, inline: true}
        );

        message.channel.send(e);
    }
}