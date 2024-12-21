"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName('say')
    .setDescription('Fait parler le bot avec un message simple.')
    .addStringOption(option => option.setName('texte')
    .setDescription('Le contenu du message à envoyer.')
    .setRequired(true));
async function execute(interaction) {
    const texte = interaction.options.getString('texte');
    if (!texte) {
        await interaction.reply({ content: 'Vous devez fournir un texte à envoyer.', ephemeral: true });
        return;
    }
    // Envoi du texte fourni par l'utilisateur
    await interaction.reply({ content: texte });
}
