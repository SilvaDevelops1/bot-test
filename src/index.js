const { Client, IntentsBitField, ActivityType, SlashCommandBuilder } = require('discord.js'); // Import the discord.js library
const prefix = 'TA'; // Set the prefix
const config = require('/Users/alvisgordon/Documents/bot test 1/.gitignore/config.json');
const Ping = require('ping.js');   // Import the ping.js library
const axios = require('axios');
const ytdl = require('ytdl-core'); // Import the ytdl-core library for handling YouTube audio streams
const fs = require('fs'); // Import the fs library for reading files
const ping = new SlashCommandBuilder();
const commands = {
    ping: (message) => require('../src commands/ping.js').execute(message),
    help: (message) => require('../src commands/help.js').execute(message),
    magicball: (message) => require('../src commands/magicball.js').execute(message),
    dadjoke: (message) => require('../src commands/dadjoke.js').execute(message),
}

const myClient = new Client({  
    intents: ["Guilds", "GuildMessages", "DirectMessages",  "DirectMessageReactions", "GuildMessageReactions", "GuildMessageTyping", "DirectMessageTyping", "MessageContent","GuildVoiceStates"] 
}); // Create a new client

myClient.once('ready', () => { // When the bot is ready
    console.log(`${myClient.user.username} is online!`);    // Log when the bot is ready

    //myClient.user.setActivity('Listening to !help', { type: 'LISTENING' });
}); // Log when the bot is ready
myClient.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;  // Check if the message starts with the prefix or if the author is a bot

    const args = message.content.slice(prefix.length).trim().split(/ +/); // Get the arguments
    const commandName = args.shift().toLowerCase(); // Get the command
    const command = commands[commandName]; // Get the command from the commands list
    if (command) {
        command(message, args); // Execute the command
    } else { 
        message.reply('Command not found!'); // Reply with an error message
    }
})
/*myClient.on('messageCreate', message => { // When a message is created
    console.log(`Received message: ${message.content} from ${message.author.tag}`); // Log the message
    }
); */

// Define a slash command


myClient.login(config.token); // Token 
 
//myClient.on('messageCreate', message => { // When a message is created
    //if (message.content === '!ping') {  // Check if the message is !ping
        //const latency = Date.now() - message.createdTimestamp;
       // message.reply(`Pong! Latency is ${latency}ms.`); // Reply with the latency
  //  }
//});
// ...
//to move to commands when i learn how too but for now i will keep it here

