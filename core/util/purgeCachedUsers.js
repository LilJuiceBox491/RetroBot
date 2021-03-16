const { SnowflakeUtil } = require("discord.js");


module.exports = (client) => {
    setInterval(() => {
        client.log.log(`User Sweep Initiated...`);

        const purgableUser = user => {
            if (user.id === client.user.id) return false;
            if (!user.lastMessageID) return true;
            const flake = SnowflakeUtil.deconstruct(user.lastMessageID);
            const diff = Date.now() - flake.timestamp;
            return (diff / 1000 > client.options.userCacheLifetime);
        };

        let users = 0;
        let members = 0;

        client.users.cache.each(user => {
            if (purgableUser(user))
                client.users.cache.delete(user.id);
                users++;
        });

        client.guilds.cache.each(guild => {
            guild.members.cache.each(member => {
                if (purgableUser(member))
                    guild.members.cache.delete(member.id);
                    members++;
            });
        });

        client.log.log(`Deleted ${users} Users from cache.`);
        client.log.log(`Deleted ${members} GuildMembers from cache.`);
    }, client.options.userSweepInterval * 1000);
};