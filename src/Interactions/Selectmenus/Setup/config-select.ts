import {BernardClient} from "../../../Librairie";
import {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, SelectMenuInteraction} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../../config";

export default async function (client: BernardClient, interaction: SelectMenuInteraction, language: any) {

    if (interaction.user.id !== interaction.guild!.ownerId)
        return interaction.replyErrorMessage(client, language("OWNER_ERROR").replace('%server%', interaction.guild!.name), true);

    const embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: language("AUTHOR").replace('%bot%', client.user!.username)})
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})});

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

    await interaction.update({content: null}).then(() => {
        switch (interaction.values[0]) {
            case 'global':
                embed.setDescription(language("DESCRIPTION_GLOBAL"));
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
                interaction.editReply({embeds: [embed], components: [row, buttons]});
                break;
            default:
                return interaction.replyErrorMessage(client, language("DEFAULT").replace('%subcommand%', interaction.values[0]), true)
        }
    });
};

export const select = {
    data: {
        name: "selectConfig",
        filepath: "Interactions/Selectmenus/Setup/selectConfigData",
    }
}