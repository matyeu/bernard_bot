import {BernardClient} from "../../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {find, edit} from "../../../Models/economy";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../../config";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let action = interaction.options.getString("actions");
    let montant = interaction.options.getNumber("montant")!;
    let money = client.getEmoji(EMOJIS.money);

    switch(action) {
        case "user":
            let userOption = interaction.options.getString("user");
            if (!userOption) return interaction.replyErrorMessage(client, "You must **specify a user**.", true);

            const userToEquipment = userOption!.replace("<@!", "").replace(">", "");
            const member = interaction.guild?.members.cache.get(userToEquipment)!;

            if (!member)
                return interaction.replyErrorMessage(client, "This user does **not exist** or **cannot be found**.", true);

            let memberConfig: any = await find(member.guild.id, member.id);

            let bank = client.getEmoji(EMOJIS.bank),
                salary = client.getEmoji(EMOJIS.salary);

            let embed = new MessageEmbed()
                .setColor(EMBED_GENERAL)
                .setAuthor({name: `Balance of member : ${member.displayName}#${member.user.discriminator}`, iconURL: member.displayAvatarURL({dynamic: true, format: "png"})})
                .addFields(
                    {name: "Liquide", value: `${money} ${memberConfig.money}`, inline: true},
                    {name: "Bank", value: `${bank} ${memberConfig.bank}`, inline: true},
                    {name: "Total", value: `${salary} ${memberConfig.money + memberConfig.bank}`, inline: true})
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: client.user?.displayAvatarURL({dynamic: true, format: "png"})});

            return interaction.reply({embeds: [embed]});
            break;
        case "add":
            let userToAddConfig: any = await find(interaction.guild!.id, interaction.user.id);
            if (!montant) return interaction.replyErrorMessage(client, "You must **specify a montant**.", true);
            if (montant > userToAddConfig.money) return interaction.replyErrorMessage(client, "You don't have enough money to add this amount.", true);

            userToAddConfig.bank += montant;
            userToAddConfig.money -= montant;
            await edit(interaction.guild!.id, interaction.user.id, userToAddConfig);
            return interaction.replySuccessMessage(client, `You have **added ${montant} ${money}** to your bank.`, false);
            break;
        case "remove":
            let userToRemoveConfig: any = await find(interaction.guild!.id, interaction.user.id);
            if (!montant) return interaction.replyErrorMessage(client, "You must **specify a montant**.", true);
            if (montant > userToRemoveConfig.bank) return interaction.replyErrorMessage(client, "You don't have enough money in your bank to remove this amount.", true);

            userToRemoveConfig.bank -= montant;
            userToRemoveConfig.money += montant;
            await edit(interaction.guild!.id, interaction.user.id, userToRemoveConfig);
            return interaction.replySuccessMessage(client, `You have **removed ${montant} ${money}** from your bank.`, false);
            break;
        default: return interaction.replyErrorMessage(client, "The indicated action does **not exist** or **cannot be found**!", true);
    }

}

export const slash = {
    data: {
        name: "balance",
        description: "Displays the balance of a user.",
        category: "Roleplay",
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