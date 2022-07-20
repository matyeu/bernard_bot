import {BernardClient} from "../../Librairie";
import {CommandInteraction} from "discord.js";
import {edit, find} from "../../Models/members";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    const reasonOption = interaction.options.get("reason");
    const reason = reasonOption ? reasonOption.value : '';

    const guildID = interaction.guild!.id;
    const memberID = interaction.user.id;

    const member = await interaction.guild!.members.fetch(interaction.user)

    let memberConfig: any = await find(guildID, memberID);
    memberConfig.afk = {statut: true, reason: reason};
    await edit(guildID, memberID, memberConfig);

    try {
        await member.setNickname(`[AFK] ${member.displayName}`, language("LOG_MESSAGE").replace('%user%', member.displayName));
        return interaction.replySuccessMessage(client,
            reason ? language("REASON_MESSAGE_WITH_REASON").replace('%reason%', reason) : language("REASON_MESSAGE"), false);
    } catch (err: any) {
        if (err.message.match("Missing Permissions")) return interaction.replySuccessMessage(client,
            reason ? language("REASON_MESSAGE_WITH_REASON").replace('%reason%', reason) : language("REASON_MESSAGE"), false);
        return console.log(err);
    }

}

export const slash = {
    data: {
        name: "afk",
        description: "Put yourself in afk mode.",
        category: "Community",
        permissions: ["SEND_MESSAGES"],
        options: [{
            name: "reason",
            type: "STRING",
            description: "Spécifie la raison de ton afk",
            required: false,
        }],
        defaultPermission: false,
    }
}