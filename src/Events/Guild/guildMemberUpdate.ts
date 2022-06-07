import {BernardClient, diffArr} from "../../Librairie";
import {GuildMember, MessageEmbed} from "discord.js";
import {find} from "../../Models/guild";
import {find as findMember, edit as editMember} from "../../Models/members";
import {EMBED_ERROR, EMBED_INFO, EMBED_SUCESS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, oldMember: GuildMember, newMember: GuildMember) {

    let guildConfig: any = await find(oldMember.guild!.id);
    let memberConfig: any = await findMember(oldMember.guild!.id, oldMember.id)
    let server = guildConfig.channels.logs.server;

    const embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setTitle(`Member update`)
        .addFields(
            {name: `👤 Membre (ID)`, value: `${oldMember.user} \n(${oldMember.id})`})
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: oldMember.client.user?.displayAvatarURL({dynamic: true})})

    let oldNick
    let newNick
    if (oldMember.nickname === null) oldNick = '`None nickname`'
    else oldNick = oldMember.nickname
    if (newMember.nickname === null) newNick = '`None nickname`'
    else newNick = newMember.nickname

    if (oldNick !== newNick) {
        embed.addFields(
            {name: `👤 **Old nickname**`, value: oldNick, inline: true},
            {name: `👤 **New nickname**`, value: newNick, inline: true})

        memberConfig.userNickname = newNick;
        await editMember(oldMember.guild.id, oldMember.id, memberConfig)
        return client.getChannel(oldMember.guild, server, {embeds: [embed]});
    };

    //@ts-ignore
    let oldRoles = oldMember._roles.map(function(e) {return '<@&' + e + '>'});
    //@ts-ignore
    let newRoles = newMember._roles.map(function(e) {return '<@&' + e + '>'});

    if (oldRoles.length > newRoles.length) {
        let diffRolesString = diffArr(oldRoles, newRoles)
        embed.setColor(EMBED_ERROR)
            .addFields({name: `🤖 Role removed`, value: `${diffRolesString}`, inline: true});
        return client.getChannel(oldMember.guild, server, {embeds: [embed]});
    }
    else if (oldRoles.length < newRoles.length) {
        let diffRolesString = diffArr(newRoles, oldRoles)
        embed.setColor(EMBED_SUCESS)
            .addFields({name: `🤖 Role added`, value: `${diffRolesString}`, inline: true});
        return client.getChannel(oldMember.guild, server, {embeds: [embed]});
    }

};