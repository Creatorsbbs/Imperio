const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const Ponto = require("../models/Ponto");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("ponto")
        .setDescription("Bater ponto."),

    async execute(interaction) {

        let dados = await Ponto.findOne({
            userId: interaction.user.id
        });

        if (!dados) {

            dados = await Ponto.create({
                userId: interaction.user.id
            });

        }

        const formatarTempo = (ms) => {

            const segundos = Math.floor(ms / 1000);

            const horas = Math.floor(segundos / 3600);

            const minutos = Math.floor((segundos % 3600) / 60);

            const seg = segundos % 60;

            return `${horas}h ${minutos}m ${seg}s`;

        };

        const status = dados.emServico
            ? "🟢 Em Serviço"
            : "🔴 Fora de Serviço";

        const entrada = dados.entrada
            ? `<t:${Math.floor(dados.entrada.getTime() / 1000)}:F>`
            : "Nenhuma";

        const embed = new EmbedBuilder()

            .setColor("#F5C542")

            .setTitle("🕒 Sistema de Bate Ponto")

            .setDescription(
`## Informações

👤 **Funcionário**
${interaction.user}

📌 **Status**
${status}

⏰ **Entrada**
${entrada}

⌛ **Tempo Total**
${formatarTempo(dados.tempoTotal)}

📊 **Pontos Batidos**
${dados.pontosBatidos}`
            );

        const row = new ActionRowBuilder()

            .addComponents(

                new ButtonBuilder()

                    .setCustomId("ponto")

                    .setLabel(
                        dados.emServico
                            ? "Sair de Serviço"
                            : "Entrar em Serviço"
                    )

                    .setEmoji(
                        dados.emServico
                            ? "🔴"
                            : "🟢"
                    )

                    .setStyle(
                        dados.emServico
                            ? ButtonStyle.Danger
                            : ButtonStyle.Success
                    )

            );

        await interaction.reply({

            embeds: [embed],

            components: [row]

        });

    }

};
