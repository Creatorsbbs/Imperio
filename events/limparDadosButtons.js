const {
    Events,
    EmbedBuilder
} = require("discord.js");

const Ponto = require("../models/Ponto");


module.exports = {

    name: Events.InteractionCreate,


    async execute(interaction) {


        if (!interaction.isButton()) return;



        if (interaction.customId === "cancelar_limpeza") {

            return interaction.update({

                content: "❌ Limpeza cancelada.",

                embeds: [],

                components: []

            });

        }



        if (!interaction.customId.startsWith("confirmar_limpeza"))
            return;



        if (!interaction.member.permissions.has("Administrator")) {

            return interaction.reply({

                content: "❌ Você não tem permissão.",

                ephemeral: true

            });

        }



        const id = interaction.customId;



        if (id === "confirmar_limpeza_todos") {


            const resultado = await Ponto.deleteMany({});



            const embed = new EmbedBuilder()

                .setColor("#FF0000")

                .setTitle("🗑️ Dados apagados")

                .setDescription(
`Todos os registros foram removidos.

📊 Registros apagados:
${resultado.deletedCount}

👤 Responsável:
${interaction.user}`
                );



            return interaction.update({

                embeds: [embed],

                components: []

            });


        }



        const usuarioId = id.replace(
            "confirmar_limpeza_",
            ""
        );



        const resultado = await Ponto.deleteOne({

            userId: usuarioId

        });



        const embed = new EmbedBuilder()

            .setColor("#FF0000")

            .setTitle("🗑️ Dados apagados")

            .setDescription(
`Registro do usuário removido.

👤 Usuário:
<@${usuarioId}>

📊 Registros apagados:
${resultado.deletedCount}

👤 Responsável:
${interaction.user}`
            );



        await interaction.update({

            embeds: [embed],

            components: []

        });


    }

};
