const Discord = require('discord.js');
module.exports = {
    config: {
        name: 'help',
        aliases: [],
        permissions: [],
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
            .setColor(client.config.colors.help)
            .setTitle(`${cmd.config.name.toUpperCase()}`)
            .setDescription(`
**Description:**
${cmd.config.description}
**Usage:**
${client.config.prefix}${cmd.config.usage}
            
**Aliases:**
${cmd.config.aliases.length > 0 ? cmd.config.aliases.map(a => a.toUpperCase()).join('\n') : 'None.'}
            `);
            message.channel.send(e);
        } else {
            const e = new Discord.MessageEmbed()
            .setColor(client.config.colors.help)
            .setTitle('List of Commands:')
            .setDescription(client.helpArr.map(el => `**${el.group.name} Commands**:\n${el.value}\n\n`))
            .setFooter(`Use ${client.config.prefix}help [command name/alias here] for command information (i.e usage).`)
            .setThumbnail(client.user.displayAvatarURL());
            return message.channel.send(e);
        }
    }
}