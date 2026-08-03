const { Events, EmbedBuilder } = require("discord.js");

const CANAL_PPP = "ID_DO_CANAL";

const EMOJI_PEGO = "<:pego:ID_DO_EMOJI>";
const EMOJI_PASSO = "<:passo:ID_DO_EMOJI>";
const EMOJI_PENSO = "<:penso:ID_DO_EMOJI>";

module.exports = {
    name: "pppFotoRecebida",

    async execute(message) {

        const canal = message.guild.channels.cache.get(CANAL_PPP);

        if (!canal) return;

        const imagem = message.attachments.first();

        if (!imagem.contentType?.startsWith("image/")) {
            return message.reply("❌ Envie apenas imagens.");
        }

        const embed = new EmbedBuilder()
            .setColor("#f5c542")
            .setAuthor({
                name: message.author.username
            })
            .setImage(imagem.url)
            .setFooter({
                text: "Pego • Passo • Penso"
            });

        const enviada = await canal.send({
            embeds: [embed]
        });

        await enviada.react(EMOJI_PEGO);
        await enviada.react(EMOJI_PASSO);
        await enviada.react(EMOJI_PENSO);

        await message.reply({
            content: "✅ Sua foto foi publicada!"
        });

        await message.delete().catch(() => {});
    }
};
