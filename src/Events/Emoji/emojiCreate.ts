import {BernardClient} from "../../Librairie";
import {GuildEmoji, MessageEmbed} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_SUCCESS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, emoji: GuildEmoji) {

    let guildConfig: any = await find(emoji.guild!.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/Channel/emojiData`);
    let server = guildConfig.channels.logs.server;

    const embed = new MessageEmbed()
        .setColor(EMBED_SUCCESS)
        .setTitle(language("TITLE_CREATION"))
        .addFields(
            {name: language("NAME_ADDFIELD"), value: `<:${emoji.name}:${emoji.id}> \`${emoji.name}\` (${emoji.id})`, inline: true}
        )
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: emoji.client.user?.displayAvatarURL({dynamic: true})});
    return client.getChannel(emoji.guild, server, {embeds: [embed]});

};