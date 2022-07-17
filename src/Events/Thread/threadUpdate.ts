import {BernardClient} from "../../Librairie";
import {MessageEmbed, ThreadChannel} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_INFO, EMOJIS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, oldThread: ThreadChannel, newThread: ThreadChannel) {
    if (oldThread.archived && !newThread.archived) await newThread.join();

    let guildConfig: any = await find(oldThread.guild!.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/threadData`);
    let server = guildConfig.channels.logs.server;

    if (guildConfig.modules.logs) return;

    let threadEmoji = client.getEmoji(EMOJIS.thread);
    const embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setTitle(language("TITLE_UPDATE"))
        .addFields({name: language("NAME_ADDFIELD").replace('%emoji%', threadEmoji),
            value: `<#${oldThread.id}>\n(${oldThread.id})`, inline: true})
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: oldThread.client.user?.displayAvatarURL({dynamic: true, format: "png"})});

    if (oldThread.name !== newThread.name) embed.addFields(
        {name: `${threadEmoji} Old Name`, value: `\`${oldThread.name}\``, inline: true},
        {name: `${threadEmoji} New Name`, value: `\`${newThread.name}\``, inline: true})

    if (oldThread.locked !== newThread.locked) {
        embed.addFields({name: `${threadEmoji} Lock`, value: `\`${newThread.locked ? 'Activated' : 'Deactivated'}\``, inline: true})
        return client.getChannel(oldThread.guild, server, {embeds: [embed]});
    }

    if (oldThread.archived !== newThread.archived) embed.addFields(
        {name: `${threadEmoji} Archive`, value: `\`${newThread.archived ? 'Activated' : 'Deactivated'}\``, inline: true})

    return client.getChannel(oldThread.guild, server, {embeds: [embed]});

}