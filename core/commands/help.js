const Discord = require('discord.js');
module.exports = {
    config: {
        name: 'help',
        aliases: [],
        permissions: [],
        clientPermissions: [],
        group: 'gen',
        description: 'Sends command help.',
        usage: 'help'
    },
    run: (client, message, args) => {
        // If a user provides an argument
        if(args[0]) {
            const cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
            if(!cmd) {
                const e = new Discord.MessageEmbed()
                .setDescription(`The command/alias you provided does not exist.`)
                .setColor(client.config.colors.errors);
                return message.channel.send(e);
            }
            const e = new Discord.MessageEmbed()
            .setColor(client.config.colors.commands)
            .setDescription(`**\`${cmd.config.name.charAt(0).toUpperCase() + cmd.config.name.slice(1)}\` Command Help:**`)
            .addFields(
                {name: 'Description:', value: `${cmd.config.description}`},
                {name: 'Usage:', value: `\`${client.config.prefix}${cmd.config.usage}\``},
                {name: 'Aliases:', value: `${cmd.config.aliases.length > 0 ? cmd.config.aliases.map(a => `\`${a}\``).join('\n') : 'None.'}`}
            );

            message.channel.send(e);
        } else {
            const e = new Discord.MessageEmbed()
            .setColor(client.config.colors.commands)
            .setTitle('List of Commands:')
            .setDescription(client.helpArr.map(el => `**${el.group.name} Commands ${el.group.icon}**\n${el.value}\n\n`))
            .setFooter(`Use ${client.config.prefix}help [command name/alias here] for command information (i.e usage).`)
            .setThumbnail(client.user.displayAvatarURL());
            return message.channel.send(e);
        }
    }
}