import {BernardClient} from "../../../Librairie";
import {ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    if (interaction.user.id !== interaction.guild!.ownerId)
        return interaction.replyErrorMessage(client, language("OWNER_ERROR").replace('%server%', interaction.guild!.name), true);

    const embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: language("AUTHOR").replace('%bot%', client.user!.username)})
        .setDescription(language("DESCRIPTION_GLOBAL"))
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})});
    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
            .setCustomId("selectGlobal")
            .setPlaceholder(language("PLACEHOLDER"))
            .addOptions([
                {
                    label: language("LABEL_LANGUE"),
                    description: language("DESCRIPTION_LANGUE"),
                    emoji: "🏳",
                    value: "language",
                },
                {
                    label: language("LABEL_PLUGINS"),
                    description: language("DESCRIPTION_PLUGINS"),
                    emoji: EMOJIS.verification,
                    value: "plugins",
                },
            ])
    );
    let buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`home`)
                .setEmoji(EMOJIS.xp)
                .setLabel(language("LABEL_HOME"))
                .setStyle("PRIMARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`cancel:${interaction.user.id}`)
                .setLabel("Cancel")
                .setStyle("SECONDARY")
        );

    return interaction.update({embeds: [embed], components: [row, buttons]});

};

export const button = {
    data: {
        name: "global",
        filepath: "Interactions/Buttons/Setup/globalButtonData",
    }
}