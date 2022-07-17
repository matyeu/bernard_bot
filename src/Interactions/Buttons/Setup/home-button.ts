import {BernardClient} from "../../../Librairie";
import {ButtonInteraction, MessageActionRow, MessageEmbed, MessageSelectMenu} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    if (interaction.user.id !== interaction.guild!.ownerId)
        return interaction.replyErrorMessage(client, language("OWNER_ERROR").replace('%server%', interaction.guild!.name), true);

    const embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setTitle(language("TITLE").replace('%bot%', client.user!.username))
        .setDescription(language("DESCRIPTION").replace('%bot%', client.user!.username))
        .setTimestamp()
        .setFooter({text: FOOTER});

    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
            .setCustomId("selectConfig")
            .setPlaceholder(language("PLACEHOLDER"))
            .addOptions([
                {
                    label: language("LABEL_GLOBAL"),
                    description: language("DESCRIPTION_GLOBAL"),
                    emoji: EMOJIS.developer,
                    value: "global",
                },
            ])
    );

    return interaction.update({embeds: [embed], components: [row]});
};

export const button = {
    data: {
        name: "home",
        filepath: "Interactions/Buttons/Setup/homeButtonData",
    }
}