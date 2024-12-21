"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName('mute')
    .setDescription('Rendre un utilisateur muet temporairement.')
    .addUserOption(option => option.setName('utilisateur')
    .setDescription('L\'utilisateur à rendre muet')
    .setRequired(true))
    .addIntegerOption(option => option.setName('durée')
    .setDescription('Durée en minutes (laisser vide pour un mute permanent)')
    .setRequired(false));
async function execute(interaction) {
    const utilisateur = interaction.options.getUser('utilisateur');
    const durée = interaction.options.getInteger('durée');
    if (!utilisateur) {
        await interaction.reply({ content: 'Utilisateur introuvable.', ephemeral: true });
        return;
    }
    const membre = interaction.guild?.members.cache.get(utilisateur.id);
    if (!membre) {
        await interaction.reply({ content: 'Membre introuvable dans ce serveur.', ephemeral: true });
        return;
    }
    try {
        // Si une durée est donnée, on applique un timeout
        if (durée) {
            await membre.timeout(durée * 60 * 1000, `Mute temporaire pour ${durée} minute(s)`); // Convertir la durée en millisecondes
            await interaction.reply({ content: `${utilisateur.tag} a été rendu muet pour ${durée} minute(s).`, ephemeral: true });
            // Log dans le canal de log
            const logChannel = interaction.guild?.channels.cache.get('1315970739043700770');
            if (logChannel && logChannel.isTextBased()) {
                await logChannel.send(`${utilisateur.tag} a été rendu muet pour ${durée} minute(s).`);
            }
        }
        else {
            // Si aucune durée n'est donnée, on applique un timeout permanent
            await membre.timeout(null, `Mute permanent`);
            await interaction.reply({ content: `${utilisateur.tag} a été rendu muet définitivement.`, ephemeral: true });
            // Log dans le canal de log
            const logChannel = interaction.guild?.channels.cache.get('1315970739043700770');
            if (logChannel && logChannel.isTextBased()) {
                await logChannel.send(`${utilisateur.tag} a été rendu muet définitivement.`);
            }
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
        console.error(`Erreur lors du mute :`, error);
        // Réponse en cas d'erreur
        await interaction.reply({ content: `❌ Une erreur est survenue lors du mute : ${errorMessage}`, ephemeral: true });
        // Envoi de l'erreur dans le canal de log
        const logChannel = interaction.guild?.channels.cache.get('1315970739043700770');
        if (logChannel && logChannel.isTextBased()) {
            await logChannel.send(`❌ Erreur lors du mute de ${utilisateur.tag}: ${errorMessage}`);
        }
    }
}
