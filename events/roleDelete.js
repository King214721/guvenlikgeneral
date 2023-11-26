const db = require("orio.db");
const { EmbedBuilder, AuditLogEvent } = require('discord.js');

module.exports = async(client, role) => {

    if(!db.fetch(`korumaLog.channel_${role.guild.id}`)) return;

    const kanalKoruması = db.fetch(`korumaLog.guardRole_${role.guild.id}`)
    const log = role.guild.channels.cache.get(db.fetch(`korumaLog.channel_${role.guild.id}`).channel)

    if(kanalKoruması) {

        const fetchedLogs = await role.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.RoleDelete,
        });

        const deletionLog = fetchedLogs.entries.first();

        const { executor, target } = deletionLog;

        var l = db.fetch(`korumaLog.channelLimit_${role.guild.id}`);
        if(!l) { l = 5 }

        const userPoint = db.fetch(`userPointRole_${role.guild.id}${executor.id}`) || 0

        if (executor) {
            
            if(userPoint >= db.fetch(`korumaLog.channelLimit_${role.guild.id}`).limit || 5) {

                const embed = new EmbedBuilder()
                .setColor("#ED4245")
                .setDescription(`<:cs_warn2:1142138650314952795> **${executor.tag}** Banlandı. (**${userPoint}**)`)
                .setFooter({ text: `${client.user.username} tarafından banlandı.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

                log.send({ embeds: [embed] })
                channel.guild.members.ban(executor.id);
                db.delete(`userPointRole_${role.guild.id}${executor.id}`)

            } else {

                const embed = new EmbedBuilder()
                .setColor("#FEE75C")
                .setDescription(`<:cs_warn2:1142138650314952795> **${executor.tag}** bir rol sildi, devam ederse onu banlayacağım! (${l}/**${userPoint}**)`)
                .setFooter({ text: `${executor.tag} tarafından silindi.`, iconURL: executor.displayAvatarURL({ dynamic: true }) })

                log.send({ embeds: [embed] })
                db.add(`userPointRole_${role.guild.id}${executor.id}`, 1)
            }

        } else {
            
            const embed = new EmbedBuilder()
                .setColor("#ED4245")
                .setDescription(`<:cs_warn2:1142138650314952795> **İllegal biri rol sildi.**`)

            log.send({ embeds: [embed] })

        }

    };

}