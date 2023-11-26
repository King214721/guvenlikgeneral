const { EmbedBuilder, AuditLogEvent, PermissionsBitField } = require("discord.js")
const db = require("orio.db")

module.exports = async (client, newRole, oldRole) => {
    
    if(!db.fetch(`korumaLog.channel_${oldRole.guild.id}`)) return;

    const permKoruması = db.fetch(`korumaLog.guardAdminRole_${oldRole.guild.id}`)
    const log = oldRole.guild.channels.cache.get(db.fetch(`korumaLog.channel_${oldRole.guild.id}`).channel)

    if(permKoruması) {

        if(newRole.permissions.has(PermissionsBitField.Flags.Administrator)) return;

        if(oldRole.permissions.has(PermissionsBitField.Flags.Administrator)) {

            newRole.delete()
            const embed = new EmbedBuilder()
            .setColor("#FEE75C")
            .setDescription(`<:cs_warn2:1142138650314952795> **${oldRole.name}** rolüne yönetici yetkisi verildi, rol hemen silindi.`)
            .setFooter({ text: `${oldRole.name}`})
            .setTimestamp()

            log.send({ embeds: [embed] })        

        }
    }


};  
