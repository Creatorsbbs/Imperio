const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.GuildMemberRemove,

    async execute(member) {

        // ID do canal de saída
        const canal = member.guild.channels.cache.get("1533536547381448727");

        if (!canal) return;

        const embed = new EmbedBuilder()
            .setColor("#ff3b30")
            .setTitle("👋 Um membro saiu...")
            .setDescription(
                `**${member.user.tag}** saiu da **Tropa Imperial**.\n\n` +
                `Agora somos **${member.guild.memberCount}** membros.`
            )
            .setThumbnail(member.user.displayAvatarURL({ size: 1024 }))
            .setImage("https://cdn.discordapp.com/attachments/1500914111725436992/1533627754216689816/file_000000004ccc820eaa941884b30d693d.png?ex=6a712da6&is=6a6fdc26&hm=3d7a9d25d9219205b5ebcbf8f1f5d600fc276e67034ac2e79befd1b0d7fa3c98&")
            .setTimestamp();

        await canal.send({
            embeds: [embed]
        });

    }
};
