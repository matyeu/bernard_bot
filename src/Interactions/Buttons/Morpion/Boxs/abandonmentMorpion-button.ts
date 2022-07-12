import {BernardClient} from "../../../../Librairie";
import {ButtonInteraction} from "discord.js";
import {find} from "../../../../Models/morpion";

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    let interactionTcheck = interaction.customId;
    let interactionUserId = interaction.user.id;

    if (interactionTcheck.substring(37, 19) !== interactionUserId && interactionTcheck.split('-')[1] !== interactionUserId)
        return interaction.replyErrorMessage(client, language("ERROR_GAME"), true);

    let requestGameUser = interactionTcheck.substring(37, 19)
    let member = await interaction.guild!.members.fetch(requestGameUser)
    let memberConfig: any = await find(interaction.guild!.id, member.user.id);

    await interaction.update({content: language("CONTENT_GIVING_UP").replace('%member1%', `<@${memberConfig.userID_1}>`)
            .replace('%member2%', `<@${memberConfig.userID_2}>`)
            .replace('%memberWin%', interactionUserId === memberConfig.userID_1 ? memberConfig.userID_2 : memberConfig.userID_1)
            .replace('%memberLost%', interaction.user), components: [], embeds: []})
    await memberConfig.delete();
};

export const button = {
    data: {
        name: "abandonmentMorpion",
        filepath: "Interactions/Buttons/Morpion/Boxs/boxsButtonData",
    }
}