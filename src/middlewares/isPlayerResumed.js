export default (distube, interaction, next) => {
    if (distube.getQueue(interaction).playing) {
        interaction.reply({ content: "O player já está resumido.", ephemeral: true });
        return;
    }
    
    next();
}