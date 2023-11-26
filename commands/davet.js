const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('davet')
    .setDescription("Bot'un davet linkini alırsınız.");
module.exports.execute = async (client, interaction, db) => {

    const embed = new Discord.EmbedBuilder()
    .setColor('#5865F2')
	.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setDescription("<:cs_link:1142129214749949962> [Beni Sunucuna Almak İçin Tıkla](https://discord.com/api/oauth2/authorize?client_id=996343874509353122&permissions=8&scope=bot%20applications.commands)")
	.setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
	.setTimestamp()

     interaction.reply({ embeds: [embed], ephemeral: true });

};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};