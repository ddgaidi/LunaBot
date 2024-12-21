// Importations nécessaires
import { Client, GatewayIntentBits, ChatInputCommandInteraction } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

// Initialisation du client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, // Requis pour gérer les événements d'ajout de membres
    ],
});

// Événement déclenché lorsque le bot est prêt
client.once('ready', () => {
    console.log(`Lunabot est en ligne en tant que ${client.user?.tag}!`);
});

// Chargement dynamique des événements
import('./events/guildMemberAdd').then((event) => {
    event.default(client); // Appel de l'export par défaut
});

// Gestion des interactions utilisateur
client.on('interactionCreate', async (interaction) => {
    // Vérifie si l'interaction est bien une commande
    if (!interaction.isCommand()) return;

    // Force TypeScript à comprendre que l'interaction est une ChatInputCommandInteraction
    const commandInteraction = interaction as ChatInputCommandInteraction;

    const { commandName } = commandInteraction;

    try {
        switch (commandName) {
            case 'mute': {
                const { execute } = await import('./commands/mute');
                await execute(commandInteraction);
                break;
            }
            case 'kick': {
                const { execute } = await import('./commands/kick');
                await execute(commandInteraction);
                break;
            }
            case 'saye': {
                const { execute } = await import('./commands/saye');
                await execute(commandInteraction);
                break;
            }
            case 'say': {
                const { execute } = await import('./commands/say');
                await execute(commandInteraction);
                break;
            }
            case 'cash': {
                const { execute } = await import('./commands/cash');
                await execute(commandInteraction);
                break;
            }
            case 'spoil': {
                const { execute } = await import('./commands/spoil');
                await execute(commandInteraction);
                break;
            }
            default:
                console.warn(`Commande inconnue : ${commandName}`);
        }
    } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande ${commandName}:`, error);
    }
});

// Connexion du client au serveur Discord
client.login(process.env.TOKEN);