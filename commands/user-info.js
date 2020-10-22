module.exports = {
	name: 'user-info',
	description: 'Shows user information.',
	args: true,
	usage: '<@users separated by space>',
	cooldown: 5,
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to get information about them!');
		} else {
			const taggedList = message.mentions.users.map(user => {
				return `Your username: ${user.username}\nYour ID: ${user.id}`;
			});
			message.channel.send(taggedList);
		}
	},
};