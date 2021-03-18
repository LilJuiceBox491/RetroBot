/*
Hey there. If you're stopping by, please be sure to read README.md to understand the project better, and take note of our LICENSE.

If you believe you can help out, feel free to fork this repository and add on to it. Your fork will be reviewed by the team.

If you aren't sure what you are doing, please do not mess with anything, as it's a waste of your and our time.

If you want to fork just for fun, specify that in the repository description and we will not review it for RetroBot.

Thanks, 
LilJuiceBox491, leader of project RetroBot
-intelligence-, co-leader of project RetroBot
*/

// Import DiscordJS
const { ShardingManager } = require('discord.js');

// Define Variables
const token = process.env.TOKEN;

// Create Sharding ShardingManager
const manager = new ShardingManager('./bot.js', {
  token: token
});

// Activate Shard
manager.on('shardCreate', shard => {
  console.log(`Launched Shard ${shard.id}`)
});

// Spawn Shard
manager.spawn();