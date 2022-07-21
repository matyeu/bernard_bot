import {BernardClient} from "../../../Librairie";
import {ButtonInteraction} from "discord.js";
import {EMOJIS} from "../../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    if (interaction.customId.split('-')[1] !== interaction.user.id)
        return interaction.replyErrorMessage(client, language("ERROR_AUTHOR"), true);

    let requestMember = interaction.customId.substring(15, 33);
    let member = await interaction.guild!.members.fetch(requestMember);

    await interaction.update({
        content: language("WEDDING_LOADING").replace('%emoji%', client.getEmoji(EMOJIS.luxury))
            .replace('%memberRequest%', member).replace('%member%', interaction.user),
        components: []
    }).then(async () => {
        return interaction.channel?.send({
            content: language("WEDDING_SUCCESS").replace('%emoji%', client.getEmoji(EMOJIS.luxury))
                .replace('%memberRequest%', member).replace('%member%', interaction.user)
        });
    });
};

export const button = {
    data: {
        name: "refusedWedding",
        filepath: "Interactions/Buttons/Wedding/refusedWeddingButtonData",
    }
}