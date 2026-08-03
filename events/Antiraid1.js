const { Events } = require("discord.js");

const CANAL_PROTEGIDO = "ID_DO_CANAL";
const DONO_ID = "SEU_ID";

module.exports = {
    name: Events.MessageCreate,

    async execute(message) {

        if (message.author.bot) return;

        // Você não é afetado
        if (message.author.id === DONO_ID) return;

        // Se mandar mensagem no canal protegido
        if (message.channel.id === CANAL_PROTEGIDO) {

            await message.delete().catch(() => {});

            await message.member.ban({
                reason: "Mandou mensagem em canal protegido."
            }).catch(() => {});
        }
    }
};
