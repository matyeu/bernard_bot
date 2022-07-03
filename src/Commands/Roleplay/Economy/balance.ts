import {BernardClient} from "../../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {find} from "../../../Models/economy";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../../config";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let userOption = interaction.options.getString("user");
    const userToEquipment = userOption!.replace("<@!", "").replace(">", "");
    const member = interaction.guild?.members.cache.get(userToEquipment.replace(/ /g, ""))!;

    if (!member)
        return interaction.replyErrorMessage(client, "This user does **not exist** or **cannot be found**.", true);

    let memberConfig: any = await find(member.guild.id, member.id);

    let bank = client.getEmoji(EMOJIS.bank);
    let money = client.getEmoji(EMOJIS.money);
    let salary = client.getEmoji(EMOJIS.salary);

    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: `Balance of member : ${member.displayName}#${member.user.discriminator}`, iconURL: member.displayAvatarURL({dynamic: true, format: "png"})})
        .addFields(
            {name: "Liquide", value: `${money} ${memberConfig.money}`, inline: true},
            {name: "Bank", value: `${bank} ${memberConfig.bank}`, inline: true},
            {name: "Total", value: `${salary} ${memberConfig.money + memberConfig.bank}`, inline: true})
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: client.user?.displayAvatarURL({dynamic: true, format: "png"})});

    await interaction.reply({embeds: [embed]})
}

export const slash = {
    data: {
        name: "balance",
        description: "Displays the balance of a user.",
        category: "Roleplay",
        permissions: ["SEND_MESSAGES"],
        options: [
            {
                name: "user",
                type: "STRING",
                description: "Mention or ID of the user",
                required: true,
            },
        ],
        roleplay: true,
        defaultPermission: false
    },
}