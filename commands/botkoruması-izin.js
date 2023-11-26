const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('bot-koruması')
    .setDescription("Bot koruması sistemini ayarlarsınız.")
    .addSubcommand(option => option.setName('izni').setDescription('Botları beyaz veya kara listeye eklersiniz.').addStringOption(option =>  option.setName('durum').setDescription('Hedef Durum.').addChoices({name: "ekle", value: "true"},{name: "çıkart", value: "false"}).setRequired(true)).addStringOption(o => o.setName("id").setDescription("Hedef ID.").setRequired(true)))
    .setDefaultMemberPermissions( Discord.PermissionFlagsBits.Administrator )

module.exports.execute = async (client, interaction, db) => {

    const embed = new Discord.EmbedBuilder()
    .setColor("#ED4245")
    .setDescription("> **Koruma log'un aktif edilmesi gerekiyor.** <:cs_onay:1142405258409156708>")

    const embed1 = new Discord.EmbedBuilder()
    .setColor("#ED4245")
    .setDescription("> **Bot log'un aktif edilmesi gerekiyor.** <:cs_onay:1142405258409156708>")

    if(!db.fetch(`korumaLog.channel_${interaction.guild.id}`)) return interaction.reply({ embeds: [embed], ephemeral: true })
    if(!db.fetch(`korumaLog.guardBoat_${interaction.guild.id}`)) return interaction.reply({ embeds: [embed1], ephemeral: true })

    if(interaction.options.getString("durum") === "false") {

        const embed = new Discord.EmbedBuilder()
        .setColor("#ED4245")
        .setDescription("> **Bu bot zaten kara listede bulunuyor.** <:cs_onay:1142405258409156708>")

        if(!db.fetch(`korumaLog.guardBoatIzın_${interaction.options.getString("id")}${interaction.guild.id}`)) return interaction.reply({ embeds: [embed], ephemeral: true })

        const embed1 = new Discord.EmbedBuilder()
        .setColor("#57F287")
        .setDescription("> **>Bot kara listeye eklendi!** <:cs_onay:1142405258409156708>")
        .setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setTimestamp()
        
        db.delete(`korumaLog.guardBoatIzın_${interaction.options.getString("id")}${interaction.guild.id}`, true)
        interaction.reply({ embeds: [embed1] })

    } else {

        const embed = new Discord.EmbedBuilder()
        .setColor("#ED4245")
        .setDescription("> **Bot bot zaten beyaz listede bulunuyor.** <:cs_reddet:1142405174548254802>")

        if(db.fetch(`korumaLog.guardBoatIzın_${interaction.options.getString("id")}${interaction.guild.id}`)) return interaction.reply({ embeds: [embed], ephemeral: true })

        const embed1 = new Discord.EmbedBuilder()
        .setColor("#57F287")
        .setDescription("> **>Bot beyaz listeye eklendi!** <:cs_onay:1142405258409156708>")
        .setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setTimestamp()
        
        db.set(`korumaLog.guardBoatIzın_${interaction.options.getString("id")}${interaction.guild.id}`, true)
        interaction.reply({ embeds: [embed1] })

    }


};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};