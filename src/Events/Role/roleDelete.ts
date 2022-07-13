import {BernardClient} from "../../Librairie";
import {MessageEmbed, Role} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_ERROR, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, role: Role) {

    let guildConfig: any = await find(role.guild!.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/Channel/roleData`);
    let server = guildConfig.channels.logs.server;

    const embed = new MessageEmbed()
        .setColor(EMBED_ERROR)
        .setTitle(language("TITLE_DELETE"))
        .addFields(
            {name: language("NAME_ADDFIELD"), value: `\`${role.name}\` (${role.id})`, inline: true}
        )
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: role.client.user?.displayAvatarURL({dynamic: true})});
    return client.getChannel(role.guild, server, {embeds: [embed]});

};