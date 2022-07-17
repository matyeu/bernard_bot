import {BernardClient} from "../../../Librairie";
import {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, SelectMenuInteraction} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../../config";
import {find, edit} from "../../../Models/guild";

export default async function (client: BernardClient, interaction: SelectMenuInteraction, language: any) {

    if (interaction.user.id !== interaction.guild!.ownerId)
        return interaction.replyErrorMessage(client, language("OWNER_ERROR").replace('%server%', interaction.guild!.name), true);

    let guildConfig: any = await find(interaction.guild!.id);
    let plugin = guildConfig.modules;

    await interaction.update({content: null}).then(async () => {
        switch (interaction.values[0]) {
            case 'welcome':
                plugin.welcome = !plugin.welcome;
                break;
            case 'goodbye':
                plugin.goodbye = !plugin.goodbye;
                break;
            case 'logs':
                plugin.logs = !plugin.logs;
                break;
            case 'antibot':
                plugin.antibot = !plugin.antibot;
                break;
            default:
                return interaction.replyErrorMessage(client, language("DEFAULT").replace('%subcommand%', interaction.values[0]), true)
        }

        await edit(interaction.guild!.id, guildConfig);


        let online = client.getEmoji(EMOJIS.online),
            offline = client.getEmoji(EMOJIS.offline);

        const embed = new MessageEmbed()
            .setColor(EMBED_GENERAL)
            .setAuthor({name: language("AUTHOR").replace('%bot%', client.user!.username)})
            .setDescription(language("DESCRIPTION_PLUGINS"))
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
                },
            )
            .setTimestamp()
            .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})});

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
                        description: !plugin.welcome ? language("DESCRIPTION_PLUGINS_ON")
                                .replace('%plugin%', language("ADDFIELD_GOODBYE").split(' ')[1].toLowerCase())
                            : language("DESCRIPTION_PLUGINS_OFF").replace('%plugin%', language("ADDFIELD_GOODBYE").split(' ')[1].toLowerCase()),
                        emoji: plugin.goodbye ? online : offline,
                        value: "goodbye",
                    },
                    {
                        label: language("ADDFIELD_LOGS").split(' ')[1],
                        description: !plugin.welcome ? language("DESCRIPTION_PLUGINS_ON")
                                .replace('%plugin%', language("ADDFIELD_LOGS").split(' ')[1].toLowerCase())
                            : language("DESCRIPTION_PLUGINS_OFF").replace('%plugin%', language("ADDFIELD_LOGS").split(' ')[1].toLowerCase()),
                        emoji: plugin.logs ? online : offline,
                        value: "logs",
                    },
                    {
                        label: language("ADDFIELD_ANTIBOT").split(' ')[1],
                        description: !plugin.welcome ? language("DESCRIPTION_PLUGINS_ON")
                                .replace('%plugin%', language("ADDFIELD_ANTIBOT").split(' ')[1].toLowerCase())
                            : language("DESCRIPTION_PLUGINS_OFF").replace('%plugin%', language("ADDFIELD_ANTIBOT").split(' ')[1].toLowerCase()),
                        emoji: plugin.antibot ? online : offline,
                        value: "antibot",
                    },
                ]));

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

        await interaction.editReply({embeds: [embed], components: [rowPlugins, buttons]});
        return interaction.followUp({content: language("SUCCESS").replace('%emoji%', client.getEmoji(EMOJIS.check))
                .replace('%plugin%', language(`ADDFIELD_${interaction.values[0].toUpperCase()}`).split(' ')[1].toLowerCase())
                .replace('%status%', plugin[interaction.values[0]] ? language("ENABLED").toLowerCase() : language("DISABLED").toLowerCase())});
    })

};

export const select = {
    data: {
        name: "selectPlugins",
        filepath: "Interactions/Selectmenus/Setup/selectPluginsData",
    }
}