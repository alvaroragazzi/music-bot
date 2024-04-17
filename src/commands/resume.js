import { SlashCommandBuilder } from "discord.js";
import isQueueNotEmpty from "../middlewares/isQueueNotEmpty.js";
import isPlayerResumed from "../middlewares/isPlayerResumed.js";

export default {
    builder: () => new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumir música"),

    middlewares: [isQueueNotEmpty, isPlayerResumed],

    run: async(distube, interaction) => {
        distube.resume(interaction)
        interaction.deferReply();
        interaction.deleteReply();
    },
}