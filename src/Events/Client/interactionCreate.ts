import {BernardClient} from "../../Librairie";
import {Interaction} from "discord.js";
import {EMOJIS, CREATOR_ID} from "../../config";

const Logger = require("../../Librairie/logger");

export default async function (client: BernardClient, interaction: Interaction) {

    let error = client.getEmoji(EMOJIS.error);

    if (interaction.isCommand() && interaction.inGuild()) {
        try {

            let command = client.slashCommands.get(interaction.commandName);
            if (!command) return interaction.reply({
                content: `**${error} | La commande \`${interaction.commandName}\` est introuvable**`,
                ephemeral: true
            });

            if (command.slash.maintenance && interaction.user.id !== CREATOR_ID)
                return interaction.reply({
                    content: `** ${error} | Cette commande est en cours de maintenance...**`,
                    ephemeral: true
                });

            if (!client.cooldowns.has(interaction.commandName)) client.cooldowns.set(interaction.commandName, client.cooldowns);

            const timeNow = Date.now();
            const tStamps = client.cooldowns.get(interaction.commandName);
            const cdAmount = (command.slash.data.cooldown || 10) * 1000;

            if (tStamps.has(interaction.user.id)) {
                const cdExpirationTime = tStamps.get(interaction.user.id) + cdAmount;

                if (timeNow < cdExpirationTime) {
                    let timeLeft = (cdExpirationTime - timeNow) / 1000;

                    await interaction.reply({
                        content: `**${error} | merci de patienter ${timeLeft.toFixed(0)} seconde(s) pour réexécuter cette commande.**`,
                        ephemeral: true
                    });
                    await Logger.warn(`Le cooldown a été déclenché par ${interaction.user.tag} sur la commande ${interaction.commandName}`);
                }
            }

            tStamps.set(interaction.user.id, timeNow);
            setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);

            let ephemeral = command.slash.ephemeral ?? false
            await interaction.deferReply({ephemeral});

            Logger.client(`La commande ${interaction.commandName} a été utilisée par ${interaction.user.tag} sur le serveur ${interaction.guild?.name}`);

            await command.default(client, interaction);

        } catch (e) {
            return console.error(e);
        }

    } else if (interaction.isButton()) {
        try {
            const button = client.buttons.get(interaction.customId.split(':')[0]);
            if (!button) return;
            Logger.client(`Le bouton ${interaction.customId} a été utilisé par ${interaction.user?.tag} sur le serveur ${interaction.guild?.name} ( ${interaction.guild?.id} ).`);
            button.default(client, interaction)
        } catch (err) {
            return console.error(err)
        }

    } else if (interaction.isSelectMenu()) {
        try {
            const selectMenu = client.selects.get(interaction.customId);
            Logger.client(`Le select-menu ${interaction.customId} a été utilisé par ${interaction.user.tag} sur le serveur ${interaction.guild?.name}`);
            selectMenu.default(client, interaction)
        } catch (err) {
            return console.error(err)
        }
    } else if (interaction.isModalSubmit()) {
        try {
            const modal = client.modals.get(interaction.customId.split(':')[0]);
            await modal.execute(client, interaction);
        } catch (err) {
            console.error(err)
        }
    }

}