const db = require('quick.db');

module.exports = (client) => {
    client.db = {
        moderation: new db.table('moderation'),
        economy: new db.table('economy')
    }
}