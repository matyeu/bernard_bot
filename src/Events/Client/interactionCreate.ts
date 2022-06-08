import {BernardClient} from "../../Librairie";
import {Interaction} from "discord.js";
import {EMOJIS, CREATOR_ID} from "../../config";

const Logger = require("../../Librairie/logger");

export default async function (client: BernardClient, interaction: Interaction) {

    let error = client.getEmoji(EMOJIS.error);

    if (interaction.isCommand() && interaction.inGuild()) {
        try {

            let command = client.slashCommands.get(interaction.commandName);
            if (!command) return interaction.replyErrorMessage(client, `The \`${interaction.commandName}\` command be found`, true);

            if (command.slash.maintenance && interaction.user.id !== CREATOR_ID)
                return interaction.replyErrorMessage(client, `This order is under maintenance...`, true);

            //@ts-ignore
            if (!interaction.member.permissions.has([command.slash.data.permissions]))
                return interaction.replyErrorMessage(client,  `**You don't have** the permission to use this command !`, true);

            if (!client.cooldowns.has(interaction.commandName)) client.cooldowns.set(interaction.commandName, client.cooldowns);

            const timeNow = Date.now();
            const tStamps = client.cooldowns.get(interaction.commandName);
            const cdAmount = (command.slash.data.cooldown || 10) * 1000;

            if (tStamps.has(interaction.user.id)) {
                const cdExpirationTime = tStamps.get(interaction.user.id) + cdAmount;

                if (timeNow < cdExpirationTime) {
                    let timeLeft = (cdExpirationTime - timeNow) / 1000;

                    await interaction.replyErrorMessage(client,
                        `Please wait **${timeLeft.toFixed(0)} seconds** to run this command again.`, true);
                    return Logger.warn(`The cooldown was triggered by ${interaction.user.tag} on the ${interaction.commandName} command`);
                }
            }

            tStamps.set(interaction.user.id, timeNow);
            setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);

            Logger.client(`The ${interaction.commandName} command was used by ${interaction.user.tag} on the ${interaction.guild?.name} server`);
            await command.default(client, interaction);

        } catch (e) {
            return console.error(e);
        }

    } else if (interaction.isButton()) {
        try {
            const button = client.buttons.get(interaction.customId.split(':')[0]);
            if (!button) return;
            Logger.client(`The ${interaction.customId} button was used by ${interaction.user?.tag} on the ${interaction.guild?.name} server.`);
            button.default(client, interaction)
        } catch (err) {
            return console.error(err)
        }

    } else if (interaction.isSelectMenu()) {
        try {
            const selectMenu = client.selects.get(interaction.customId);
            if (!selectMenu) return;
            Logger.client(`The ${interaction.customId} select-menu was used by ${interaction.user.tag} on the ${interaction.guild?.name} server.`);
            selectMenu.default(client, interaction)
        } catch (err) {
            return console.error(err)
        }
    } else if (interaction.isModalSubmit()) {
        try {
            const modal = client.modals.get(interaction.customId.split(':')[0]);
            Logger.client(`The ${interaction.customId} modal was used by ${interaction.user.tag} on the ${interaction.guild?.name} server.`);
            await modal.execute(client, interaction);
        } catch (err) {
            console.error(err)
        }
    }

}