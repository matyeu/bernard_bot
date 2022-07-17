import {BernardClient} from "../../Librairie";
import {MessageEmbed, Role} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_SUCCESS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, role: Role) {

    let guildConfig: any = await find(role.guild!.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/roleData`);
    let server = guildConfig.channels.logs.server;

    if (guildConfig.modules.logs) return;

    const embed = new MessageEmbed()
        .setColor(EMBED_SUCCESS)
        .setTitle(language("TITLE_CREATION"))
        .addFields(
            {name: language("NAME_ADDFIELD"), value: `<@&${role.id}> (${role.id})`, inline: true}
        )
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: role.client.user?.displayAvatarURL({dynamic: true})});
    return client.getChannel(role.guild, server, {embeds: [embed]});

};