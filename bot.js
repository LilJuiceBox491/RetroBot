// Internal Imports
log = require('./modules/utilities.js').log;
getTime = require('./modules/utilities.js').getTime;
buffer = require('./modules/string-utilities.js').buffer;

// External Imports
const Discord = require('discord.js'); // Install discord.js
var eco = require('discord-economy'); //Installs discord-economy
const fetch = require('node-fetch'); // Install node-fetch
const fs = require('fs'); // Install fs
const { tictactoe } = require('reconlx'); // Install reconlx
const Topgg = require('@top-gg/sdk'); // Install top.gg
const express = require('express'); // Install express

// Initialization
const token = process.env.TOKEN; // Fetch the token from the .env
var adminlist = process.env.ADMINS.split(','); // Fetch admins from .env
const topggPassword = process.env.TOP_PASS; // Fetch the top.gg password from .env
var quote; // Define quote
const prefix = '.'; // Set prefix
var commandsRanInAllTime = 928; // Create commandsRanInAllTime variable
var digit1 = 4; // Create version digit 1
var digit2 = 10; // Create version digit 2
var digit3 = 1; // Create version digit 3
var eightball = [ // Create answers for eightball
  'it is certain.',
  'it is decidedly so.',
  'without a doubt.',
  'yes – definitely.',
  'you may rely on it.',
  
  'reply hazy, try again.',
  'ask again later.',
  'better not tell you now.',
  'cannot predict now.',
  'concentrate and ask again.',
  
  'don\'t count on it.',
  'my reply is no.',
  'my sources say no.',
  'outlook not so good.',
  'very doubtful.'
]
var typerace = [ // Create the sentances for typerace
  'The quick brown foxes jumped over the lazy dogs seventeen times in perfect sync rocking that fluffy red sweater.',
  'What a beautiful day it is on the beach, here in beautiful and sunny Hawaii.',
  'You never did tell me how many copper pennies were in that jar; how come?',
  'Juicey sneakily drove his car around every corner looking for his dog.',
  'The two kids collected twigs outside, for over an hour, in the freezing cold!',
  'When do you think they will get back from their adventure in Cairo, Egypt?',
  'Intel has three things to do today: wash his car, call his mother, and feed his dog.'
]

// Create Client
const client = new Discord.Client({ // Create the client with partials
  partials: [
    'MESSAGE',
    'CHANNEL',
    'REACTION'
  ]
});

// Topgg
const app = express();
const webhook = new Topgg.Webhook(topggPassword);

app.get('/', (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write('<html><body><p>RetroBot Is Alive</p></body></html>');
	res.end();
});


app.post('/votes/top.gg', webhook.middleware(), async (req, res) => {
  const date = new Date();
  var dayOTW = date.getDay();
  if (dayOTW == 6 || dayOTW == 7) {
    const voterID = req.vote.user || null;
    console.log(`<@${voterID}> has voted on top.gg`);
    eco.AddToBalance(voterID, 5000);
  }
  else {
    const voterID = req.vote.user || null;
    console.log(`<@${voterID}> has voted on top.gg`);
    eco.AddToBalance(voterID, 1000);
  }
});


app.listen(5000);
// Initialize
client.on('ready', () => { // Activate the client
  log('RetroBot Ready', 'Startup');
  log('Listening On Port', 'Initialization');
  client.user.setActivity('.help', {
    type: 'WATCHING'
  });
});

// Helper Functions
function makeEmbed(title, description, color) { // Function to create embeds
  const embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(description);
        
  return embed;
};

async function play(connection, url) {
  connection.play(await ytdl(url), {
    type: 'opus'
  });
};

