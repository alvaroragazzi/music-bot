import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import isQueueNotEmpty from "../middlewares/isQueueNotEmpty.js";
import "dotenv/config.js";

export default {
    builder: () => new SlashCommandBuilder()
    .setName("getqueue")
    .setDescription("Exibir a fila de músicas"),

    middlewares: [isQueueNotEmpty],

    run: async(distube, interaction) => {
        const queue = distube.getQueue(interaction);
        const songs = queue.songs;

        let description = "";

        songs.forEach((song, idx) => {
            description += `**${idx + 1}.** [${song.name}](${song.url}) \`${song.formattedDuration}\` \n`;
        });

        const embed = new EmbedBuilder()
        .setTitle("Fila de músicas")
        .setDescription(description)
        .setColor(process.env.EMBED_COLOR);

        interaction.reply({ embeds: [ embed ], ephemeral: true });
    },
}