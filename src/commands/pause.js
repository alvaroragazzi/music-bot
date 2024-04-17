import { SlashCommandBuilder } from "discord.js";
import isQueueNotEmpty from "../middlewares/isQueueNotEmpty.js";
import isPlayerPaused from "../middlewares/isPlayerPaused.js";

export default {
    builder: () => new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pausar música"),

    middlewares: [isQueueNotEmpty, isPlayerPaused],

    run: async(distube, interaction) => {
        distube.pause(interaction);
        interaction.deferReply();
        interaction.deleteReply();
    },
}