import {BernardClient} from "../../Librairie";
import {MessageEmbed, ThreadChannel} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_ERROR, EMOJIS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, thread: ThreadChannel) {

    let guildConfig: any = await find(thread.guild!.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/threadData`);
    let server = guildConfig.channels.logs.server;

    let threadEmoji = client.getEmoji(EMOJIS.thread);

    const embed = new MessageEmbed()
        .setColor(EMBED_ERROR)
        .setTitle(language("TITLE_DELETE"))
        .addFields(
            {name: language("NAME_ADDFIELD").replace('%emoji%', threadEmoji), value: `\`${thread.name}\``, inline: true},
        )
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: thread.client.user?.displayAvatarURL({dynamic: true})});
    return client.getChannel(thread.guild, server, {embeds: [embed]});
};