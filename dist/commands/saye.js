"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName('saye')
    .setDescription('Créer un message embed.')
    .addStringOption(option => option.setName('texte')
    .setDescription('Le contenu principal de l\'embed')
    .setRequired(true))
    .addStringOption(option => option.setName('titre')
    .setDescription('Le titre de l\'embed (optionnel)')
    .setRequired(false));
async function execute(interaction) {
    const titre = interaction.options.getString('titre');
    const texte = interaction.options.getString('texte');
    if (!texte) {
        await interaction.reply({ content: 'Vous devez fournir du texte pour l\'embed.', ephemeral: true });
        return;
    }
    // Construire l'embed
    const embed = new discord_js_1.EmbedBuilder()
        .setDescription(texte)
        .setColor('#7289DA') // Couleur Discord par défaut
        .setFooter({
        text: `Wizorah - ${new Date().toLocaleString()}`,
    });
    if (titre) {
        embed.setTitle(titre);
    }
    // Répondre à la commande avec l'embed
    await interaction.reply({ embeds: [embed] });
}
