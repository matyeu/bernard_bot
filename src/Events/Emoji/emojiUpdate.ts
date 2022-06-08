import {BernardClient} from "../../Librairie";
import {GuildEmoji, MessageEmbed} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_INFO, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, oldEmoji: GuildEmoji, newEmoji: GuildEmoji) {

    let guildConfig: any = await find(oldEmoji.guild!.id);
    let server = guildConfig.channels.logs.server;

    let embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setTitle('Emoji update')
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: oldEmoji.client.user?.displayAvatarURL({dynamic: true})})

    if (oldEmoji.name !== newEmoji.name) embed.addFields(
        {name: `❗️ Old Name`, value: `<:${oldEmoji.name}:${oldEmoji.id}> \`${oldEmoji.name}\``, inline: true},
        {name: `❗️ New Name`, value: `<:${newEmoji.name}:${newEmoji.id}> \`${newEmoji.name}\``, inline: true})

    return client.getChannel(oldEmoji.guild, server, {embeds: [embed]});

};
