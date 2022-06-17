import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {find, edit} from "../../Models/economy";
import {EMBED_ERROR, EMBED_SUCCESS, FOOTER} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let userOption = interaction.options.getString("user");
    const user = userOption!.replace("<@!", "").replace(">", "");
    const member = await interaction.guild?.members.cache.get(user.replace(/ /g, ""));

    if (!member) return interaction.replyErrorMessage(client, "This user does **not exist** or **cannot be found**.", true);

    let casinoConfig: any = await find(member.guild.id, member.id);

    if (interaction.user.id === member.id)
        return interaction.replyErrorMessage(client, "**You can't** mention yourself for this command", true);

    let amount = interaction.options.getNumber("amount")!;
    switch(interaction.options.getSubcommand()) {
        case 'add':
            casinoConfig.money += amount;
            await edit(member.guild.id, member.id, casinoConfig);
            return interaction.replySuccessMessage(client, `**${member.user.tag}** has been given **${amount}**`, true);
            break;
        case 'remove':
            casinoConfig.money -= amount;
            await edit(member.guild.id, member.id, casinoConfig);
            return interaction.replySuccessMessage(client, `**${member.user.tag}** has been taken **${amount}**`, true);
            break;
        default:
            return interaction.replyErrorMessage(client,`The subcommand ${interaction.options.getSubcommand()} is **not valid**.`, true);
    }

};

export const slash = {
    data: {
        name: "balance",
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