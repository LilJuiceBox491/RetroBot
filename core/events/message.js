

module.exports = {
    config: {
        name: 'message'
    },
    run: (client, message) => {
        if(message.author.bot) return; //Do nothing if user executing a message is a bot.
        if(message.content.toLowerCase().startsWith(client.config.prefix)) {

            const content = message.content;

            const messageArr = content.split(' ');

            const command = messageArr[0].slice(client.config.prefix.length);

            const args = messageArr.slice(1);

            const cmdFile = client.commands.get(command) || client.commands.get(client.aliases.get(command))
            // If found, run the command file's run() function.
            if(cmdFile) {
                cmdFile.run(client, message, args);
                client.log.cmd(`${message.author.tag} (${message.author.id}) executed ${cmdFile.config.name.toUpperCase()} with the following arguments: ${args.length > 0 ? `\n${args.map(el => el).join('\n')}` : 'None.'}`);
            }
        }
    }
}