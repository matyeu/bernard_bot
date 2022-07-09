import {BernardClient} from "../../Librairie";
import {CommandInteraction} from "discord.js";
import {edit, find} from "../../Models/members";

export default async function (client: BernardClient, interaction: CommandInteraction, langue: any) {

    const reasonOption = interaction.options.get("reason");
    const reason = reasonOption ? reasonOption.value : '';

    const guildID = interaction.guild!.id;
    const memberID = interaction.user.id;

    const member = await interaction.guild!.members.fetch(interaction.user)

    let memberConfig : any = await find(guildID, memberID);
    memberConfig.afk = {statut: true, reason: reason};
    await edit(guildID, memberID, memberConfig);

    if (member.guild.ownerId !== interaction.user.id)
        await member.setNickname(`[AFK] ${member.displayName}`, langue("LOG_MESSAGE").replace('%user%', member.displayName));
    await interaction.replySuccessMessage(client,
        reason ? langue("REASON_MESSAGE_WITH_REASON").replace('%reason%', reason) : langue("REASON_MESSAGE"), false);

}

export const slash = {
    data: {
        name: "afk",
        description: "Put yourself in afk mode.",
        category: "Community",
        options: [{
            name: "reason",
            type: "STRING",
            description: "Spécifie la raison de ton afk",
            required: false,
        }],
        defaultPermission: false,
    }
}