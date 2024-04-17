import { SlashCommandBuilder } from "discord.js";
import isQueueNotEmpty from "../middlewares/isQueueNotEmpty.js";

export default {
    builder: (distube) => new SlashCommandBuilder()
        .setName("removefilter")
        .setDescription("Remover filtro")
        .addStringOption(option => 
            option.setName("nome")
            .setRequired(true)
            .setDescription("Nome do filtro")
            .addChoices(
                ...Object.keys(distube.filters).map(filter => ({ name: filter, value: filter }))
            )
        ),

    middlewares: [isQueueNotEmpty],

    run: async(distube, interaction) => {
        distube.getQueue(interaction).filters.remove(interaction.options.getString("nome"));
        interaction.deferReply();
        interaction.deleteReply();
    },
}