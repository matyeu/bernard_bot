import {BernardClient} from "../../../../Librairie";
import {ButtonInteraction, MessageEmbed} from "discord.js";
import {find} from "../../../../Models/morpion";
import {EMBED_SUCCESS, EMOJIS} from "../../../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction) {

    let interactionTcheck = interaction.customId;
    let interactionUserId = interaction.user.id;

    let error = client.getEmoji(EMOJIS.error),
        check = client.getEmoji(EMOJIS.check);

    if (interactionTcheck.substring(30, 12) !== interactionUserId && interactionTcheck.split('-')[1] !== interactionUserId)
        return interaction.reply({content: `${error} | You are **not part** of the game!`, ephemeral: true});


    let requestGameUser = interactionTcheck.substring(30, 12)
    let member = await interaction.guild!.members.fetch(requestGameUser)
    let morpionConfig: any = await find(interaction.guild!.id, member.user.id);

    if (morpionConfig.userID_1 !== interactionUserId)
        return interaction.reply({content: `${error} | **You can** only leave **your own games**!`, ephemeral: true});

    await morpionConfig.delete();

    let embed = new MessageEmbed()
        .setColor(EMBED_SUCCESS)
        .setDescription(`${check} | ${interaction.user} your game has been **cancelled**!`)
    await interaction.update({embeds: [embed], components: []});
};

export const button = {
    data: {
        name: "exitMorpion",
    }
}