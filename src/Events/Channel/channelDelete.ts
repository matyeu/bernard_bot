import {BernardClient} from "../../Librairie";
import {GuildChannel, MessageEmbed} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_ERROR, EMOJIS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, channel: GuildChannel) {

    let guildConfig: any = await find(channel.guild!.id);
    let server = guildConfig.channels.logs.server;

    let channelEmoji = client.getEmoji(EMOJIS.channel);

    const embed = new MessageEmbed()
        .setColor(EMBED_ERROR)
        .setTitle(`Channel delete`)
        .addFields(
            {name: `${channelEmoji} Name (ID)`, value: `\`${channel.name}\` (${channel.id})`, inline: true}
        )
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: channel.client.user?.displayAvatarURL({dynamic: true, format: "png"})});
    return client.getChannel(channel.guild, server, {embeds: [embed]});

};