import {BernardClient} from "../../Librairie";
import {CommandInteraction} from "discord.js";
import {edit, find} from "../../Models/members";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    const reasonOption = interaction.options.get("reason");
    const reason = reasonOption ? reasonOption.value : '';

    const guildID = interaction.guild!.id;
    const memberID = interaction.user.id;

    const member = await interaction.guild!.members.fetch(interaction.user)

    let memberConfig : any = await find(guildID, memberID);
    memberConfig.afk = {statut: true, reason: reason};
    await edit(guildID, memberID, memberConfig);

    if (member.guild.ownerId !== interaction.user.id)
        await member.setNickname(`[AFK] ${member.displayName}`, `${member.displayName} has just put himself in afk.`);
    await interaction.replySuccessMessage(client,
        `You have just been put in afk ${reasonOption ? `with the reason: ${reason}` : ''}.`, false);

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