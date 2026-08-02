const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("limpar")
        .setDescription("Apaga mensagens do canal.")
        .addIntegerOption(option =>
            option
                .setName("quantidade")
                .setDescription("Quantidade de mensagens para apagar (1-100)")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {

        const quantidade = interaction.options.getInteger("quantidade");

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({
                content: "❌ Você não tem permissão para usar este comando.",
                ephemeral: true
            });
        }

        try {

            await interaction.channel.bulkDelete(quantidade, true);

            await interaction.reply({
                content: `✅ ${quantidade} mensagens foram apagadas.`,
                ephemeral: true
            });

        } catch (err) {

            console.error(err);

            await interaction.reply({
                content: "❌ Não consegui apagar as mensagens.",
                ephemeral: true
            });

        }

    }
};
