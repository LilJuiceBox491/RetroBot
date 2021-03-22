const _ = require('lodash');

module.exports = async (client, message) => {
    // Economy Database.
    const tbl = await client.db.economy.fetch(`${message.guild.id}.${message.author.id}`);
    const data = {
        coins: tbl?.coins ? tbl.coins : 0
    }

    if(!_.isEqual(tbl, data)) client.db.economy.set(`${message.guild.id}.${message.author.id}`, data);
}