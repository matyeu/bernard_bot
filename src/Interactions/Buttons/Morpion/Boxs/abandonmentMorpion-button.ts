import {BernardClient} from "../../../../Librairie";
import {ButtonInteraction} from "discord.js";
import {find} from "../../../../Models/morpion";
import {EMOJIS} from "../../../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction) {

    let interactionTcheck = interaction.customId;
    let interactionUserId = interaction.user.id;

    let error = client.getEmoji(EMOJIS.error);
    if (interactionTcheck.substring(37, 19) !== interactionUserId && interactionTcheck.split('-')[1] !== interactionUserId)
        return interaction.reply({content: `${error} | You are **not part** of the game!`, ephemeral: true});

    let requestGameUser = interactionTcheck.substring(37, 19)
    let member = await interaction.guild!.members.fetch(requestGameUser)
    let memberConfig: any = await find(interaction.guild!.id, member.user.id);

    await interaction.update({content: `
**<@${memberConfig.userID_1}> vs <@${memberConfig.userID_2}>
❗️ <@${interactionUserId === memberConfig.userID_1 ? memberConfig.userID_2 : memberConfig.userID_1}> **has won the game** as ${interaction.user} **is giving up the game**.`, components: [], embeds: []});
    await memberConfig.delete();
};

export const button = {
    data: {
        name: "abandonmentMorpion",
    }
}