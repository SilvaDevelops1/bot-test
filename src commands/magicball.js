const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('magicball')
        .setDescription('Ask the magic ball a question.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question to ask the magic ball.')
                .setRequired(true)),
    async execute(interaction) {
        const answers = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.',
            'your fucking stupid beliving this'
        ];
        const answer = answers[Math.floor(Math.random() * answers.length)];
        await interaction.reply(answer);
    },
};