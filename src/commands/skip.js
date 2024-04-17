import { SlashCommandBuilder } from "discord.js";
import isQueueNotEmpty from "../middlewares/isQueueNotEmpty.js";
import getCurrentPlayingSong from "../utils/getCurrentPlayingSong.js";

export default {
    builder: () => new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Pular música"),

    middlewares: [isQueueNotEmpty],

    run: async(distube, interaction) => {
        const currentSong = getCurrentPlayingSong(distube.getQueue(interaction));

        distube.skip(interaction)
        .then(() => {
            interaction.deferReply();
            interaction.deleteReply();

            interaction.channel.send(`**${interaction.user.displayName}** pulou \`${currentSong.name}\``);
        })
        .catch(() => interaction.reply({ content: "Nenhuma música na fila para pular.", ephemeral: true }));
    },
}