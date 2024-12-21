import { ChatInputCommandInteraction, SlashCommandBuilder, AttachmentBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("spoil")
    .setDescription("Affiche un aperçu du Lobby Enchanté de Wizorah.");

export async function execute(interaction: ChatInputCommandInteraction) {
    const message = `
    # :sparkles: **Bienvenue dans le Lobby Enchanté de Wizorah !** :sparkles:

    :wave: Salut, aventurier ! Moi, c’est **Luna**, la gardienne de ce royaume magique. Voici un aperçu du **Lobby** : un endroit majestueux où ton aventure commence toujours en te connectant au serveur **Wizorah**.

    :earth_africa: **Le Lobby**, c’est bien plus qu’un simple point d’arrivée ! Voici ce qui t’attend :
    - :map: Un lieu magique où chaque joueur débarque pour choisir son aventure.

    :crossed_swords: **Deux modes de jeu épiques t’attendent :**
    **KitMap** : Déchaîne-toi dans des combats rapides et fais ressortir le guerrier qui est en toi.
    **PvP Faction** : Forme ta faction, conquiers des territoires et impose ta domination !

    :european_castle: Que tu sois un stratège ou un guerrier, ton aventure commence ici. Choisis ton destin et prépare-toi à écrire l’histoire de **Wizorah**.

    :star2: **Reste connecté, car ce n’est que le début !** :star2:

    L’aventure n’attend plus que toi ! :herb:
    `;

    // Créer une pièce jointe pour l'image
    const imageAttachment = new AttachmentBuilder(
        'https://cdn.discordapp.com/attachments/1111977017898967041/1318320726469775420/2024-12-15_16.25.16.png?ex=6761e55a&is=676093da&hm=1ab6de0e463ca5d6dd240156748b89d717345610daff91d06f1654b41d345ffb', 
        { name: 'lobby_preview.png' } // Nom du fichier lors de l'envoi
    );

    try {
        // Envoie le message dans le salon où la commande a été exécutée, avec l'image en pièce jointe
        await interaction.reply({ 
            content: message, 
            files: [imageAttachment], 
            ephemeral: false 
        });
    } catch (error) {
        console.error("Erreur lors de l'envoi du message spoil :", error);
        await interaction.reply({
            content: "Une erreur est survenue en essayant d'envoyer le message.",
            ephemeral: true,
        });
    }
}