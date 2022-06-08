import {BernardClient} from "../../Librairie";
import {MessageEmbed, TextChannel} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_INFO, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, oldChannel: TextChannel, newChannel: TextChannel) {

    let guildConfig: any = await find(oldChannel.guild!.id);
    let server = guildConfig.channels.logs.server;

    if (oldChannel.rawPosition !== newChannel.rawPosition) return;

    const embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setTitle('Mise à jour Salon')
        .addFields({name: `🎙 Name (ID)`, value: `<#${oldChannel.id}> (${oldChannel.id})`, inline: true})
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: oldChannel.client.user?.displayAvatarURL({dynamic: true})});

    if (oldChannel.name !== newChannel.name) embed.addFields(
        {name: `🎙 Old Name`, value: `\`${oldChannel.name}\``, inline: true},
        {name: `🎙 Old Name`, value: `\`${newChannel.name}\``, inline: true})


    if (oldChannel.parentId !== newChannel.parentId) embed.addFields(
        {name: `🎙 Old category`, value: `${oldChannel.parentId ? `<#${oldChannel.parentId}>` : '`None category`'}`, inline: true},
        {name: `🎙 New category`, value: `${newChannel.parentId ? `<#${newChannel.parentId}>` : '`None category`'}`, inline: true}
    )

    if (oldChannel.topic !== newChannel.topic) embed.addFields(
        {name: `🎙 Old topic`, value: `${oldChannel.topic ? oldChannel.topic : '`None topic`'}`, inline: false},
        {name: `🎙 New topic`, value: `${newChannel.topic ? newChannel.topic : '`None topic`'}`, inline: false}
    )

    if (oldChannel.nsfw !== newChannel.nsfw) embed.addFields(
        {name: `🎙 Salon NSFW`, value: newChannel.nsfw ? '`Actived`' : '`Deactivated`', inline: true}
    )

    return client.getChannel(oldChannel.guild, server, {embeds: [embed]});

};