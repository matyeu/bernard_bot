import {BernardClient} from "../../Librairie";
import {MessageEmbed, TextChannel} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_INFO, EMOJIS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, oldChannel: TextChannel, newChannel: TextChannel) {

    let guildConfig: any = await find(oldChannel.guild!.id);
    let server = guildConfig.channels.logs.server;

    if (oldChannel.rawPosition !== newChannel.rawPosition) return;

    let channelEmoji = client.getEmoji(EMOJIS.channel),
        categoryEmoji = client.getEmoji(EMOJIS.category),
        channelNsfwEmoji = client.getEmoji(EMOJIS.channelNsfw);

    const embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setTitle('Mise à jour Salon')
        .addFields({name: `${channelEmoji} Name (ID)`, value: `<#${oldChannel.id}> (${oldChannel.id})`, inline: true})
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: oldChannel.client.user?.displayAvatarURL({dynamic: true})});

    if (oldChannel.name !== newChannel.name) embed.addFields(
        {name: `${channelEmoji} Old Name`, value: `\`${oldChannel.name}\``, inline: true},
        {name: `${channelEmoji} Old Name`, value: `\`${newChannel.name}\``, inline: true})


    if (oldChannel.parentId !== newChannel.parentId) embed.addFields(
        {name: `${categoryEmoji} Old category`, value: `${oldChannel.parentId ? `<#${oldChannel.parentId}>` : '`None category`'}`, inline: true},
        {name: `${categoryEmoji} New category`, value: `${newChannel.parentId ? `<#${newChannel.parentId}>` : '`None category`'}`, inline: true}
    )

    if (oldChannel.topic !== newChannel.topic) embed.addFields(
        {name: `${channelEmoji} Old topic`, value: `${oldChannel.topic ? oldChannel.topic : '`None topic`'}`, inline: false},
        {name: `${channelEmoji} New topic`, value: `${newChannel.topic ? newChannel.topic : '`None topic`'}`, inline: false}
    )

    if (oldChannel.nsfw !== newChannel.nsfw) embed.addFields(
        {name: `${channelNsfwEmoji} Channel NSFW`, value: newChannel.nsfw ? '`Activated`' : '`Deactivated`', inline: true}
    )

    return client.getChannel(oldChannel.guild, server, {embeds: [embed]});

};