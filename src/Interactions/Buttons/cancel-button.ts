import {BernardClient} from "../../Librairie";
import {ButtonInteraction} from "discord.js";
import {EMOJIS} from "../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    let check = client.getEmoji(EMOJIS.check);

    if (interaction.customId.split(':')[1] !== interaction.user.id)
        return interaction.replyErrorMessage(client, language("ERROR_AUTHOR"), true);

    return interaction.update({content: language("CONTENT").replace('%emoji%', check), embeds: [], components: []});



};

export const button = {
    data: {
        name: "cancel",
        filepath: "Interactions/Buttons/cancelButtonData",
    }
}