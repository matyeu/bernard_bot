import {BernardClient} from "../../Librairie";
import {GuildChannel, MessageEmbed} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_SUCCESS, EMOJIS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, channel: GuildChannel) {

    let guildConfig: any = await find(channel.guild!.id);
    let server = guildConfig.channels.logs.server;

    let channelEmoji = client.getEmoji(EMOJIS.channel);

    const embed = new MessageEmbed()
        .setColor(EMBED_SUCCESS)
        .setTitle(`Channel creation`)
        .addFields(
            {name: `${channelEmoji} Name (ID)`, value: `<#${channel.id}> (${channel.id})`, inline: true}
        )
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: channel.client.user?.displayAvatarURL({dynamic: true})});
    return client.getChannel(channel.guild, server, {embeds: [embed]});

};