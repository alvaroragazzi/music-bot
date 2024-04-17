export default (distube, interaction, next) => {
    if (!distube.getQueue(interaction)) {
        interaction.reply({ content: "Nenhuma música tocando no momento.", ephemeral: true });
        return;
    }

    next();
}