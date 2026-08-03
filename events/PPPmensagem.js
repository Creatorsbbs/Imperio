const { Events, EmbedBuilder } = require("discord.js");

const CANAL_PPP = "1533536596048216074";

const EMOJI_PEGO = "<:pego:1533845660644806807>";
const EMOJI_PASSO = "<:passo:1533846600357646467>";
const EMOJI_PENSO = "<:penso:1533845860524228710>";

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
