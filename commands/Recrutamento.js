const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("recrutamento")
        .setDescription("Cria o painel de recrutamento"),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle("🛡️ copie e responda o formulário e envie.")
            .setDescription(
`╭─────── ⋆⋅☆⋅⋆ ───────╮
        𓆩 𝑹𝑬𝑪𝑹𝑼𝑻𝑨𝑴𝑬𝑵𝑻𝑶 𓆪
              𝑻𝑹𝑶𝑷𝑨 𝑰𝑴𝑷𝑬𝑹𝑰𝑨𝑳
╰─────── ⋆⋅☆⋅⋆ ───────╯

Preencha o formulário corretamente.
Respostas falsas poderão resultar em reprovação.

╭──────────────╮
      𓂃 𝑭𝑶𝑹𝑴𝑼𝑳𝑨́𝑹𝑰𝑶
╰──────────────╯

➥ 𝑼𝒔𝒆𝒓𝒏𝒂𝒎𝒆 𝒅𝒐 𝑹𝒐𝒃𝒍𝒐𝒙:
➤

➥ 𝑺𝒆𝒖 𝒏𝒐𝒎𝒆:
➤

➥ 𝒖𝒔𝒆𝒓 𝑫𝒊𝒔𝒄𝒐𝒓𝒅:
➤

➥ 𝑰𝒅𝒂𝒅𝒆:
➤

➥ 𝒗𝒆𝒊𝒐 𝒑𝒐𝒓 𝒒𝒖𝒆𝒎?
➤

➥ 𝑫𝒆 𝒒𝒖𝒂𝒍 𝒃𝒂𝒊𝒍𝒆 𝒗𝒆𝒎?
➤

➥ 𝑷𝒐𝒔𝒔𝒖𝒊 𝒆𝒙𝒑𝒆𝒓𝒊𝒆̂𝒏𝒄𝒊𝒂 𝒆𝒎 𝒕𝒓𝒐𝒑𝒂𝒔?
➤

➥ 𝑷𝒐𝒓 𝒒𝒖𝒆 𝒅𝒆𝒔𝒆𝒋𝒂 𝒆𝒏𝒕𝒓𝒂𝒓 𝒏𝒂 𝑻𝒓𝒐𝒑𝒂 𝑰𝒎𝒑𝒆𝒓𝒊𝒂𝒍?
➤

➥ 𝑸𝒖𝒂𝒍 𝒔𝒖𝒂 𝒅𝒊𝒔𝒑𝒐𝒏𝒊𝒃𝒊𝒍𝒊𝒅𝒂𝒅𝒆 𝒑𝒂𝒓𝒂 𝒃𝒂𝒊𝒍𝒆𝒔 𝒆 𝒆𝒗𝒆𝒏𝒕𝒐𝒔?
➤

➥ 𝑷𝒐𝒔𝒔𝒖𝒊 𝒎𝒊𝒄𝒓𝒐𝒇𝒐𝒏𝒆?
➤

➥ 𝑺𝒂𝒃𝒆 𝒔𝒆𝒈𝒖𝒊𝒓 𝒓𝒆𝒈𝒓𝒂𝒔 𝒆 𝒓𝒆𝒔𝒑𝒆𝒊𝒕𝒂𝒓 𝒂 𝒍𝒊𝒅𝒆𝒓𝒂𝒏𝒄̧𝒂?
➤

➥ 𝑶 𝒒𝒖𝒆 𝒗𝒐𝒄𝒆̂ 𝒑𝒐𝒅𝒆 𝒂𝒄𝒓𝒆𝒔𝒄𝒆𝒏𝒕𝒂𝒓 𝒑𝒂𝒓𝒂 𝒂 𝒕𝒓𝒐𝒑𝒂?
➤

╭──────────────╮
  𓆩 Aguarde a avaliação da liderança 𓆪
╰──────────────╯`
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
