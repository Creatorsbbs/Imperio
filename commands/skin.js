const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skin")
        .setDescription("Mostra a skin de um usuário do Roblox.")
        .addStringOption(option =>
            option
                .setName("usuario")
                .setDescription("Nome do usuário do Roblox")
                .setRequired(true)
        ),

    async execute(interaction) {

        await interaction.deferReply();

        const username = interaction.options.getString("usuario");

        try {

            // Procura o usuário
            const userResponse = await axios.post(
                "https://users.roblox.com/v1/usernames/users",
                {
                    usernames: [username],
                    excludeBannedUsers: false
                }
            );

            if (!userResponse.data.data.length) {
                return interaction.editReply("❌ Usuário não encontrado.");
            }

            const user = userResponse.data.data[0];

            const userId = user.id;

            // Informações do perfil
            const profile = await axios.get(
                `https://users.roblox.com/v1/users/${userId}`
            );

            // Thumbnail da skin
            const thumbnail = await axios.get(
                `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=720x720&format=Png&isCircular=false`
            );

            const image = thumbnail.data.data[0].imageUrl;

            const embed = new EmbedBuilder()
                .setColor("White")
                .setTitle(profile.data.displayName)
                .setURL(`https://www.roblox.com/users/${userId}/profile`)
                .setDescription(profile.data.description || "*Sem bio.*")
                .addFields(
                    {
                        name: "👤 Usuário",
                        value: profile.data.name,
                        inline: true
                    },
                    {
                        name: "🎭 Nome de Exibição",
                        value: profile.data.displayName,
                        inline: true
                    }
                )
                .setImage(image)
                .setFooter({
                    text: `ID: ${userId}`
                });

            await interaction.editReply({
                embeds: [embed]
            });

        } catch (err) {

            console.error(err);

            interaction.editReply("❌ Ocorreu um erro ao buscar esse usuário.");

        }

    }
};
