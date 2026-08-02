const {
    Client,
    GatewayIntentBits,
    Collection,
    Events
} = require("discord.js");

const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Bot online!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, client => {
    console.log(`${client.user.tag} está online!`);
});

client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "Erro ao executar esse comando.",
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: "Erro ao executar esse comando.",
                ephemeral: true
            });
        }
    }

});

client.login(process.env.TOKEN);
