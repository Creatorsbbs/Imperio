const {
    Events,
    EmbedBuilder
} = require("discord.js");

// Usuários aguardando envio da foto
const aguardando = new Set();

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction) {

        if (!interaction.isButton()) return;
        if (interaction.customId !== "ppp_enviar") return;

        if (aguardando.has(interaction.user.id)) {
            return interaction.reply({
                content: "❌ Você já está enviando uma foto.",
                ephemeral: true
            });
        }

        aguardando.add(interaction.user.id);

        const embed = new EmbedBuilder()
            .setColor("#f5c542")
            .setTitle("📷 Envie sua foto")
            .setDescription(
`Agora envie **uma imagem** neste canal.

⏳ Você terá **60 segundos**.

Caso não envie nada, o envio será cancelado.`
            );

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });

        const filtro = (msg) =>
            msg.author.id === interaction.user.id &&
            msg.attachments.size > 0;

        const coletor = interaction.channel.createMessageCollector({
            filter: filtro,
            max: 1,
            time: 60000
        });

        coletor.on("collect", async (msg) => {

            aguardando.delete(interaction.user.id);

            // O próximo evento vai tratar essa mensagem.
            msg.client.emit("pppFotoRecebida", msg);

        });

        coletor.on("end", (coletado) => {

            if (coletado.size === 0) {

                aguardando.delete(interaction.user.id);

                interaction.followUp({
                    content: "⌛ Tempo esgotado.",
                    ephemeral: true
                }).catch(() => {});
            }

        });

    }
};
