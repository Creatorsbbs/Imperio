const { Events, AuditLogEvent } = require("discord.js");

const CANAL_PROTEGIDO = "ID_DO_CANAL";
const DONO_ID = "SEU_ID";

module.exports = {
    name: Events.ChannelUpdate,

    async execute(oldChannel, newChannel) {

        if (oldChannel.id !== CANAL_PROTEGIDO) return;

        if (oldChannel.name !== newChannel.name) {

            const logs = await newChannel.guild.fetchAuditLogs({
                type: AuditLogEvent.ChannelUpdate,
                limit: 1
            });

            const entry = logs.entries.first();

            if (!entry) return;

            const pessoa = entry.executor;

            // Você pode mudar o nome
            if (pessoa.id === DONO_ID) return;


            await newChannel.guild.members.ban(pessoa.id, {
                reason: "Tentou alterar canal protegido."
            }).catch(() => {});
        }
    }
};
