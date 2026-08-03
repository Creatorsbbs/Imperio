const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("painelconfissao")
        .setDescription("Cria o painel de confissões"),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle("💌 Confissões Anônimas")
            .setDescription(
                "Quer contar algo sem revelar quem é?\n\nClique no botão abaixo para enviar sua confissão."
            );

        const botao = new ButtonBuilder()
            .setCustomId("confissao")
            .setLabel("💌 Enviar Confissão")
            .setStyle(ButtonStyle.Primary);

        const linha = new ActionRowBuilder()
            .addComponents(botao);

        await interaction.reply({
            embeds: [embed],
            components: [linha]
        });
    }
};
