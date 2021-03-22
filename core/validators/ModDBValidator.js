const _ = require('lodash');

module.exports = async (client, message) => {
    // Moderation Database.
    const tbl = await client.db.moderation.fetch(`${message.guild.id}`);
    const data = {
        guildData: tbl?.guildData ? tbl.guildData : message.guild,
        caseNumber: tbl?.caseNumber ? tbl.caseNumber : 0,
        cases: tbl?.cases ? tbl.cases : []
    }

    if(!_.isEqual(tbl, data)) client.db.moderation.set(`${message.guild.id}`, data);
}