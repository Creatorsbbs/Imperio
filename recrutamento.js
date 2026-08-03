const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("recrutamento")
        .setDescription("Cria o painel de recrutamento"),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle("🛡️ Recrutamento Imperial")
            .setDescription(
`Copie o formulário abaixo, responda e clique no botão.

**Nome:**
**Idade:**
**Experiência:**
**Por que quer entrar?**
**Quanto tempo ficará ativo?**`
            );

        const botao = new ButtonBuilder()
            .setCustomId("enviar_recrutamento")
            .setLabel("📨 Enviar formulário")
            .setStyle(ButtonStyle.Primary);

        const linha = new ActionRowBuilder()
            .addComponents(botao);


        await interaction.reply({
            embeds: [embed],
            components: [linha]
        });
    }
};
