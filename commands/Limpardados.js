const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");

const Ponto = require("../models/Ponto");

module.exports = {

    data: new SlashCommandBuilder()

        .setName("limpardados")

        .setDescription("Apaga todos os registros de ponto.")

        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
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



        await Ponto.deleteMany({});



        const embed = new EmbedBuilder()

            .setColor("#FF0000")

            .setTitle("🗑️ Dados de Ponto Apagados")

            .setDescription(
`Todos os registros de ponto foram removidos.

👤 Responsável:
${interaction.user}

⚠️ Esta ação não pode ser desfeita.`
            );



        await interaction.reply({

            embeds: [embed]

        });


    }

};
