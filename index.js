import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import { DisTube } from "distube";
import fs from "fs";
import "dotenv/config.js";

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.Reaction,
    ],
});

client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
});

client.login(process.env.TOKEN);

// carrega os comandos
client.on("ready", () => {
    client.commands = new Collection();

    fs.readdirSync("./src/commands").filter(f => f.endsWith(".js")).forEach(file => {
        const commandName = file.split(".")[0];

        import(`./src/commands/${commandName}.js`).then(command => {
            client.commands.set(commandName, command.default);
            client.application.commands.create(command.default.builder(client.distube));
        });
    });
});

client.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    const middlewares = command.middlewares;

    if (middlewares) {
        let middlewareIndex = 0;

        const executeMiddleware = () => {
            if (middlewareIndex < middlewares.length) {
                const middleware = middlewares[middlewareIndex];
                
                middleware(client.distube, interaction, () => {
                    middlewareIndex++;
                    executeMiddleware();
                });
            } else {
                command.run(client.distube, interaction);
            }
        };

        executeMiddleware();
    } else {
        command.run(client.distube, interaction);
    }
});

// carrega os eventos
fs.readdirSync("./src/events").filter(f => f.endsWith(".js")).forEach(file => {
    const eventName = file.split(".")[0];

    import(`./src/events/${eventName}.js`).then(event => {
        client.distube.on(eventName, event.default);
    });
});