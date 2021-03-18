const { MessageEmbed } = require("discord.js")
const { readFileSync } = require('fs');

const ver = JSON.parse(readFileSync('package.json', 'utf8')).version;

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
        .addFields(
            {name: 'Client Version:', value: `${client.user.username} is currently running on version \`${ver}\``},
            {name: 'Source:', value: `${client.user.username} is Open-Source, you can find it's repository [here](https://github.com/LilJuiceBox491/RetroBot).`},
            {name: 'Last Reset:', value: `${client.lastReset}`, inline: true},
            {name: 'Commands Run Since Last Reset:', value: `${client.commandsRun}`, inline: true}
        );

        message.channel.send(e);
    }
}