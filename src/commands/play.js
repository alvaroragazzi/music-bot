import { SlashCommandBuilder } from "discord.js";
import isUserInVoiceChannel from "../middlewares/isUserInVoiceChannel.js";

export default {
    builder: () => new SlashCommandBuilder()
    .setName("play")
    .setDescription("Tocar uma música")
    .addStringOption(option =>
		option
            .setName("texto")
            .setDescription("Nome da música ou link do YouTube")
            .setRequired(true)),

    middlewares: [isUserInVoiceChannel],

    run: async(distube, interaction) => {
        interaction.deferReply();

        distube.play(interaction.member.voice.channel, interaction.options.getString("texto"), {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
        })
        .then(() => interaction.deleteReply())
        .catch(e => interaction.reply({ content: `Erro: ${e.message}`, ephemeral: true, }));
    },
}