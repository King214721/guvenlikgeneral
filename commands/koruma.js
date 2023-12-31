const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('koruma')
    .setDescription("Koruma kayıtlarının gönderileceği kanalı belirler.")
    .addSubcommand(option => option.setName('log').setDescription('Koruma kayıtlarının gönderileceği kanalı belirler.').addChannelOption(option =>  option.setName('log').setDescription('Hedef Kanal.').setRequired(true)))
    .addSubcommand(option => option.setName('sıfırla').setDescription('Koruma ve Koruma komutlarını sıfırlarsınız.'))
    .addSubcommand(option => option.setName('limit').setDescription('Koruma limiti ayarlarsınız.').addIntegerOption(option =>  option.setName('limit').setDescription('Hedef Limit.').setRequired(true).setMaxValue(10).setMinValue(2)))
    .setDefaultMemberPermissions( Discord.PermissionFlagsBits.Administrator )

module.exports.execute = async (client, interaction, db) => {

    if (interaction.options.getSubcommand() === 'log') {

    const embed1 = new Discord.EmbedBuilder()
    .setColor("#ED4245")
    .setDescription("> **Koruma log zaten aktif edilmiş.** <:cs_reddet:1142405174548254802>")
    
    const embed5 = new Discord.EmbedBuilder()
    .setColor("#ED4245")
    .setDescription("> **Koruma log için yanlızca metin kanalı seçebilirsin.** <:cs_reddet:1142405174548254802>")

    if(db.fetch(`korumaLog.channel_${interaction.guild.id}`)) return interaction.reply({ embeds: [embed1], ephemeral: true })
      
    const embed = new Discord.EmbedBuilder()
    .setColor("#57F287")
    .setDescription("> **koruma log aktif edildi, koruma komutlarını artık kullanabilirsin!** <:cs_onay:1142405258409156708>")
    .setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setTimestamp()
        
    interaction.reply({ embeds: [embed] })
    db.set(`korumaLog.channel_${interaction.guild.id}`, { channel: interaction.options.getChannel("log").id })
}

if (interaction.options.getSubcommand() === 'limit') {

    const embed1 = new Discord.EmbedBuilder()
    .setColor("#ED4245")
    .setDescription("> **Koruma log'un aktif edilmesi gerekiyor.** <:cs_reddet:1142405174548254802>")

    if(!db.fetch(`korumaLog.channel_${interaction.guild.id}`)) return interaction.reply({ embeds: [embed1], ephemeral: true })

    const embed = new Discord.EmbedBuilder()
    .setColor("#57F287")
    .setDescription("> **koruma limiti değiştirildi!** <:cs_onay:1142405258409156708>")
    .setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setTimestamp()
    
    interaction.reply({ embeds: [embed] })
    db.set(`korumaLog.channelLimit_${interaction.guild.id}`, interaction.options.getInteger("limit"))
}

if (interaction.options.getSubcommand() === 'sıfırla') {

    const embed1 = new Discord.EmbedBuilder()
    .setColor("#ED4245")
    .setDescription("> **Koruma log zaten deaktif.** <:cs_reddet:1142405174548254802>")

    if(!db.fetch(`korumaLog.channel_${interaction.guild.id}`)) return interaction.reply({ embeds: [embed1], ephemeral: true })


    db.delete(`korumaLog.guardBan_${interaction.guild.id}`)
    db.delete(`korumaLog.guardBoat_${interaction.guild.id}`)
    db.delete(`korumaLog.guardAccountUser_${interaction.guild.id}`)
    db.delete(`korumaLog.guardChannel_${interaction.guild.id}`)
    db.delete(`korumaLog.guardKick_${interaction.guild.id}`)
    db.delete(`korumaLog.guardRole_${interaction.guild.id}`)
    db.delete(`korumaLog.guardAdmin_${interaction.guild.id}`)
    db.delete(`korumaLog.guardAdminRole_${interaction.guild.id}`)
    db.delete(`korumaLog.channel_${interaction.guild.id}`)
    db.delete(`korumaLog.channelLimit_${interaction.guild.id}`)




    const embed = new Discord.EmbedBuilder()
    .setColor("#57F287")
    .setDescription("> **Koruma ve koruma ayarları sıfırlandı!** <:cs_onay:1142405258409156708>")
    .setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setTimestamp()
        
    interaction.reply({ embeds: [embed] })
}



};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
