import { SlashCommandBuilder, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import dotenv from 'dotenv';

dotenv.config();

// Crée un client REST
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

// Crée les données des commandes à enregistrer
const commands = [
  new SlashCommandBuilder()
    .setName('say')
    .setDescription('Fait parler le bot avec un message simple.')
    .addStringOption(option => 
        option.setName('texte')
          .setDescription('Le contenu du message à envoyer.')
          .setRequired(true)
    ),
  
  new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulser un utilisateur du serveur.')
    .addUserOption(option => 
        option.setName('utilisateur')
          .setDescription('L\'utilisateur à expulser')
          .setRequired(true)
    )
    .addStringOption(option => 
        option.setName('raison')
          .setDescription('Raison de l\'expulsion')
          .setRequired(false)
    ),
  
  new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Rendre un utilisateur muet temporairement.')
    .addUserOption(option => 
        option.setName('utilisateur')
          .setDescription('L\'utilisateur à rendre muet')
          .setRequired(true)
    )
    .addIntegerOption(option => 
        option.setName('durée')
          .setDescription('Durée en minutes (laisser vide pour un mute permanent)')
          .setRequired(false)
    ),
  
  new SlashCommandBuilder()
    .setName('saye')
    .setDescription('Créer un message embed.')
    .addStringOption(option => 
        option.setName('texte')
          .setDescription('Le contenu principal de l\'embed')
          .setRequired(true)
    )
    .addStringOption(option => 
        option.setName('titre')
          .setDescription('Le titre de l\'embed (optionnel)')
          .setRequired(false)
    ),

  // Commande /cash
  new SlashCommandBuilder()
    .setName('cash')
    .setDescription('Affiche le message du concours Cashprize sur Wizorah.'),

  // Nouvelle commande /spoil
  new SlashCommandBuilder()
    .setName('spoil')
    .setDescription('Affiche un aperçu du Lobby Enchanté de Wizorah.')
]
  .map(command => command.toJSON());

// Enregistre les commandes sur Discord
async function deployCommands() {
  try {
    console.log('Démarrage de l\'enregistrement des commandes slash...');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: commands,
    });

    console.log('Commandes enregistrées avec succès!');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des commandes:', error);
  }
}

deployCommands();