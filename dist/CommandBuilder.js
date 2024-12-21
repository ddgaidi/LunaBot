"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBuilder = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
class CommandBuilder {
    constructor(client) {
        this.client = client;
        this.commands = new discord_js_1.Collection();
    }
    // Charge les commandes depuis un répertoire
    loadCommands() {
        const commandFiles = (0, fs_1.readdirSync)((0, path_1.join)(__dirname, 'commands')).filter((file) => file.endsWith('.ts'));
        for (const file of commandFiles) {
            const command = require((0, path_1.join)(__dirname, 'commands', file)).default;
            if (command.name) {
                this.commands.set(command.name, command);
            }
            else {
                console.error(`La commande ${file} n'a pas de nom.`);
            }
        }
        console.log(`${this.commands.size} commandes ont été chargées.`);
    }
    // Enregistre les commandes dans le bot
    registerCommands() {
        this.client.on('messageCreate', (message) => {
            if (message.author.bot)
                return;
            const prefix = "!"; // Prefix des commandes, à modifier selon tes préférences
            if (!message.content.startsWith(prefix))
                return;
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift()?.toLowerCase();
            if (!commandName)
                return;
            const command = this.commands.get(commandName);
            if (command) {
                try {
                    command.execute(this.client, message, args);
                }
                catch (error) {
                    console.error(`Erreur lors de l'exécution de la commande ${commandName}:`, error);
                }
            }
            else {
                message.reply("Commande introuvable.");
            }
        });
    }
}
exports.CommandBuilder = CommandBuilder;
