const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,

    async execute(member) {

        // ID do canal de boas-vindas
        const canal = member.guild.channels.cache.get("1533536441445908704");

        if (!canal) return;

        const embed = new EmbedBuilder()
            .setColor("#2F3136")
            .setTitle("👑 Bem-vindo à Tropa Imperial!")
            .setDescription(`Seja bem-vindo(a), ${member}!`)
            .setThumbnail(member.user.displayAvatarURL({ size: 1024 }))
            .setImage("https://cdn.discordapp.com/attachments/1500914111725436992/1533627754216689816/file_000000004ccc820eaa941884b30d693d.png?ex=6a712da6&is=6a6fdc26&hm=3d7a9d25d9219205b5ebcbf8f1f5d600fc276e67034ac2e79befd1b0d7fa3c98&")
            .setTimestamp();

        await canal.send({
            content: `${member}`,
            embeds: [embed]
        });

    }
};
