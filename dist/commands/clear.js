"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName('clear')
    .setDescription('Supprime un nombre donné de messages du canal.')
    .addIntegerOption(option => option.setName('nombre')
    .setDescription('Nombre de messages à supprimer (1-100).')
    .setRequired(true));
async function execute(interaction) {
    const nombre = interaction.options.get('nombre')?.value;
    if (nombre < 1 || nombre > 100) {
        await interaction.reply({
            content: 'Veuillez spécifier un nombre entre 1 et 100.',
            ephemeral: true,
        });
        return;
    }
    const channel = interaction.channel;
    if (!channel || !(channel instanceof discord_js_1.TextChannel)) {
        await interaction.reply({
            content: 'Cette commande ne peut être utilisée que dans un canal texte.',
            ephemeral: true,
        });
        return;
    }
    try {
        // Récupérer les messages du canal, avec une limite de "nombre"
        const messages = await channel.messages.fetch({ limit: nombre });
        // Vérifier si des messages ont été récupérés
        if (messages.size === 0) {
            await interaction.reply({
                content: 'Aucun message à supprimer.',
                ephemeral: true,
            });
            return;
        }
        // Log les messages récupérés pour diagnostic
        console.log(`Messages récupérés: ${messages.size}`);
        console.log(messages.map(m => m.content)); // Affiche les contenus des messages
        // Essayer de supprimer les messages
        await channel.bulkDelete(messages, true);
        console.log(`Messages supprimés: ${messages.size}`); // Log après suppression
        // Répondre à l'utilisateur
        await interaction.reply({
            content: `✅ ${messages.size} message(s) supprimé(s) avec succès !`,
            ephemeral: true,
        });
        // Log dans un canal dédié (si existant)
        const logChannel = interaction.guild?.channels.cache.get('1315970739043700770');
        if (logChannel && logChannel.isTextBased()) {
            await logChannel.send(`🧹 ${interaction.user.tag} a supprimé ${messages.size} message(s) dans ${channel.name}.`);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error);
            await interaction.reply({
                content: `❌ Une erreur s'est produite lors de la suppression des messages : ${error.message}`,
                ephemeral: true,
            });
            const logChannel = interaction.guild?.channels.cache.get('1315970739043700770');
            if (logChannel && logChannel.isTextBased()) {
                await logChannel.send(`❌ Erreur lors de la suppression des messages dans ${channel.name}: ${error.message}`);
            }
        }
    }
}
