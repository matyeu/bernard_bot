import {BernardClient} from "../../../Librairie";
import {ButtonInteraction} from "discord.js";
import {find as findMembers, edit as editMembers} from "../../../Models/roleplay";
import {create as createWedding} from "../../../Models/wedding";
import {EMOJIS} from "../../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    if (interaction.customId.split('-')[1] !== interaction.user.id)
        return interaction.replyErrorMessage(client, language("ERROR_AUTHOR"), true);

    let requestMember = interaction.customId.substring(14, 32);
    let member = await interaction.guild!.members.fetch(requestMember);

    let memberRequestConfig: any = await findMembers(interaction.guild!.id, member.id);
    let memberConfig: any = await findMembers(interaction.guild!.id, interaction.user.id);

    memberRequestConfig.wedding.enabled = true;
    memberConfig.wedding.enabled = true;

    memberRequestConfig.wedding.partner = interaction.user.id;
    memberConfig.wedding.partner = member.id;

    await interaction.update({
        content: language("WEDDING_LOADING").replace('%emoji%', client.getEmoji(EMOJIS.luxury))
            .replace('%memberRequest%', member).replace('%member%', interaction.user),
        components: []
    }).then(async () => {

        await createWedding(interaction.guild!.id, member.id, interaction.user.id);
        await editMembers(interaction.guild!.id, member.id, memberRequestConfig);
        await editMembers(interaction.guild!.id, interaction.user.id, memberConfig);

        return interaction.channel?.send({
            content: language("WEDDING_SUCCESS").replace('%emoji%', client.getEmoji(EMOJIS.luxury))
                .replace('%memberRequest%', member).replace('%member%', interaction.user).replace('%bot%', client.user!.username)
        });
    });

};

export const button = {
    data: {
        name: "acceptWedding",
        filepath: "Interactions/Buttons/Wedding/acceptWeddingButtonData",
    }
}