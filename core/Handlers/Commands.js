const Discord = require('discord.js');
const fs = require('fs');


/**
 * Initializes Client Commands.
 * @param {Discord.Client} client Your Client
 */
module.exports = (client) => {
    // Define a collection for both commands themselves and their aliases.
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();

    // Read the command directory.
    fs.readdir(`core/commands`, (err, files) => {
        // If an error occurs, log it to the console and abort command initialization.
        if(err) return client.log.error(`Could not read command directory: ${err.message}`);

        // Filter for only JS files and log the amount found.
        const jsFiles = files.filter(fileName => fileName.split('.').pop() === 'js');
        client.log.log(`Loading ${jsFiles.length} commands.`);

        // Loop for each JS file and add it to the collection.
        jsFiles.forEach(file => {
            const cmd = require(`../commands/${file}`);
            client.commands.set(cmd.config.name, cmd);

            // Add command aliases to the collection.
            cmd.config.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.config.name);
            });

            // Log that each command has succesfully loaded. 
            client.log.log(`Command Loaded: ${cmd.config.name.toUpperCase()}. Aliases: ${cmd.config.aliases.length > 0 ? cmd.config.aliases.length : 'None.'}`);
        });
    });
}