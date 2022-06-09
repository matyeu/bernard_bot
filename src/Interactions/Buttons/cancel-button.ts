import {BernardClient} from "../../Librairie";
import {ButtonInteraction} from "discord.js";
import {EMOJIS} from "../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction) {

    let error = client.getEmoji(EMOJIS.error),
        check = client.getEmoji(EMOJIS.check);

    if (interaction.customId.split(':')[1] !== interaction.user.id)
        return interaction.reply({content: `${error} | You must be **the author** of this command to use this button`, ephemeral: true});

    return interaction.update({content: `${check} | Command **cancel.**`, embeds: [], components: []});



};

export const button = {
    data: {
        name: "cancel",
    }
}