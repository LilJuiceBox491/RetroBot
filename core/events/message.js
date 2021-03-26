const permissionCheck = require('../util/permissionCheck');
const EmbedUtil = require('../util/EmbedUtility');

/**
 * @type {RB.MessageEvent}
 */
module.exports = {
    config: {
        name: 'message'
    },
    run: async (client, message) => {
        if(message.author.bot) return; //Do nothing if user executing a message is a bot.
        if(message.channel.type === 'dm') return; // Do nothing if in a DM channel. 

        // Database Validators
        await require('../validators/EconDBValidator')(client, message);
        await require('../validators/ModDBValidator')(client, message);


        if(message.content.toLowerCase().startsWith(client.config.prefix)) {

            const content = message.content;

            const messageArr = content.split(' ');

            const command = messageArr[0].slice(client.config.prefix.length);

            const args = messageArr.slice(1);

            const cmdFile = client.commands.get(command) || client.commands.get(client.aliases.get(command))
            // If found, run the command file's run() function.
            if(cmdFile) {
                if(cmdFile.config.ownerOnly) {
                    if(!client.config.botOwners.includes(message.author.id)) return;
                }

                // Run permission check on member
                const memberCheck = permissionCheck(client, message.member, cmdFile.config.permissions);
                if(memberCheck.length) return message.channel.send(EmbedUtil(
                    client, 
                    'error', 
                    `You are missing the following permissions required for this command:\n${cmdFile.config.permissions.map(el => `\`${el}\``).join('\n')}`
                ));

                //Run permission check on client.
                const clientCheck = permissionCheck(client, message.member, cmdFile.config.clientPermissions);
                if(clientCheck.length) return message.channel.send(EmbedUtil(
                    client, 
                    'error', 
                    `I am missing the following permissions required for this command:\n${cmdFile.config.clientPermissions.map(el => `\`${el}\``).join('\n')}`
                ));

                client.commandsRun++;
                cmdFile.run(client, message, args);
                client.log.cmd(`${message.author.tag} (${message.author.id}) executed ${cmdFile.config.name.toUpperCase()} with the following arguments: ${args.length > 0 ? `${args.map(el => el)}` : 'None.'}`);
            }
        }
    }
}