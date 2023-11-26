const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('emoji')
    .setDescription("Emoji koruması sistemini ayarlarsınız.")
    .addSubcommand(option => option.setName('koruması').setDescription('Emoji koruması sistemini ayarlarsınız.').addStringOption(option =>  option.setName('durum').setDescription('Hedef Durum.').addChoices({name: "aktif", value: "true"},{name: "deaktif", value: "false"}).setRequired(true)))
    .setDefaultMemberPermissions( Discord.PermissionFlagsBits.Administrator )

module.exports.execute = async (client, interaction, db) => {

    const embed = new Discord.EmbedBuilder()
    .setColor("#ED4245")
    .setDescription("> **Koruma log'un aktif edilmesi gerekiyor.** <:cs_reddet:1142405174548254802>")

    if(!db.fetch(`korumaLog.channel_${interaction.guild.id}`)) return interaction.reply({ embeds: [embed], ephemeral: true })

    if(interaction.options.getString("durum") === "true") {

        const embed = new Discord.EmbedBuilder()
        .setColor("#ED4245")
        .setDescription("> **Emoji koruması zaten aktif.** <:cs_reddet:1142405174548254802>")

        if(db.fetch(`korumaLog.guardEmoji_${interaction.guild.id}`)) return interaction.reply({ embeds: [embed], ephemeral: true })

        const embed1 = new Discord.EmbedBuilder()
        .setColor("#57F287")
        .setDescription("> **Emoji koruması `aktif` edilidi!** <:cs_onay:1142405258409156708>")
        .setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setTimestamp()
        
        db.set(`korumaLog.guardEmoji_${interaction.guild.id}`, true)
        interaction.reply({ embeds: [embed1] })

    } else {

        const embed = new Discord.EmbedBuilder()
        .setColor("#ED4245")
        .setDescription("> **Emoji koruması zaten deaktif.** <:cs_reddet:1142405174548254802>")

        if(!db.fetch(`korumaLog.guardEmoji_${interaction.guild.id}`)) return interaction.reply({ embeds: [embed], ephemeral: true })

        const embed1 = new Discord.EmbedBuilder()
        .setColor("#57F287")
        .setDescription("> **Emoji koruması `deaktif` edilidi!** <:cs_onay:1142405258409156708>")
        .setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setTimestamp()
        
        db.delete(`korumaLog.guardEmoji_${interaction.guild.id}`)
        interaction.reply({ embeds: [embed1] })

    }


};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};