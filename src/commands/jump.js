import { SlashCommandBuilder } from "discord.js";
import isQueueNotEmpty from "../middlewares/isQueueNotEmpty.js";
import getCurrentPlayingSong from "../utils/getCurrentPlayingSong.js";

export default {
    builder: () => new SlashCommandBuilder()
    .setName("jump")
    .setDescription("Pular música")
    .addIntegerOption(option =>
		option
            .setName("posição")
            .setDescription("Número da posição da música, use /getqueue para ver as posições")
            .setRequired(true)),

    middlewares: [isQueueNotEmpty],

    run: async(distube, interaction) => {
        const oldSong = getCurrentPlayingSong(distube.getQueue(interaction));

        distube.jump(interaction, interaction.options.getInteger("posição") - 1)
            .then(() => {
                interaction.deferReply();
                interaction.deleteReply();

                const newSong = getCurrentPlayingSong(distube.getQueue(interaction));

                interaction.channel.send(`**${interaction.user.displayName}** pulou de \`${oldSong.name}\` para \`${newSong.name}\``);
            })
            .catch(() => interaction.reply({ content: "Posição inválida", ephemeral: true, }));
    },
}