import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {find, edit} from "../../Models/economy";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, langue: any) {

    let action = interaction.options.getString("actions");
    let montant = interaction.options.getNumber("montant")!;
    let money = client.getEmoji(EMOJIS.money);

    switch(action) {
        case "user":
            let userOption = interaction.options.getString("user");
            if (!userOption) return interaction.replyErrorMessage(client, langue("SPECIFY_USER"), true);

            const userToEquipment = userOption!.replace("<@!", "").replace(">", "");
            const member = interaction.guild?.members.cache.get(userToEquipment)!;

            if (!member)
                return interaction.replyErrorMessage(client, langue("MEMBER_ERROR"), true);

            let memberConfig: any = await find(member.guild.id, member.id);

            let bank = client.getEmoji(EMOJIS.bank),
                salary = client.getEmoji(EMOJIS.salary);

            let embed = new MessageEmbed()
                .setColor(EMBED_GENERAL)
                .setAuthor({name: langue("AUTHOR").replace('%user%', `${member.displayName}#${member.user.discriminator}`),
                    iconURL: member.displayAvatarURL({dynamic: true, format: "png"})})
                .addFields(
                    {name: langue("MONEY_VALUE"), value: `${money} ${memberConfig.money}`, inline: true},
                    {name: langue("BANK_VALUE"), value: `${bank} ${memberConfig.bank}`, inline: true},
                    {name: "Total", value: `${salary} ${memberConfig.money + memberConfig.bank}`, inline: true})
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: client.user?.displayAvatarURL({dynamic: true, format: "png"})});

            return interaction.reply({embeds: [embed]});
            break;
        case "add":
            let userToAddConfig: any = await find(interaction.guild!.id, interaction.user.id);
            if (!montant) return interaction.replyErrorMessage(client, langue("SPECIFY_MONTANT"), true);
            if (montant > userToAddConfig.money) return interaction.replyErrorMessage(client, langue("MONTANT_ENOUGH"), true);

            userToAddConfig.bank += montant;
            userToAddConfig.money -= montant;
            await edit(interaction.guild!.id, interaction.user.id, userToAddConfig);
            return interaction.replySuccessMessage(client, langue("MONTANT_ADDED").replace('%montant%', montant).replace('%emoji%', money), false);
            break;
        case "remove":
            let userToRemoveConfig: any = await find(interaction.guild!.id, interaction.user.id);
            if (!montant) return interaction.replyErrorMessage(client, langue("SPECIFY_MONTANT"), true);
            if (montant > userToRemoveConfig.bank) return interaction.replyErrorMessage(client, langue("MONTANT_ENOUGH"), true);

            userToRemoveConfig.bank -= montant;
            userToRemoveConfig.money += montant;
            await edit(interaction.guild!.id, interaction.user.id, userToRemoveConfig);
            return interaction.replySuccessMessage(client,
                langue("MONTANT_ADDED").replace('%montant%', montant).replace('%emoji%', money), false);
            break;
        default: return interaction.replyErrorMessage(client,
            langue("DEFAULT").replace('%subcommand%', interaction.options.getSubcommand()), true);
    }

}

export const slash = {
    data: {
        name: "balance",
        description: "Displays the balance of a user.",
        category: "Community",
        permissions: ["SEND_MESSAGES"],
        options: [
            {
                name: "actions",
                type: "STRING",
                description: "The choice of the action to be taken.",
                required: true,
                choices: [
                    {name: "user", value: "user"},
                    {name: "add", value: "add"},
                    {name: "remove", value: "remove"}
                ],
            },
            {
                name: "user",
                type: "STRING",
                description: "Mention or ID of the user",
            },
            {
                name: "montant",
                type: "NUMBER",
                description: "The amount to add or remove from the balance.",
            }
        ],
        roleplay: true,
        defaultPermission: false
    },
}