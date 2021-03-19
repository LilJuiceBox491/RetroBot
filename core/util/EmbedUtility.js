const Discord = require('discord.js');

/**
 * @typedef {'error'} EmbedType
 * @param {Discord.Client} client 
 * @param {EmbedType} type 
 * @param {string} data 
 */
module.exports = (client, type, data) => {
    switch(type) {
        case 'error' : {
            const e = new Discord.MessageEmbed()
            .setTitle('An Error has occured:')
            .setColor(client.config.colors.errors)
            .setDescription(data)

            return e;
        }
    }
}