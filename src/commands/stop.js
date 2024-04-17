import { SlashCommandBuilder } from "discord.js";
import isQueueNotEmpty from "../middlewares/isQueueNotEmpty.js";

export default {
    builder: () => new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Parar música"),

    middlewares: [isQueueNotEmpty],

    run: async(distube, interaction) => {
        distube.stop(interaction);
        interaction.deferReply();
        interaction.deleteReply();
    },
}