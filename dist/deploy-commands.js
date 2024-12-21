"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const rest_1 = require("@discordjs/rest");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Crée un client REST
const rest = new rest_1.REST({ version: '10' }).setToken(process.env.TOKEN);
// Crée les données des commandes à enregistrer
const commands = [
    new discord_js_1.SlashCommandBuilder()
        .setName('say')
        .setDescription('Fait parler le bot avec un message simple.')
        .addStringOption(option => option.setName('texte')
        .setDescription('Le contenu du message à envoyer.')
        .setRequired(true)),
    new discord_js_1.SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulser un utilisateur du serveur.')
        .addUserOption(option => option.setName('utilisateur')
        .setDescription('L\'utilisateur à expulser')
        .setRequired(true))
        .addStringOption(option => option.setName('raison')
        .setDescription('Raison de l\'expulsion')
        .setRequired(false)),
    new discord_js_1.SlashCommandBuilder()
        .setName('mute')
        .setDescription('Rendre un utilisateur muet temporairement.')
        .addUserOption(option => option.setName('utilisateur')
        .setDescription('L\'utilisateur à rendre muet')
        .setRequired(true))
        .addIntegerOption(option => option.setName('durée')
        .setDescription('Durée en minutes (laisser vide pour un mute permanent)')
        .setRequired(false)),
    new discord_js_1.SlashCommandBuilder()
        .setName('saye')
        .setDescription('Créer un message embed.')
        .addStringOption(option => option.setName('texte')
        .setDescription('Le contenu principal de l\'embed')
        .setRequired(true))
        .addStringOption(option => option.setName('titre')
        .setDescription('Le titre de l\'embed (optionnel)')
        .setRequired(false)),
    // Commande /cash
    new discord_js_1.SlashCommandBuilder()
        .setName('cash')
        .setDescription('Affiche le message du concours Cashprize sur Wizorah.'),
    // Nouvelle commande /spoil
    new discord_js_1.SlashCommandBuilder()
        .setName('spoil')
        .setDescription('Affiche un aperçu du Lobby Enchanté de Wizorah.')
]
    .map(command => command.toJSON());
// Enregistre les commandes sur Discord
async function deployCommands() {
    try {
        console.log('Démarrage de l\'enregistrement des commandes slash...');
        await rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands,
        });
        console.log('Commandes enregistrées avec succès!');
    }
    catch (error) {
        console.error('Erreur lors de l\'enregistrement des commandes:', error);
    }
}
deployCommands();
