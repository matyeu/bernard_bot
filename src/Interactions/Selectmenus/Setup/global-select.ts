import {BernardClient} from "../../../Librairie";
import {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    MessageSelectMenu,
    SelectMenuInteraction,
} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../../config";
import {find} from "../../../Models/guild";

export default async function (client: BernardClient, interaction: SelectMenuInteraction, language: any) {

    if (interaction.user.id !== interaction.guild!.ownerId)
        return interaction.replyErrorMessage(client, language("OWNER_ERROR").replace('%server%', interaction.guild!.name), true);

    let guildConfig: any = await find(interaction.guild!.id);

    const embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: language("AUTHOR").replace('%bot%', client.user!.username)})
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})});

    let buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`global`)
                .setEmoji(EMOJIS.xp)
                .setLabel(language("LABEL_GLOBAL"))
                .setStyle("PRIMARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`cancel:${interaction.user.id}`)
                .setLabel("Cancel")
                .setStyle("SECONDARY")
        );

    await interaction.update({content: null}).then(() => {
        switch (interaction.values[0]) {
            case 'language':
                embed.setDescription(language("LANGUAGE_CURRENT"));
                let buttonsLangue = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId(`french`)
                            .setEmoji("🇫🇷")
                            .setLabel(language("FRENCH"))
                            .setDisabled(guildConfig.language === "fr-FR" ?? true)
                            .setStyle("PRIMARY"))
                    .addComponents(
                        new MessageButton()
                            .setCustomId(`english`)
                            .setEmoji("🇺🇸")
                            .setLabel(language("ENGLISH"))
                            .setDisabled(guildConfig.language === "en-US" ?? true)
                            .setStyle("PRIMARY"))
                    .addComponents(
                        new MessageButton()
                            .setCustomId(`global`)
                            .setEmoji(EMOJIS.xp)
                            .setStyle("SECONDARY"))

                interaction.editReply({embeds: [embed], components: [buttonsLangue]});
                break;
            case 'plugins':
                let plugin = guildConfig.modules;
                let online = client.getEmoji(EMOJIS.online),
                    offline = client.getEmoji(EMOJIS.offline);

                embed.setDescription(language("DESCRIPTION_PLUGINS"))
                    .addFields(
                        {
                            name: language("ADDFIELD_WELCOME").replace('%emoji%', plugin.welcome ? online : offline),
                            value: plugin.welcome ? language("ENABLED") : language("DISABLED"),
                            inline: true
                        },
                        {
                            name: language("ADDFIELD_GOODBYE").replace('%emoji%', plugin.goodbye ? online : offline),
                            value: plugin.goodbye ? language("ENABLED") : language("DISABLED"),
                            inline: true
                        },
                        {
                            name: language("ADDFIELD_LOGS").replace('%emoji%', plugin.logs ? online : offline),
                            value: plugin.logs ? language("ENABLED") : language("DISABLED"),
                            inline: true
                        },
                        {
                            name: language("ADDFIELD_ANTIBOT").replace('%emoji%', plugin.antibot ? online : offline),
                            value: plugin.antibot ? language("ENABLED") : language("DISABLED"),
                            inline: true
                        }
                    )
                const rowPlugins = new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId("selectPlugins")
                        .setPlaceholder(language("PLACEHOLDER"))
                        .addOptions([
                            {
                                label: language("ADDFIELD_WELCOME").split(' ')[1],
                                description: !plugin.welcome ? language("DESCRIPTION_PLUGINS_ON")
                                        .replace('%plugin%', language("ADDFIELD_WELCOME").split(' ')[1].toLowerCase())
                                    : language("DESCRIPTION_PLUGINS_OFF").replace('%plugin%', language("ADDFIELD_WELCOME").split(' ')[1].toLowerCase()),
                                emoji: plugin.welcome ? online : offline,
                                value: "welcome",
                            },
                            {
                                label: language("ADDFIELD_GOODBYE").split(' ')[1],
                                description: !plugin.goodbye ? language("DESCRIPTION_PLUGINS_ON")
                                        .replace('%plugin%', language("ADDFIELD_GOODBYE").split(' ')[1].toLowerCase())
                                    : language("DESCRIPTION_PLUGINS_OFF").replace('%plugin%', language("ADDFIELD_GOODBYE").split(' ')[1].toLowerCase()),
                                emoji: plugin.goodbye ? online : offline,
                                value: "goodbye",
                            },
                            {
                                label: language("ADDFIELD_LOGS").split(' ')[1],
                                description: !plugin.logs ? language("DESCRIPTION_PLUGINS_ON")
                                        .replace('%plugin%', language("ADDFIELD_LOGS").split(' ')[1].toLowerCase())
                                    : language("DESCRIPTION_PLUGINS_OFF").replace('%plugin%', language("ADDFIELD_LOGS").split(' ')[1].toLowerCase()),
                                emoji: plugin.logs ? online : offline,
                                value: "logs",
                            },
                            {
                                label: language("ADDFIELD_ANTIBOT").split(' ')[1],
                                description: !plugin.antibot ? language("DESCRIPTION_PLUGINS_ON")
                                        .replace('%plugin%', language("ADDFIELD_ANTIBOT").split(' ')[1].toLowerCase())
                                    : language("DESCRIPTION_PLUGINS_OFF").replace('%plugin%', language("ADDFIELD_ANTIBOT").split(' ')[1].toLowerCase()),
                                emoji: plugin.antibot ? online : offline,
                                value: "antibot",
                            },
                        ])
                );
                interaction.editReply({embeds: [embed], components: [rowPlugins, buttons]});
                break;
            default:
                return interaction.replyErrorMessage(client, language("DEFAULT").replace('%subcommand%', interaction.values[0]), true)
        }
    });
};

export const select = {
    data: {
        name: "selectGlobal",
        filepath: "Interactions/Selectmenus/Setup/selectGlobalData",
    }
}