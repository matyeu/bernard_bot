import {BernardClient} from "../../../../Librairie";
import {ButtonInteraction, MessageEmbed} from "discord.js";
import {find} from "../../../../Models/morpion";
import {EMBED_SUCCESS} from "../../../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    let interactionTcheck = interaction.customId;
    let interactionUserId = interaction.user.id;

    if (interactionTcheck.substring(30, 12) !== interactionUserId && interactionTcheck.split('-')[1] !== interactionUserId)
        return interaction.replyErrorMessage(client, language("ERROR_GAME"), true);

    let requestGameUser = interactionTcheck.substring(30, 12)
    let member = await interaction.guild!.members.fetch(requestGameUser)
    let morpionConfig: any = await find(interaction.guild!.id, member.user.id);

    if (morpionConfig.userID_1 !== interactionUserId)
        return interaction.replyErrorMessage(client, language("ERROR_LEAVE"), true);

    await morpionConfig.delete();

    let embed = new MessageEmbed()
        .setColor(EMBED_SUCCESS)
        .setDescription(language("GAME_CANCEL").replace('%member%', interaction.user))
    await interaction.update({embeds: [embed], components: []});
};

export const button = {
    data: {
        name: "exitMorpion",
        filepath: "Interactions/Buttons/Morpion/Boxs/boxsButtonData",
    }
}