// Recieve Messages
client.on('message', async message => {
  const serverCount = client.guilds.cache.size; // Update server count

  const date = new Date();
  var dayOTW = date.getDay();

  if (message.content.startsWith(prefix) && message.channel.type == 'dm' && !message.author.bot) {
    embed = makeEmbed('DMs Not Supported', 'This command does not work in direct message channels.', '#ff0000');
    message.channel.send(embed);
    return;
  }
  /*
  if (voterID == null) {
    return;
  }
  else {
    voterID.send('Thanks for voting :blush:');
  }
  */

  if (message.author.id != client.user.id && !message.author.bot && message.content.startsWith(prefix)) { // If the message is not sent by RetroBot, not sent by another bot, and starts with the prefix....
    const args = message.content/*.toLowerCase()*/.slice(prefix.length).split(/ +/); // Create the arguments array
    const cmd = args.shift(); // Create the command constant

    commandsRanInAllTime = commandsRanInAllTime + 1;

    var author = '<@' + message.author.id + '>' // Define the message author in pingable format (<@id>)
    if (cmd == 'help') { // Help command
      if (true) {
        desc = [
          '',
          '**Moderation :hammer:**',
          '`.kick <member>` - Kick\'s a mentioned member from the guild',
          '`.ban <member>` - Ban\'s a mentioned member from the guild',
          '`.unban <member>` - Unban\'s a mentioned member from the guild',
          '`.warn <user> [reason]` - Warn a user in the guild',
          '`.purge <count>` - Delete a specified amount of messages',
          '',
          '**Fun Commands :video_game:**',
          '`.8ball <question>` - Ask the magic 8ball a question',
          '`.typerace` - Play the TypeRace game (Typing competetion)',
          '`.debate` - Generate a random debatable topic to vote on',
          '`.ttt <user>` - Play a game of tic-tac-toe with another user',
          '',
          '**Economy** :moneybag:',
          '`.bal [user]` - Show that users current balance',
          '`.beg` - Beg for more money',
          '`.daily` - Claim your daily coins',
          '`.place [user]` - Show the leaderboard place of a user',
          '`.give <user> <amount>` - Gives a user money',
          '',
          '**Tools  :toolbox:**',
          '`.help` - Show this help message',
          '`.info` - Shows up-to-date bot information',
          '`.about` - Shows general information about the bot',
          '`.ping` - Show the latency of the bot and API',
          '`.serverinfo` - Show some information about the server',
          '`.vote` - Get a voting link for top.gg',
          '',
          '**Miscellaneous :bulb:**',
          '`.quote` - Generate a random quote from the Quotable API',
          '`.status` - Get a link to RetroBot\'s official status page',
          '`.ship <user1> <user2>` - Show the \'love probability\' of two users',
          '',
          '**Developer Tools :tools:**',
          '`.say <message>` - Say a message as the bot (including typing)',
          '`.upver <digit>` - Update the bot version',
          '`.downver <digit>` - Downgrade the bot version',
          '`.setver <new version>` - Set the bot version',
          '',
          '**If an argument is in <>, it is required.**',
          '**If an argument is in [], it is optional.**'

        ]
        embed = makeEmbed('RetroBot Help', desc.join('\n'), '#00bcff');
        message.react('<:check:819948030940807201>');
        message.author.send(embed);
      }
      else { // This runs if 'true' somehow isn't true xD
        console.log('Waiiiit a minute. True != true?! ILLUMINTI CONFIRMED.\n\nOh yeah and also shutting down the bot xD');
        process.exit();
      }
    }
    
    if (cmd == 'info') { // Info command 
        var version = `${digit1}.${digit2}.${digit3}`; // Update version

        embed = makeEmbed('Info', '**Version:**\n' + version + '\n\n**Date Created:**\n2/24/2021\n\n**Hosting:**\nRepl.it\n\n**Server Count:**\n ' + serverCount + '\n\n**Commands Ran Since Last Reset:**\n' + commandsRanInAllTime + '\n\n**Source Code:**\nhttps://repl.it/@LilJuiceBox491/RetroBot', '#00bcff');
        message.channel.send(embed);
    }
    
    else if (cmd == 'kick') { // Kick command
      if (!args.length) {
        embed = makeEmbed('Not enough arguments.','Who do you want to kick?  Use the help command for usage information.','ff0000')
        message.channel.send(embed);
        
      }
      else {
        if (message.member.hasPermission('KICK_MEMBERS')) {
          if (message.guild.me.hasPermission('KICK_MEMBERS')) {
            message.mentions.members.first().kick().then(() => {
               embed = makeEmbed('Kick successful', 'You have successfully kicked ' + args[0] + ' from this guild', '#00ff00');
               message.channel.send(embed);
            });
          }
          else {
            embed = makeEmbed('Incorrect Permissions', 'I don\'t have permissions to kick members.', '#ff0000');
            return message.reply(embed);
          }
        }
        else {
          embed = makeEmbed('Incorrect Permissions', 'You don\'t have permissions to kick members.', '#ff0000');
          return message.reply(embed);
        }
      }
    }
    else if (cmd == 'ban') { // Ban command
      if (!args.length) {
        embed = makeEmbed('Not enough arguments.','Who do you want to ban?  Use the help command for usage information.','ff0000')
        message.channel.send(embed);
      }
      else {
        if (message.member.hasPermission('BAN_MEMBERS')) {
          if (message.guild.me.hasPermission('BAN_MEMBERS')) {
            message.mentions.members.first().ban().then(() => {
               embed = makeEmbed('Ban successful', 'You have successfully banned ' + args[0] + ' from this guild', '#00ff00');
               message.channel.send(embed);
            });
          }
          else {
            embed = makeEmbed('Incorrect Permissions', 'I don\'t have permissions to ban members.', '#ff0000');
            return message.reply(embed);
          }
        }
        else {
          embed = makeEmbed('Incorrect Permissions', 'You don\'t have permissions to ban members.', '#ff0000');
          return message.reply(embed);
        }
      }
    }
    else if (cmd == 'unban') { // Unban command
      if (!args.length) {
        embed = makeEmbed('Not enough arguments.','Who do you want to unban?  Use the help command for usage information.','ff0000')
        message.channel.send(embed);
      }
      
      else {
        if (message.member.hasPermission('BAN_MEMBERS')) {
          if (message.guild.me.hasPermission('BAN_MEMBERS')) {
            message.mentions.members.first().unban().then(() => {
               embed = makeEmbed('Unban successful', 'You have successfully unbanned ' + args[0] + ' from this guild', '#00ff00');
               message.channel.send(embed);
            });
          }
          else {
            embed = makeEmbed('Incorrect Permissions', 'I don\'t have permissions to unban members.', '#ff0000');
            return message.reply(embed);
          }
        }
        else {
          embed = makeEmbed('Incorrect Permissions', 'You don\'t have permissions to unban members.', '#ff0000');
          return message.reply(embed);
        }
      }
    }

    else if (cmd == 'warn') {
      if (message.member.hasPermission('MANAGE_MESSAGES')){
        var id = args[0].replace('<','');
        id = id.replace('!','');
        id = id.replace('@','');
        id = id.replace('>','');
        var reason = message.content;
        reason = reason.replace('.warn ','') 
        reason = reason.replace(args[0],'')
        if (reason == ' ' || reason == '') {
          embed = makeEmbed(`You were warned in ${message.guild}`,`You were warned in ${message.guild} for reason: None`,'#00bcff')
          message.mentions.members.first().send(embed)
          embed = makeEmbed('Warn Successful',`${args[0]} has been warned. Reason: No reason provided`, '#00bcff');
          message.channel.send(embed);
        } 
        else {
          embed = makeEmbed(`You were warned in ${message.guild}`,`You were warned in ${message.guild} for reason: ${reason}`,'#00bcff')
          message.mentions.members.first().send(embed)
          embed = makeEmbed('Warn Successful',`${args[0]} has been warned. Reason: ${reason}`, '#00bcff');
          message.channel.send(embed);
        }
      }
      else{
        embed = makeEmbed('Incorrect Permissions','You do not have the permission `MANAGE_MESSAGES` needed to use this command','#00bcff')
        message.channel.send(embed)
      }
    }

    else if (cmd == 'serverinfo') {
      embed = new Discord.MessageEmbed()
        .setColor('#00bcfff')
        .setTitle(`${message.guild} Server Information`)
        .addField('Owner', `The owner of this server is <@${message.guild.ownerID}>`)
        .addField('Member Count', `This server has ${message.guild.memberCount} members`)
        .addField('Emoji Count', `This server has ${message.guild.emojis.cache.size} emojis`)
        .addField('Role Count', `This server has ${message.guild.roles.cache.size} roles`)

      message.channel.send(embed);
    }

    else if (cmd == 'say') { // Say command (for devs only)
      if (adminlist.includes(message.author.id)) {
        message.channel.startTyping();
        message.delete();
        setTimeout(function(){
          message.channel.stopTyping();
          message.channel.send(args.join(' '));
        }, message.content.length * 10)
      }
      else{ 
        embed = makeEmbed('Incorrect Permissions', 'You don\'t have permissions to use the command `say`', '#ff0000')
        message.channel.send(embed)
      }
    }
    else if (cmd == 'about') {
      embed = makeEmbed('About RetroBot','**Project Members:**\n<@742767675146633237>\n<@788150293518090311>\n\n**Dependencies:**\nCurrently, the only component(s) required to run this server are are a working Node.js instance and an installation of discord.js.\n\n**License:**\nWe use the GNU General Public License (GNU GPL), version 3.\n\n**Extra:**\nRetroMod - My counterpart to moderate your servers. Add it here: https://tinyurl.com/addretromod\n\nSupport Server - Get realtime support with the bot. Check it out here: https://discord.gg/VHTQWzWPdH','#00bcff');
      message.channel.send(embed);
    }
    else if (cmd == 'quote') {
      fetch('https://api.quotable.io/random?maxLength=120').then((res) => {
          return res.json();
      }).then((data) => {
          quote = data.content;
          quote = quote.replace(',', '');
          quote = "'" + quote + "'";
      });
      embed = makeEmbed('Random Quote','**Heres a random generated quote just for you:**\n\n*' + quote + '*', '#00bcff');
      message.channel.send(embed);
    }

    else if (cmd == '8ball') { // Eightball command
      (args[0])?message.channel.send(makeEmbed('8ball', author +', '+eightball[Math.floor(Math.random() * eightball.length)], "#00bcff")):message.reply('what is your question? Check help for usage')   
		}

    else if (cmd == 'typerace') { // TypeRace command
			var x  = typerace[
        Math.floor(Math.random() * typerace.length)
      ];

      y = '`' + x + '`';

      embed = makeEmbed('TypeRace', `Who can type the sentance below the quickest?\n\nReady?\n\nType:\n${y}`, '#00bcff');
      message.channel.send(embed);
			await message.channel.awaitMessages(m => m.content.toLowerCase() == x.toLowerCase(), {
          max: 1,
          time: 2147483647
        }).then(async collected => {
          embed = makeEmbed('TypeRace Results', '<@' + collected.first().author.id + '> has completed the TypeRace game first! Congrats!', '#00bcff');
          return message.channel.send(embed);
			});
    }
    
    else if (cmd == 'purge') { // Purge command
      if (!message.member.hasPermission('MANAGE_MESSAGES')){
        embed = makeEmbed('Invalid Permissions','You do not have the permission `Manage Messages` required to use this command.','#ff0000');
        message.channel.send(embed)
        return;
      } 

      let messageCount = parseInt(args[0]) || 1; 
      messageCount = messageCount + 1;

      if (messageCount < 101 || messageCount == 101) {
        message.channel.bulkDelete(messageCount).then(() => {
          messageCount = messageCount - 1;
          embed = makeEmbed(messageCount + ' messages deleted','You have successfully deleted ' + messageCount + ' messages from this channel.','#00bcff')
          message.channel.send(embed).then(msg => msg.delete(3000));
        });
      }
      else  {
        embed = makeEmbed('Whoa, That\'s A Lot...', 'Wow, it looks like you\'re deleting a **lot** of messages. The most you can delete at once is 100! Take a chill pill \:P', '#ff0000');
        message.channel.send(embed);
      }
    }
    else if (cmd == 'debate') {
      var topic = fs.readFileSync('modules/txt/debates.txt', {
        encoding: 'utf-8'
      }); 
      topic = topic.split('\n'); // Convert modules/txt/debates.txt to array

      var x = topic[
        Math.floor(Math.random() * topic.length)
      ];

      embed = makeEmbed(message.author.username + '\'s Topic', x, '#00bcff');
      message.channel.send(embed).then(sentMessage => 
        sentMessage.react('👍').then(() => {
          sentMessage.react('👎').then(() => {
            sentMessage.react('<:maybe:819948413126836305>');
          });
        })
      );
    }
    else if (cmd == 'status') {
      embed = makeEmbed('RetroBot Status Page', 'You can view the RetroBot status page here:\nhttps://retrobotstatus.repl.co/', '#00bcff');
      message.channel.send(embed);
    }
    else if (cmd == 'ping') {
      embed = makeEmbed('RetroBot Latency (Ping)', `:ping_pong: PONG!\n\nLatency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`, '#00bcff')
      message.channel.send(embed);
    }

    else if (cmd == 'ttt') {
      if (message.mentions.members.first() != undefined){
          var game = new tictactoe({
          message: message,
          player_two: message.mentions.members.first(),
        });
      }
      else {
        embed = makeEmbed('Incorrect Arguments','You are missing the argument `<user>` for the `.ttt` command.','#00bcff')
        message.channel.send(embed)
      }
      
    }

    else if (cmd == 'invites') {
      if (adminlist.includes(message.author.id)) {
      client.guilds.cache.forEach(guild => {
          let channel = guild.channels.cache.last();
          createLink(channel, guild, message);
        });

        async function createLink(chan, guild, message) {
          let invite = await chan.createInvite().catch(console.error);
            try {
              message.author.send(guild.name + ': discord.gg/' + invite );
            } 
            catch (e) {
              message.author.send(guild.name + ':' + 'no link available');
            }
        }
      }
    } 

    else if (cmd == 'ship') {
      if (args[0] && !args[1] && (args[0].replace('<@!', '').replace('>', '') != message.author.id)) {
        let rand = Math.floor(Math.random() * 100);
        embed = makeEmbed('Love Probability', `You are ${rand}% compatible with ${args[0]}`, '#00bcff');
        message.channel.send(embed);
      }
      else if (args[0] && args[1]) {
        let rand = Math.floor(Math.random() * 100);
        if (rand == 100) {
          embed = makeEmbed('Love Probability', `${args[0]} is ${rand}% compatible with ${args[1]}!! Congrats! :heart:`, '#00bcff');
          message.channel.send(embed).then(() => {
            return;
          });
        }
        embed = makeEmbed('Love Probability', `${args[0]} is ${rand}% compatible with ${args[1]}`, '#00bcff');
        message.channel.send(embed);
      }
      else {
        embed = makeEmbed('Incorrect Arguments', 'You have to mention at least one user', '#ff0000')
        message.channel.send(embed);
      }
    }

    else if (cmd == 'upver') {
      if (adminlist.includes(message.author.id)) {
        if (!args[0]) {
          embed = makeEmbed('No Arguments Provided', 'You have not provided the correct arguments. You need to specify whether you are updating as a `major`, `minor`, or `patch` change.', '#ff0000');
          message.channel.send(embed);
          return;
        }
        else {
          if (args[0].toLowerCase() == 'major') {
            digit1 = digit1 + 1;
          }
          else if (args[0].toLowerCase() == 'minor') {
            digit2 = digit2 + 1;
          }
          else if (args[0].toLowerCase() == 'patch') {
            digit3 = digit3 + 1;
          }
          else {
            embed = makeEmbed('Incorrect Arguments Provided', 'You have not provided a real argument choice. You need to specify whether you are updating as a `major`, `minor`, or `patch` change.', '#ff0000');
            message.channel.send(embed);
            return;
          }
          embed = makeEmbed('Version Updated', 'Successfully updated version.', '#00bcff');
          message.channel.send(embed);
        }
      }
    }

    else if (cmd == 'downver') {
      if (adminlist.includes(message.author.id)) {
        if (!args[0]) {
          embed = makeEmbed('No Arguments Provided', 'You have not provided the correct arguments. You need to specify whether you are downgrading as a `major`, `minor`, or `patch` change.', '#ff0000');
          message.channel.send(embed);
          return;
        }
        else {
          if (args[0].toLowerCase() == 'major') {
            digit1 = digit1 - 1;
          }
          else if (args[0].toLowerCase() == 'minor') {
            digit2 = digit2 - 1;
          }
          else if (args[0].toLowerCase() == 'patch') {
            digit3 = digit3 - 1;
          }
          else {
            embed = makeEmbed('Incorrect Arguments Provided', 'You have not provided a real argument choice. You need to specify whether you are downgrading as a `major`, `minor`, or `patch` change.', '#ff0000');
            message.channel.send(embed);
            return;
          }
          embed = makeEmbed('Version Updated', 'Successfully downgraded version.', '#00bcff');
          message.channel.send(embed);
        }
      }
    }

    else if (cmd == 'setver') {
      if (adminlist.includes(message.author.id)) {
        if (args[0]) {
          digit1 = args[0]
          digit2 = args[1]
          digit3 = args[2]
          embed = makeEmbed('Version Updated', 'Successfully set version.', '#00bcff');
          message.channel.send(embed);
        }
        else {
          embed = makeEmbed('Incorrect Arguments Provided', 'You have not provided a real argument choice. You need to specify what you are setting the version to.', '#ff0000');
          message.channel.send(embed);
          return;
        }
      }
    }

    else if (cmd == 'vote') {
      console.log(dayOTW);

      if (dayOTW == 6 || dayOTW == 7) {
        embed = makeEmbed('Vote For RetroBot', 'Vote for RetroBot on top.gg by clicking [here](https://top.gg/bot/813549527398613055/vote).\n\nVotes are highly appreciated! Thanks!\n\nToday is a weekend, so when you vote, **$5000** RetroBot currency is automaticall added to your account! When it\'s a weekday, if you vote, $1000 will be added', '#00bcff');
        message.channel.send(embed);
      }
      else {
        embed = makeEmbed('Vote For RetroBot', 'Vote for RetroBot on top.gg by clicking [here](https://top.gg/bot/813549527398613055/vote).\n\nVotes are highly appreciated! Thanks!\n\nToday is a weekday, so when you vote, $1000 RetroBot currency is automaticall added to your account. When it\'s a weekend, if you vote, $5000 will be added', '#00bcff');
        message.channel.send(embed);
      }
    }

    // Economy Commands vvvv
    else if (cmd == 'bal') {
      if (args[0] != undefined) { // They mentioned someone
        var account = args[0].replace('<','')
        account = account.replace('!','');
        account = account.replace('@','');
        account = account.replace('>','');
        output = await eco.FetchBalance(account)
        var amount = output.balance;
        embed = makeEmbed('Balance', 'That users balance is ' + amount, '#00bcff');
        message.channel.send(embed);
      }
      else { // They didnt mention someone
        var account = message.author.id;
        output = await eco.FetchBalance(account);
        var amount = output.balance;
        embed = makeEmbed('Your Balance', 'Your balance is ' + amount, '#00bcff');
        message.channel.send(embed);
      }
    }

    else if (cmd == 'daily') {
      var output = await eco.Daily(message.author.id);

      if (output.updated) {
        var profile = await eco.AddToBalance(message.author.id, 100);
        embed = makeEmbed('Daily coins','You successfully claimed your daily coins. Your new balance is ' + profile.newbalance + ' coins.', '#00bcff');
        message.channel.send(embed)
      }
      else {
        embed = makeEmbed('Daily Coins Already Claimed', 'Hey, it looks like you already claimed your daily coins. Please try again later', '#ff0000');
        message.channel.send(embed);
      }
    }

    else if (cmd == 'resetdaily') {
      if (adminlist.includes(message.author.id)) {
        message.delete();
        var output = await eco.ResetDaily(message.author.id);
      }
    }

    else if (cmd == 'place') {
      if (args[0]) {
        var output = await eco.Leaderboard({
          filter: x => x.balance > 50,
          search: args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', '')
        });
        if (output == 'Not found') {
          embed = makeEmbed('Leaderboard Place', 'It seems like that user is not registered. They can register themselves by gaining money. Try starting with `.beg`, or `.daily`', '#ff0000');
          message.channel.send(embed);
        }
        else{
          embed = makeEmbed('Leaderboard Place', 'That user is in place #' + output + ' on the leaderboard', '#00bcff');
          message.channel.send(embed);
        }
      }
      else {
        var output = await eco.Leaderboard({
          filter: x => x.balance > -1,
          search: message.author.id
        });
        embed = makeEmbed('Leaderboard Place', 'You are in place #' + output + ' on the leaderboard', '#00bcff');
        message.channel.send(embed);
      }
    }
    
    else if (cmd == 'beg'){
      var amount = Math.floor(Math.random() * 100)
      embed = makeEmbed('Beg','You begged and got yourself ' + amount + ' coins!','#00bcff')
      var x = await eco.AddToBalance(message.author.id, amount);
      message.channel.send(embed);
    }
    
    else if (cmd.toLowerCase() == 'changebal') {
      if (adminlist.includes(message.author.id)) {
        message.channel.send('Changed balance of ' + args[0] + ' by ' + args[1]);
        var account = args[0].replace('<','');
        account = account.replace('!','');
        account = account.replace('@','');
        account = account.replace('>','');
        eco.AddToBalance(account, args[1] || 0);
      }
    }

    else if (cmd.toLowerCase() == 'give') {
      if (args[0] != undefined) {
        if (args[1] != undefined) {
          var amount = parseInt(args[1])
          var useramount = await eco.FetchBalance(message.author.id)
          var useramount = useramount.balance;

          /*
          console.log(amount)
          console.log(eco.FetchBalance(message.author.id))
          */

          var account = args[0].replace('<','');
          account = account.replace('!','');
          account = account.replace('@','');
          account = account.replace('>','');
          if (amount > useramount) {
            
            embed = makeEmbed('Transfer unsuccessful','You don\'t have enough coins.','#00bcff')
            message.channel.send(embed)
            
          }
          else {
            eco.Transfer(message.author.id,account,args[1]);
            embed = makeEmbed('Transfer successful','You have successfully tranfered ' + amount + ' coins.','#00bcff')
            message.channel.send(embed)
            
          }
        }
        else{
          embed = makeEmbed('Transfer unsuccessful','Invalid arguments. How much do you want to give?','#00bcff')
          message.channel.send(embed)
        }
      }
      else{
        embed = makeEmbed('Transfer unsuccessful','Invalid arguments. Who do you want to give to?','#00bcff')
        message.channel.send(embed)
      }
    }

    else if (cmd.toLowerCase() == 'setbal') {
      if (adminlist.includes(message.author.id)) {
        message.channel.send('Set balance of ' + args[0] + ' to ' + args[1]);
        var account = args[0].replace('<','');
        account = account.replace('!','');
        account = account.replace('@','');
        account = account.replace('>','');
        eco.SetBalance(account, (args[1] || 0));
      }
    }

    else if (cmd == 'votegift') {

    }

    else {
      if (message.content.startsWith('..')) { // If the message is just a '...', ignore
        return;
      }
      if (message.content.endsWith('`') || message.content.startsWith('`')) { // If the command is inside ``, ignore
        return;
      }
      if (message.content == prefix) { // If the command is just the prefix, ignore
        return;
      }
    }
  }
});

// Login to the client
client.login(token)