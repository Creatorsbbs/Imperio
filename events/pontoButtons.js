const {
    Events,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const Ponto = require("../models/Ponto");

function formatarTempo(ms) {

    const segundos = Math.floor(ms / 1000);

    const horas = Math.floor(segundos / 3600);

    const minutos = Math.floor((segundos % 3600) / 60);

    const seg = segundos % 60;

    return `${horas}h ${minutos}m ${seg}s`;

}

module.exports = {

    name: Events.InteractionCreate,

    async execute(interaction) {

        if (!interaction.isButton()) return;

        if (interaction.customId !== "ponto") return;

        const usuario = interaction.message.interaction?.user?.id;

        if (!usuario) {

            return interaction.reply({
                content: "❌ Não foi possível identificar o dono deste painel.",
                ephemeral: true
            });

        }

        if (interaction.user.id !== usuario) {

            return interaction.reply({
                content: "❌ Este painel não pertence a você.",
                ephemeral: true
            });

        }

        let dados = await Ponto.findOne({
            userId: interaction.user.id
        });

        if (!dados) {

            dados = await Ponto.create({
                userId: interaction.user.id
            });

        }

              if (!dados.emServico) {

            dados.emServico = true;
            dados.entrada = new Date();
            dados.pontosBatidos += 1;

            await dados.save();

        } else {

            const tempoTrabalhado = Date.now() - dados.entrada.getTime();

            dados.tempoTotal += tempoTrabalhado;

            dados.emServico = false;
            dados.entrada = null;

            await dados.save();

        }

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
                            : "Entrar de Serviço"
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
                            : "Entrar de Serviço"
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

        await interaction.update({
            embeds: [embed],
            components: [row]
        });

    }
};
