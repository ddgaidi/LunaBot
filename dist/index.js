"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importations nécessaires
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialisation du client Discord
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers, // Requis pour gérer les événements d'ajout de membres
    ],
});
// Événement déclenché lorsque le bot est prêt
client.once('ready', () => {
    console.log(`Lunabot est en ligne en tant que ${client.user?.tag}!`);
});
// Chargement dynamique des événements
Promise.resolve().then(() => __importStar(require('./events/guildMemberAdd'))).then((event) => {
    event.default(client); // Appel de l'export par défaut
});
// Gestion des interactions utilisateur
client.on('interactionCreate', async (interaction) => {
    // Vérifie si l'interaction est bien une commande
    if (!interaction.isCommand())
        return;
    // Force TypeScript à comprendre que l'interaction est une ChatInputCommandInteraction
    const commandInteraction = interaction;
    const { commandName } = commandInteraction;
    try {
        switch (commandName) {
            case 'mute': {
                const { execute } = await Promise.resolve().then(() => __importStar(require('./commands/mute')));
                await execute(commandInteraction);
                break;
            }
            case 'kick': {
                const { execute } = await Promise.resolve().then(() => __importStar(require('./commands/kick')));
                await execute(commandInteraction);
                break;
            }
            case 'saye': {
                const { execute } = await Promise.resolve().then(() => __importStar(require('./commands/saye')));
                await execute(commandInteraction);
                break;
            }
            case 'say': {
                const { execute } = await Promise.resolve().then(() => __importStar(require('./commands/say')));
                await execute(commandInteraction);
                break;
            }
            case 'cash': {
                const { execute } = await Promise.resolve().then(() => __importStar(require('./commands/cash')));
                await execute(commandInteraction);
                break;
            }
            case 'spoil': {
                const { execute } = await Promise.resolve().then(() => __importStar(require('./commands/spoil')));
                await execute(commandInteraction);
                break;
            }
            default:
                console.warn(`Commande inconnue : ${commandName}`);
        }
    }
    catch (error) {
        console.error(`Erreur lors de l'exécution de la commande ${commandName}:`, error);
    }
});
// Connexion du client au serveur Discord
client.login(process.env.TOKEN);
