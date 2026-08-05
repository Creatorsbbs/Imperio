const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const Ponto = require("../models/Ponto");

function formatarTempo(ms) {

    const segundos = Math.floor(ms / 1000);

    const horas = Math.floor(segundos / 3600);

    const minutos = Math.floor((segundos % 3600) / 60);

    return `${horas}h ${minutos}m`;

}

module.exports = {

    data: new SlashCommandBuilder()

        .setName("ranking")

        .setDescription("Mostra o ranking de funcionários por tempo trabalhado."),


    async execute(interaction) {


        const usuarios = await Ponto.find()

            .sort({
                tempoTotal: -1
            })

            .limit(10);



        if (!usuarios.length) {

            return interaction.reply({

                content: "❌ Ainda não existem registros de ponto.",

                ephemeral: true

            });

        }



        let lista = "";


        for (let i = 0; i < usuarios.length; i++) {

            const usuario = usuarios[i];


            const membro = await interaction.guild.members
                .fetch(usuario.userId)
                .catch(() => null);



            lista +=
`**${i + 1}º** ${membro ? membro.user.username : "Usuário saiu do servidor"}

⏱ ${formatarTempo(usuario.tempoTotal)}

📊 Pontos: ${usuario.pontosBatidos}

`;

        }



        const embed = new EmbedBuilder()

            .setColor("#F5C542")

            .setTitle("🏆 Ranking de Funcionários")

            .setDescription(lista)

            .setFooter({
                text: "Sistema de Bate Ponto Imperial"
            });



        await interaction.reply({

            embeds: [embed]

        });


    }

};
