const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('ayarlar')
    .setDescription("Koruma ayarlarını gösterir.");
module.exports.execute = async (client, interaction, db) => {

    const embed = new Discord.EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('Koruma Ayarları')
    .addFields(
      { name: 'Ban Koruması', value: `${db.fetch(`korumaLog.guardBan_${interaction.guild.id}`) ? "<:cs_onay:1142405258409156708> Ayarlandı":"<:cs_reddet:1142405174548254802> Ayarlanmamış"}`, inline: true},
      { name: 'Bot Koruması', value: `${db.fetch(`korumaLog.guardBoat_${interaction.guild.id}`) ? "<:cs_onay:1142405258409156708> Ayarlandı":"<:cs_reddet:1142405174548254802> Ayarlanmamış"}`, inline: true},
      { name: 'Hesap Koruması', value: `${db.fetch(`korumaLog.guardAccountUser_${interaction.guild.id}`) ? "<:cs_onay:1142405258409156708> Ayarlandı":"<:cs_reddet:1142405174548254802> Ayarlanmamış"}`, inline: true},
      { name: 'Kanal Koruması', value: `${db.fetch(`korumaLog.guardChannel_${interaction.guild.id}`) ? "<:cs_onay:1142405258409156708> Ayarlandı":"<:cs_reddet:1142405174548254802> Ayarlanmamış"}`, inline: true},
      { name: 'Kick Koruması', value: `${db.fetch(`korumaLog.guardKick_${interaction.guild.id}`) ? "<:cs_onay:1142405258409156708> Ayarlandı":"<:cs_reddet:1142405174548254802> Ayarlanmamış"}`, inline: true},
      { name: 'Koruma Log', value: `${db.fetch(`korumaLog.channel_${interaction.guild.id}`) ? "<#"+db.fetch("korumaLog.channel_"+interaction.guild.id).channel+">":"<:cs_reddet:1142405174548254802> Ayarlanmamış"}`, inline: true},
      { name: 'Koruma Limit', value: `${db.fetch(`korumaLog.channelLimit_${interaction.guild.id}`) ? db.fetch("korumaLog.channelLimit_"+interaction.guild.id) || 5 :"<:cs_reddet:1142405174548254802> Ayarlanmamış"}`, inline: true},
      { name: 'Rol Koruması', value: `${db.fetch(`korumaLog.guardRole_${interaction.guild.id}`) ? "<:cs_onay:1142405258409156708> Ayarlandı":"<:cs_reddet:1142405174548254802> Ayarlanmamış"}`, inline: true},
      { name: 'Yönetici Koruması', value: `${db.fetch(`korumaLog.guardAdmin_${interaction.guild.id}`) ? "<:cs_onay:1142405258409156708> Ayarlandı":"<:cs_reddet:1142405174548254802> Ayarlanmamış"}`, inline: true},
      { name: 'Yönetici Rol Koruması', value: `${db.fetch(`korumaLog.guardAdminRole_${interaction.guild.id}`) ? "<:cs_onay:1142405258409156708> Ayarlandı":"<:cs_reddet:1142405174548254802> Ayarlanmamış"}`, inline: true},
      { name: 'Emoji Koruması', value: `${db.fetch(`korumaLog.guardEmoji_${interaction.guild.id}`) ? "<:cs_onay:1142405258409156708> Ayarlandı":"<:cs_reddet:1142405174548254802> Ayarlanmamış"}`, inline: true},
      )
    .setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setTimestamp()

    interaction.reply({ embeds: [embed] })

};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};