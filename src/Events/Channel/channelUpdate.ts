import {BernardClient} from "../../Librairie";
import {MessageEmbed, TextChannel} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_INFO, EMOJIS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, oldChannel: TextChannel, newChannel: TextChannel) {

    let guildConfig: any = await find(oldChannel.guild!.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/channelData`);
    let server = guildConfig.channels.logs.server;

    if (guildConfig.modules.logs) return;

    if (oldChannel.rawPosition !== newChannel.rawPosition) return;

    let channelEmoji = client.getEmoji(EMOJIS.channel),
        categoryEmoji = client.getEmoji(EMOJIS.category),
        channelNsfwEmoji = client.getEmoji(EMOJIS.channelNsfw);

    const embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setTitle(language("TITLE_UPDATE"))
        .addFields({name: language("NAME_ADDFIELD").replace('%emoji%', channelEmoji),
            value: `<#${oldChannel.id}> (${oldChannel.id})`, inline: true})
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: oldChannel.client.user?.displayAvatarURL({dynamic: true})});

    if (oldChannel.name !== newChannel.name) embed.addFields(
        {name: language("NAME_OLD_NAME").replace('%emoji%', channelEmoji), value: `\`${oldChannel.name}\``, inline: true},
        {name: language("NAME_NEW_NAME").replace('%emoji%', channelEmoji), value: `\`${newChannel.name}\``, inline: true})


    if (oldChannel.parentId !== newChannel.parentId) embed.addFields(
        {name: language("NAME_OLD_CATEGORY").replace('%emoji%', categoryEmoji),
            value: `${oldChannel.parentId ? `<#${oldChannel.parentId}>` : '`None`'}`, inline: true},
        {name: language("NAME_NEW_CATEGORY").replace('%emoji%', categoryEmoji),
            value: `${newChannel.parentId ? `<#${newChannel.parentId}>` : '`None`'}`, inline: true}
    )

    if (oldChannel.topic !== newChannel.topic) embed.addFields(
        {name: language("NAME_OLD_TOPIC").replace('%emoji%', channelEmoji),
            value: `${oldChannel.topic ? oldChannel.topic : '`None`'}`, inline: false},
        {name: language("NAME_NEW_TOPIC").replace('%emoji%', channelEmoji),
            value: `${newChannel.topic ? newChannel.topic : '`None`'}`, inline: false}
    )

    if (oldChannel.nsfw !== newChannel.nsfw) embed.addFields(
        {name: `${channelNsfwEmoji} Channel NSFW`, value: newChannel.nsfw ? language("ACTIVATED") : language("DEACTIVATED"), inline: true}
    )

    return client.getChannel(oldChannel.guild, server, {embeds: [embed]});

};