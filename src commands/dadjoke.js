const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dadjoke')
        .setDescription('Get a random dad joke.'),
    async execute(interaction) {
        const jokes = [
            'Why don\'t scientists trust atoms? Because they make up everything!',
            'Why did the scarecrow win an award? Because he was outstanding in his field!',
            'Why don\'t skeletons fight each other? They don\'t have the guts.',
            'What do you call cheese that isn\'t yours? Nacho Cheese!',
            'Why couldn\'t the bicycle stand up by itself? It was two tired!',
            'Why did the math book look sad? Because it had too many problems.',
            'What do you call a fish wearing a crown? A king fish.',
            'Why did the tomato turn red? Because it saw the salad dressing!',
            'What do you call a fake noodle? An impasta!',
            'Why did the coffee file a police report? It got mugged.',
            'What do you call a pile of cats? A meowtain.',
            'Why did the golfer bring two pairs of pants? In case he got a hole in one.',
            'What do you call a bear with no teeth? A gummy bear.',
            'What do you call a belt made of watches? A waist of time.',
            'Why did the scarecrow win an award? Because he was outstanding in his field.',
            'Why don\'t eggs tell each other jokes? They might crack up.',
            'Why did the bicycle fall over? It was two-tired.',
            'Why did the golfer bring two pairs of pants? In case he got a hole in one.',
            'Why don\'t some animals play cards? They\'re afraid of cheetahs.',
            'Why did the cookie go to the doctor? It felt crumby.',
            'Why did the stadium get hot after the game? All of the fans left.',
            'Why did the tomato turn red? Because it saw the salad dressing.',
            'Why don\'t we tell secrets on a farm? Because the potatoes have eyes, the corn has ears, and the beans stalk.',
            'Why did the scarecrow win an award? Because he was outstanding in his field.',
            'Why did the golfer bring two pairs of pants? In case he got a hole in one.',
            'I\'m reading a book on anti-gravity. It\'s impossible to put down!',
            'I used to play piano by ear, but now I use my hands.',
            'I told my wife she should embrace her mistakes. She gave me a hug.',
            'I used to be a baker, but I couldn\'t make enough dough.',
            'Why don\'t skeletons fight each other? They don\'t have the guts.',
            'Why don\'t scientists trust atoms? Because they make up everything!'

        ];
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        await interaction.reply(joke);
    },
};