import {BernardClient} from "../../Librairie";
import {MessageEmbed, Role, Permissions} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_INFO, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, oldRole: Role, newRole: Role) {

    let guildConfig: any = await find(oldRole.guild!.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/Channel/roleData`);
    let server = guildConfig.channels.logs.server;

    if (oldRole.rawPosition !== newRole.rawPosition) return;

    let embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setTitle(language("TITLE_UPDATE"))
        .addFields({name: language("NAME_ADDFIELD"), value: `<@&${oldRole.id}> (${oldRole.id})`, inline: true})
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: oldRole.client.user?.displayAvatarURL({dynamic: true})})

    const oldPermissions = new Permissions(oldRole.permissions);
    let oldPermissionsString = oldPermissions.toArray().join('\n');
    const newPermissions = new Permissions(newRole.permissions);
    let newPermissionsString = newPermissions.toArray().join('\n');

    if (oldRole.name !== newRole.name) {
        embed.addFields(
            {name: `🎲 Old Name`, value: `\`${oldRole.name}\` (${oldRole.id}`, inline: true},
            {name: `🎲 New Name`, value: `\`${newRole.name}\` (${newRole.id})`, inline: true})
        return client.getChannel(oldRole.guild, server, {embeds: [embed]});
    }

    if (oldPermissionsString !== newPermissionsString) {
        embed.addFields(
            {name: `🎲 News Permissions`, value: `\`\`\`${newPermissionsString}\`\`\``, inline: false}
        )
        return client.getChannel(oldRole.guild, server, {embeds: [embed]});
    }

    if (oldRole.color !== newRole.color) {
        embed.setColor(newRole.color === 0 ? EMBED_INFO : newRole.color)
        embed.addFields(
            {name: `🎲 Old Color`, value: `\`#${oldRole.color}\` (${oldRole.id}`, inline: true},
            {name: `🎲 New Color`, value: `\`#${newRole.color}\` (${newRole.id})`, inline: true})
        return client.getChannel(oldRole.guild, server, {embeds: [embed]});
    }

};