const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ppp")
        .setDescription("Cria o painel do Pego, Passo ou Penso.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor("#f5c542")
            .setTitle("📸 Pego, Passo ou Penso")
            .setDescription(
`Clique no botão abaixo para enviar uma foto.

Sua foto será publicada automaticamente no canal configurado para que todos possam reagir.`
            );

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("ppp_enviar")
                .setLabel("Enviar Foto")
                .setEmoji("📷")
                .setStyle(ButtonStyle.Primary)
        );

        await interaction.reply({
            embeds: [embed],
            components: [row]
        });
    }
};
