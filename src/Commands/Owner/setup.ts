import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageActionRow, MessageEmbed, MessageSelectMenu} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../config";
import {find, edit} from "../../Models/guild";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    if (interaction.user.id !== interaction.guild!.ownerId)
        return interaction.replyErrorMessage(client, language("OWNER_ERROR").replace('%server%', interaction.guild!.name), true);

    let guildConfig: any = await find(interaction.guild!.id);
    let channel = interaction.options.getString("channels");

    if (channel) {
        let channelNext = interaction.options.getChannel("name");
        if (!channelNext) return interaction.replyErrorMessage(client, language("CHANNEL_ERROR"), true);
        if (channelNext.type !== "GUILD_TEXT") return interaction.replyErrorMessage(client, language("CATEGORY_ERROR"), true);

        switch(channel) {
            case 'welcome':
                guildConfig.channels.arrival = channelNext.id;
                break;
            case 'goodbye':
                guildConfig.channels.departure = channelNext.id;
                break;
            case 'logs_server':
                guildConfig.channels.logs.server = channelNext.id;
                break;
            case 'logs_sanction':
                guildConfig.channels.logs.sanction = channelNext.id;
                break;
            case 'logs_members':
                guildConfig.channels.logs.members = channelNext.id;
                break;
            default: return interaction.replyErrorMessage(client, language("DEFAULT"), true);
        }
        await edit(interaction.guild!.id, guildConfig);
        return interaction.replySuccessMessage(client, language("SUCCESS").replace('%module%', channel)
            .replace('%channel%', `<#${channelNext.id}>`), true);

    } else {
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

        return interaction.reply({embeds: [embed], components: [row]});
    }

}

export const slash = {
    data: {
        name: "setup",
        description: "Config the bot.",
        category: "Owner",
        cooldown: 5,
        permissions: ["ADMINISTRATOR"],
        options: [
            {
                name: "channels",
                description: "Config the channels a module.",
                type: "STRING",
                choices: [
                    {name: "Welcome", value: "welcome"},
                    {name: "Goodbye", value: "goodbye"},
                    {name: "Logs Server", value: "logs_server"},
                    {name: "Logs Sanction", value: "logs_sanction"},
                    {name: "Logs Members", value: "logs_members"},]
            },
            {
                name: "name",
                description: "Channel name.",
                type: "CHANNEL",
            }
        ],
        defaultPermission: false
    }
}