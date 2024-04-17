export default (distube, interaction, next) => {
    if (!interaction.member.voice.channel) {
        interaction.reply({ content: "Você não está em um canal de voz, entre em um primeiro antes de usar este comando.", ephemeral: true });
        return;
    }
    
    next();
}