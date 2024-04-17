export default (distube, interaction, next) => {
    if (distube.getQueue(interaction).paused) {
        interaction.reply({ content: "O player já está pausado.", ephemeral: true });
        return;
    }
    
    next();
}