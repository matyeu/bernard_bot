import {BernardClient} from "../../Librairie";
import {MessageEmbed, Role} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_SUCCESS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, role: Role) {

    let guildConfig: any = await find(role.guild!.id);
    let server = guildConfig.channels.logs.server;

    const embed = new MessageEmbed()
        .setColor(EMBED_SUCCESS)
        .setTitle(`Role creatio,`)
        .addFields(
            {name: `🎲 Name (ID)`, value: `<@&${role.id}> (${role.id})`, inline: true}
        )
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: role.client.user?.displayAvatarURL({dynamic: true})});
    return client.getChannel(role.guild, server, {embeds: [embed]});

};