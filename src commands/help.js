const { Client, IntentsBitField, ActivityType, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of available commands.',
    execute(message) {
        try{
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Command List')
                .setDescription('Here are the available commands:')
                .addFields(
                    { name: 'TA Ping', value: 'Ping the bot to check its latency.' },
                    // Add more fields for other commands here
                )
                .addFields(
                    { name: 'TA Help', value: 'Displays a list of available commands.' },
                )
                .addFields(
                    { name: 'TA Magicball', value: 'Ask the magic ball a question.' },
                )
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(`Error executing command: ${error.message}`);
            message.reply('There was an error executing that command.');
            console.log(error);
        }
    },
};