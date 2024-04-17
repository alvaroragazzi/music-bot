import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import isQueueNotEmpty from "../middlewares/isQueueNotEmpty.js";
import "dotenv/config.js";

export default {
    builder: () => new SlashCommandBuilder()
        .setName("activefilters")
        .setDescription("Exibe os filtros ativos."),

    middlewares: [isQueueNotEmpty],

    run: async(distube, interaction) => {
        const filters = distube.getQueue(interaction).filters.collection;

        if (filters.size == 0) {
            return interaction.reply({ content: "Nenhum filtro ativo.", ephemeral: true });
        }

        let description = "";

        filters.forEach(filter => {
            description += `:white_check_mark: ${filter.name}\n`;
        });

        const embed = new EmbedBuilder()
        .setTitle("Filtros ativos no momento")
        .setDescription(description)
        .setColor(process.env.EMBED_COLOR);

        interaction.reply({ embeds: [ embed ], ephemeral: true });
    },
}