const { 
    Events, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    ActionRowBuilder, 
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const CANAL_ANALISE = "1533652348109455360";
const CARGO_RECRUTA = "1533546542458212464";
const CARGO_APROVADO = "1533546835300454430";


module.exports = {

    name: Events.InteractionCreate,


    async execute(interaction) {


        // Botão de enviar formulário

        if (interaction.isButton()) {

            if (interaction.customId === "enviar_recrutamento") {


                const modal = new ModalBuilder()
                    .setCustomId("formulario_recrutamento")
                    .setTitle("Recrutamento");


                const resposta = new TextInputBuilder()
                    .setCustomId("resposta")
                    .setLabel("Cole seu formulário respondido")
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true);


                const linha = new ActionRowBuilder()
                    .addComponents(resposta);


                modal.addComponents(linha);


                await interaction.showModal(modal);
            }



            // APROVAR

            if (interaction.customId.startsWith("aprovar_")) {


                const idMembro = interaction.customId.split("_")[1];

                const membro = await interaction.guild.members.fetch(idMembro);


                await membro.roles.remove(CARGO_RECRUTA);

                await membro.roles.add(CARGO_APROVADO);


                const embed = EmbedBuilder.from(interaction.message.embeds[0])
    .addFields({
        name: "📌 Status",
        value: `✅ Aprovado\n👤 Responsável: ${interaction.user}`
    })
    .setColor("#00FF00");


await interaction.update({
    embeds: [embed],
    components: []
});

await interaction.followUp({
    content: "✅ Membro aprovado!",
    ephemeral: true
});

            }



            // RECUSAR

            if (interaction.customId.startsWith("recusar_")) {


                const idMembro = interaction.customId.split("_")[1];

                const membro = await interaction.guild.members.fetch(idMembro);



                await membro.send(
                    "❌ Seu recrutamento não foi aprovado."
                ).catch(() => {});


                await membro.kick(
                    "Recrutamento recusado."
                ).catch(() => {});


                const embed = EmbedBuilder.from(interaction.message.embeds[0])
    .addFields({
        name: "📌 Status",
        value: `❌ Recusado\n👤 Responsável: ${interaction.user}`
    })
    .setColor("#FF0000");


await interaction.update({
    embeds: [embed],
    components: []
});

await interaction.followUp({
    content: "❌ Membro recusado.",
    ephemeral: true
});

            }

        }



        // Quando envia o formulário


        if (interaction.isModalSubmit()) {


            if (interaction.customId === "formulario_recrutamento") {


                const resposta = interaction.fields.getTextInputValue("resposta");


                const embed = new EmbedBuilder()
                    .setTitle("📋 Novo Recrutamento")
                    .setDescription(
`**Membro:** ${interaction.user}

**Formulário:**

${resposta}`
                    );


                const aprovar = new ButtonBuilder()
                    .setCustomId(`aprovar_${interaction.user.id}`)
                    .setLabel("✅ Aprovar")
                    .setStyle(ButtonStyle.Success);


                const recusar = new ButtonBuilder()
                    .setCustomId(`recusar_${interaction.user.id}`)
                    .setLabel("❌ Recusar")
                    .setStyle(ButtonStyle.Danger);



                const linha = new ActionRowBuilder()
                    .addComponents(aprovar, recusar);



                const canal = interaction.guild.channels.cache.get(CANAL_ANALISE);


                await canal.send({
                    embeds:[embed],
                    components:[linha]
                });



                await interaction.reply({
                    content:"✅ Formulário enviado para análise!",
                    ephemeral:true
                });

            }
        }

    }
};
