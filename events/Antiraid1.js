const { Events } = require("discord.js");

const CANAL_PROTEGIDO = "1533642288679354568";
const DONO_ID = "1142242302056738826";

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
