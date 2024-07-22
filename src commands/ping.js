const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: ping = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the latency of the bot.'),
    async execute(interaction) {
        const latency = Date.now() - interaction.createdTimestamp;
        await interaction.reply(`Pong! Latency is ${latency}ms.`);
    },
};