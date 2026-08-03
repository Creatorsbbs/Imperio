const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,

    async execute(member) {

        const embed = new EmbedBuilder()
            .setTitle("🛡️ Guia de Recrutamento - Tropa Imperial")
            .setDescription(`
Bem-vindo à Tropa Imperial, ${member}!

⚔️ **Como funciona o recrutamento:**

1️⃣ Entre no canal de recrutamento.
2️⃣ Clique no botão para iniciar sua inscrição.
3️⃣ Responda todas as perguntas corretamente.
4️⃣ Aguarde a análise da liderança.
5️⃣ Se aprovado, você receberá sua patente.

🔥 **Requisitos:**
• Respeito aos membros
• Atividade no servidor
• Lealdade à Tropa Imperial
• +13 anos

Boa sorte, recruta. 🫡
            `)
            .setColor("Gold")
            .setFooter({
                text: "Tropa Imperial • Sistema de Recrutamento"
            });

        await member.send({ embeds: [embed] }).catch(() => {});
    }
};
