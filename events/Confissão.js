const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");

const CANAL_CONFISSAO = "1533541097169616997";

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction) {

        // Quando clicar no botão
        if (interaction.isButton()) {

            if (interaction.customId === "confissao") {

                const modal = new ModalBuilder()
                    .setCustomId("modal_confissao")
                    .setTitle("Confissão Anônima");


                const texto = new TextInputBuilder()
                    .setCustomId("texto")
                    .setLabel("Digite sua confissão")
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true);


                const linha = new ActionRowBuilder()
                    .addComponents(texto);


                modal.addComponents(linha);

                await interaction.showModal(modal);
            }
        }


        // Quando enviar a confissão
        if (interaction.isModalSubmit()) {

            if (interaction.customId === "modal_confissao") {

                const confissao = interaction.fields.getTextInputValue("texto");


                const embed = new EmbedBuilder()
                    .setTitle("💌 Confissão Anônima")
                    .setDescription(confissao)
                    .setFooter({
                        text: "Mensagem enviada anonimamente"
                    });


                const canal = interaction.guild.channels.cache.get(CANAL_CONFISSAO);


                await canal.send({
                    embeds: [embed]
                });


                await interaction.reply({
                    content: "✅ Sua confissão foi enviada anonimamente!",
                    ephemeral: true
                });
            }
        }
    }
};
