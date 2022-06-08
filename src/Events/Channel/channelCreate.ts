import {BernardClient} from "../../Librairie";
import {GuildChannel, MessageEmbed} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_SUCESS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, channel: GuildChannel) {

    let guildConfig: any = await find(channel.guild!.id);
    let server = guildConfig.channels.logs.server;

    const embed = new MessageEmbed()
        .setColor(EMBED_SUCESS)
        .setTitle(`Channel creation`)
        .addFields(
            {name: `🎙 Name (ID)`, value: `<#${channel.id}> (${channel.id})`, inline: true}
        )
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: channel.client.user?.displayAvatarURL({dynamic: true})});
    return client.getChannel(channel.guild, server, {embeds: [embed]});

};