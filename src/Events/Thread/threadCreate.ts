import {BernardClient} from "../../Librairie";
import {MessageEmbed, ThreadChannel} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_SUCESS, EMOJIS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, thread: ThreadChannel) {
    if (thread.isText()) await thread.join();

    let guildConfig: any = await find(thread.guild!.id);
    let server = guildConfig.channels.logs.server;

    let threadEmoji = client.getEmoji(EMOJIS.thread);

    const embed = new MessageEmbed()
        .setColor(EMBED_SUCESS)
        .setTitle(`Thread creation`)
        .addFields(
            {name: `${threadEmoji} Name (ID)`, value: `<#${thread.id}>\n(${thread.id})`, inline: true},
            {name: `👤 Member (ID)`, value: `<@${thread.ownerId}>\n(${thread.ownerId})`, inline: true},
        )
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: thread.client.user?.displayAvatarURL({dynamic: true})});
    return client.getChannel(thread.guild, server, {embeds: [embed]});
};