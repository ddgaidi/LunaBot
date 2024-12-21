"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName('cash')
    .setDescription('Affiche le message du concours Cashprize sur Wizorah.');
async function execute(interaction) {
    const message = `
    # :tada: Concours Cashprize sur Wizorah ! :tada:

    :bell:** Wizorah** lance un grand concours avec des cashprizes à la clé pour récompenser les meilleurs joueurs de notre communauté ! Voici les récompenses à ne pas manquer :

    - 20€ pour le premier @Wizorien à atteindre 200 invitations (Cumulable | Par exemple : 400 invitations -> 40€...) ! :dart:
    - 20€ pour le top 1 Factions : Réalise des performances exceptionnelles en Factions et décroche ta place de champion ! :trophy:
    - 10€ pour le top 2 Factions : L'effort paye, même en seconde place ! :second_place:
    - 20€ pour le top 1 kills : Deviens le plus grand tueur de Wizorah et empoche une récompense pour ta domination en PvP ! :crossed_swords:

    ## :joystick: Comment participer ?
    Invite tes amis pour accumuler des invitations.
    Affronte les autres joueurs en Factions et en PvP pour grimper dans les classements.
    Les récompenses sont prêtes, et la compétition est lancée ! Les premiers à se lancer auront une chance de remporter ces magnifiques prix. Bonne chance à tous les participants ! :four_leaf_clover:
    `;
    // Envoie le message dans le canal où la commande a été exécutée
    await interaction.reply({ content: message });
}
