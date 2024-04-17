import { EmbedBuilder } from "discord.js";
import "dotenv/config.js";

export default (queue, song) => {
    const embed = new EmbedBuilder()
    .setTitle("Adicionado à fila")
    .setDescription(`[${song.name}](${song.url})\nSolicitado por: **${song.user.displayName}**`)
    .setImage(song.thumbnail)
    .setColor(process.env.EMBED_COLOR);

    queue.textChannel.send({ embeds: [embed] });
}