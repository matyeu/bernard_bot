import {BernardClient} from "../../Librairie";
import {Interaction} from "discord.js";
import {EMOJIS, CREATOR_ID} from "../../config";
import {find as findMember} from "../../Models/roleplay";
import {find as findGuild} from "../../Models/guild";

const Logger = require("../../Librairie/logger");

export default async function (client: BernardClient, interaction: Interaction) {

    let error = client.getEmoji(EMOJIS.error);
    let guildConfig: any = await findGuild(interaction.guild!.id);

    if (interaction.isCommand() && interaction.inGuild()) {
        try {

            let command = client.slashCommands.get(interaction.commandName);
            let category = command.slash.data.category
            const languageCommand = require(`../../Librairie/languages/${guildConfig.language}/${category}/${interaction.commandName}Data`);

            if (!command) return interaction.replyErrorMessage(client, `The \`${interaction.commandName}\` command be found`, true);

            if (command.slash.data.maintenance && interaction.user.id !== CREATOR_ID)
                return interaction.replyErrorMessage(client, `This order is under maintenance...`, true);

            //@ts-ignore
            if (!interaction.member.permissions.has([command.slash.data.permissions]))
                return interaction.replyErrorMessage(client,  `**You don't have** the permission to use this command !`, true);

            let memberConfig: any = await findMember(interaction.guild!.id, interaction.user!.id);
            if (command.slash.data.roleplay && !memberConfig)
                return interaction.replyErrorMessage(client, `**No RPG profile detected: \`/start\`**`, true);

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
            await command.default(client, interaction, languageCommand);

        } catch (e) {
            return console.error(e);
        }

    } else if (interaction.isButton()) {
        try {
            const getButton = client.buttons.get(interaction.customId.split(':')[0]);
            if (!getButton) return;
            const languageButton = require(`../../Librairie/languages/${guildConfig.language}/${getButton.button.data.filepath}`);
            Logger.client(`The ${interaction.customId} button was used by ${interaction.user?.tag} on the ${interaction.guild?.name} server.`);
            getButton.default(client, interaction, languageButton)
        } catch (err) {
            return console.error(err)
        }

    } else if (interaction.isSelectMenu()) {
        try {
            const getSelectMenu = client.selects.get(interaction.customId);
            if (!getSelectMenu) return;
            const languageSelect = require(`../../Librairie/languages/${guildConfig.language}/${getSelectMenu.select.data.filepath}`);
            Logger.client(`The ${interaction.customId} select-menu was used by ${interaction.user.tag} on the ${interaction.guild?.name} server.`);
            getSelectMenu.default(client, interaction, languageSelect)
        } catch (err) {
            return console.error(err)
        }
    } else if (interaction.isModalSubmit()) {
        try {
            const getModal = client.modals.get(interaction.customId.split(':')[0]);
            const languageModal = require(`../../Librairie/languages/${guildConfig.language}/${getModal.modal.data.filepath}`);
            Logger.client(`The ${interaction.customId} modal was used by ${interaction.user.tag} on the ${interaction.guild?.name} server.`);
            await getModal.default(client, interaction, languageModal);
        } catch (err) {
            console.error(err)
        }
    }

}