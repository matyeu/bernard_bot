import {BernardClient} from "../../Librairie";
import {CommandInteraction} from "discord.js";
import {find, edit} from "../../Models/economy";
import {EMOJIS} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let userOption = interaction.options.getString("user");
    const user = userOption!.replace("<@!", "").replace(">", "");
    const member = await interaction.guild?.members.cache.get(user.replace(/ /g, ""));

    if (!member) return interaction.replyErrorMessage(client, language("MEMBER_ERROR"), true);

    let casinoConfig: any = await find(member.guild.id, member.id);

    if (interaction.user.id === member.id)
        return interaction.replyErrorMessage(client, language("ERROR_YOURSELF"), true);

    let amount = interaction.options.getNumber("amount")!;
    switch(interaction.options.getSubcommand()) {
        case 'add':
            casinoConfig.money += amount;
            await edit(member.guild.id, member.id, casinoConfig);
            return interaction.replySuccessMessage(client, language("ADD").replace('%user%', member.user.tag)
                .replace('%amount%', amount).replace('%emoji%', client.getEmoji(EMOJIS.money)), true);
            break;
        case 'remove':
            casinoConfig.money -= amount;
            await edit(member.guild.id, member.id, casinoConfig);
            return interaction.replySuccessMessage(client, language("REMOVE").replace('%user%', member.user.tag)
                .replace('%amount%', amount).replace('%emoji%', client.getEmoji(EMOJIS.money)), true);
            break;
        default:
            return interaction.replyErrorMessage(client,language("DEFAULT").replace('%subcommand%', interaction.options.getSubcommand()), true);
    }

};

export const slash = {
    data: {
        name: "coins",
        description: "Add or remove money from account.",
        category: "Administration",
        cooldown: 5,
        permissions: ["ADMINISTRATOR"],
        options: [
            {
                name: "add",
                description: "Add money to account.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "user",
                        description: "Mention or ID of the user.",
                        type: "STRING",
                        required: true,
                    },
                    {
                        name: "amount",
                        description: "Amount of money to add.",
                        type: "NUMBER",
                        required: true
                    }
                ],
            },
            {
                name: "remove",
                description: "Remove money to account.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "user",
                        description: "Mention or ID of the user.",
                        type: "STRING",
                        required: true,
                    },
                    {
                        name: "amount",
                        description: "Amount of money to remove.",
                        type: "NUMBER",
                        required: true
                    }
                ],
            }
        ],
        defaultPermission: false,
    }
}