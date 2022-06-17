import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {find} from "../../Models/economy";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let userOption = interaction.options.getString("user");
    const argUser = userOption!.replace("<@!", "").replace(">", "");
    const member = await interaction.guild!.members.fetch(argUser.replace(/ /g, ""))

    if (!member) return interaction.replyErrorMessage(client, "The user is **not in the server**.", true);

    let economyConfig: any = await find(interaction.guild!.id, interaction.user!.id);

    let bank = client.getEmoji(EMOJIS.bank);
    let money = client.getEmoji(EMOJIS.money);
    let salary = client.getEmoji(EMOJIS.salary);

    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: `Balance of the member: ${member.displayName}`, iconURL: member.displayAvatarURL({dynamic: true})})
        .addFields(
            {name: "Money", value: `${money} ${economyConfig.money}`, inline: true},
            {name: "Bank", value: `${bank} ${economyConfig.bank}`, inline: true},
            {name: "Total", value: `${salary} ${economyConfig.money + economyConfig.bank}`, inline: true})
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: client.user?.displayAvatarURL({dynamic: true})});

    return interaction.reply({embeds: [embed]})
}

export const slash = {
    data: {
        name: "balance",
        description: "Show the balance of the user.",
        category: "Community",
        options: [{
            name: "user",
            type: "STRING",
            description: "Mention or ID of the user.",
            required: true
        },],
        defaultPermission: false
    },
}