/*
myClient.on('messageCreate', message => { // When a message is created
    if (message.content === '!help') { // Check if the message is !help
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Bot Commands')
            .setDescription('All the commands you need to know')
            .addFields(
                { name: '!help', value: 'Shows this help message.' },
                { name: '!ping', value: 'Check the latency of the bot.' },
                { name: '!8ball', value: 'Ask the magic 8ball a question.' },
                { name: '!dadjoke', value: 'Get a random dad joke.' },
                { name: '!slap', value: 'Slap a user.' },
                { name: '!level', value: 'Check your level.' },
                { name: '!leaderboard', value: 'Check the leaderboard.' },
                { name: '!quote', value: 'Get a random quote.' },
                { name: '!discordinvite', value: 'Get the Discord invite link.' },
                { name: '!invitebot', value: 'Get the bot invite link.' }
            
            );
        message.reply({ embeds: [embed] }); // Reply with the commands in an embed
    }
});



myClient.on('messageCreate', message => { // When a message is created
    if (message.content.startsWith('!dadjoke')) { // Check if the message is !dadjoke
        const jokes = [
            'Why don\'t scientists trust atoms? Because they make up everything!',
            'Why did the scarecrow win an award? Because he was outstanding in his field!',
            'Why don\'t skeletons fight each other? They don\'t have the guts.',
            'What do you call cheese that isn\'t yours? Nacho Cheese!',
            'Why couldn\'t the bicycle stand up by itself? It was two tired!',
        ];
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        message.reply(joke); // Reply with a random joke
    }
});

myClient.on('messageCreate', message => { // When a message is created
    if (message.content.startsWith('!slap')) { // Check if the message is !slap
        const userToSlap = message.mentions.users.first(); // Get the first mentioned user
        if (userToSlap) { // If a user is mentioned
            message.reply(`You slapped ${userToSlap.username}!`); // Reply with a slap message
        } else { // If no user is mentioned
            message.reply('You need to mention a user to slap!'); // Reply with an error message
        }
    }
});

const xp = {}; // Store user XP
const level = {}; // Store user levels

myClient.on('messageCreate', message => { // When a message is created
    if (message.author.bot) return; // Ignore bots

    const userId = message.author.id;

    // Initialize if not present
    if (!xp[userId]) xp[userId] = 0;
    if (!level[userId]) level[userId] = 1;

    // Random XP
    const randomXp = Math.floor(Math.random() * 10) + 1;
    xp[userId] += randomXp;

    // Calculate level
    const nxtLvl = level[userId] * 300; // 300 XP needed for next level
    if (xp[userId] >= nxtLvl) {
        level[userId]++;
        message.reply(`Congratulations ${message.author.username}, you have leveled up to ${level[userId]}!`);
    }
});

myClient.on('messageCreate', message => { // When a message is created
    if (message.content.startsWith('!level')) { // Check if the message is !level
        const userId = message.author.id;
        if (!level[userId]) level[userId] = 1;
        message.reply(`Your level is ${level[userId]}`);
    }
});

myClient.on('messageCreate', message => { // When a message is created
    if (message.content.startsWith('!leaderboard')) { // Check if the message is !leaderboard
        let leaderboard = Object.keys(level).map(id => ({
            userId: id,
            level: level[id],
            xp: xp[id]
        }));
        leaderboard = leaderboard.sort((a, b) => b.level - a.level || b.xp - a.xp).slice(0, 10); // Top 10

        let leaderboardContent = '';
        for (let i = 0; i < leaderboard.length; i++) {
            const user = myClient.users.cache.get(leaderboard[i].userId);
            leaderboardContent += `**${i + 1}. ${user ? user.tag : 'Unknown User'} - Level: ${leaderboard[i].level}, XP: ${leaderboard[i].xp}**\n`;
        }
        message.reply(`\n**Leaderboard**\n${leaderboardContent}`);
    }
});
myClient.on('messageCreate', message => { // When a message is created
    if (message.content.startsWith('!quote')) { // Check if the message is !quote
        // You can replace this array with your own quotes
        const quotes = [
            "The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela",
            "The way to get started is to quit talking and begin doing. -Walt Disney",
            "Your time is limited, don't waste it living someone else's life. -Steve Jobs",
            "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt"
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        message.reply(quote); // Reply with a random quote
    }
});
const bannedWords = ['nigger', 'porn']; // Add more words as needed
const spamMessageCount = 5;
const spamTimeout = 3000; // In milliseconds
let userMessageCounts = {};

myClient.on('messageCreate', message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Check for spam
    let user = message.author.id;
    userMessageCounts[user] = userMessageCounts[user] ? userMessageCounts[user] + 1 : 1;
    if (userMessageCounts[user] > spamMessageCount) {
        message.author.send('You\'re sending messages too quickly. Please slow down.');
        message.delete();
        return;
    }
    setTimeout(() => {
        userMessageCounts[user]--;
    }, spamTimeout);

    // Check for banned words
    let messageWords = message.content.split(' ');
    for (let i = 0; i < messageWords.length; i++) {
        if (bannedWords.includes(messageWords[i].toLowerCase())) {
            message.delete();
            message.author.send('Your message contained a banned word and was deleted.');
            break;
        }
    }

    if (message.content.startsWith('!discordinvite')) {
        message.channel.send('https://discord.gg/mgW2V94qkv');
    }
    if (message.content.startsWith('!invitebot')) {
        const inviteEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Invite Bot')
            .setURL('https://discord.com/oauth2/authorize?client_id=1221753759189827645')
            .setDescription('Click the title to invite this bot to your server!');
        message.channel.send({ embeds: [inviteEmbed] });
    }
 
});

*/