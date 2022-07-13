import {BernardClient} from "../../Librairie";
import {GuildChannel, MessageEmbed} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_SUCCESS, EMOJIS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, channel: GuildChannel) {

    let guildConfig: any = await find(channel.guild!.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/channelData`);
    let server = guildConfig.channels.logs.server;

    let channelEmoji = client.getEmoji(EMOJIS.channel);

    const embed = new MessageEmbed()
        .setColor(EMBED_SUCCESS)
        .setTitle(language("TITLE_CREATION"))
        .addFields(
            {name: language("NAME_ADDFIELD").replace('%emoji%', channelEmoji),
                value: `<#${channel.id}> (${channel.id})`, inline: true}
        )
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: channel.client.user?.displayAvatarURL({dynamic: true})});
    return client.getChannel(channel.guild, server, {embeds: [embed]});

};