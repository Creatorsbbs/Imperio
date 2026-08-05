const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const Ponto = require("../models/Ponto");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("limpardados")

        .setDescription("Apaga registros de ponto.")

        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
        )

        .addUserOption(option =>
            option
                .setName("usuario")
                .setDescription("Usuário que terá os dados apagados.")
                .setRequired(false)
        ),


    async execute(interaction) {


        if (!interaction.member.permissions.has(
            PermissionFlagsBits.Administrator
        )) {

            return interaction.reply({
                content: "❌ Você não tem permissão para usar este comando.",
                ephemeral: true
            });

        }


        const usuario = interaction.options.getUser("usuario");


        const alvo = usuario
            ? `${usuario}`
            : "👥 Todos os funcionários";


        const embed = new EmbedBuilder()

            .setColor("#FFAA00")

            .setTitle("⚠️ Confirmação de limpeza")

            .setDescription(
`Você está prestes a apagar registros de ponto.

🎯 **Alvo**
${alvo}

👤 **Responsável**
${interaction.user}

⚠️ Esta ação não pode ser desfeita.`
            );



        const row = new ActionRowBuilder()

            .addComponents(

                new ButtonBuilder()

                    .setCustomId(
                        usuario
                            ? `confirmar_limpeza_${usuario.id}`
                            : "confirmar_limpeza_todos"
                    )

                    .setLabel("🗑️ Confirmar")

                    .setStyle(ButtonStyle.Danger),


                new ButtonBuilder()

                    .setCustomId("cancelar_limpeza")

                    .setLabel("❌ Cancelar")

                    .setStyle(ButtonStyle.Secondary)

            );



        await interaction.reply({

            embeds: [embed],

            components: [row],

            ephemeral: true

        });

    }

};
