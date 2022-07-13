import {BernardClient, diffArr} from "../../Librairie";
import {GuildMember, MessageEmbed} from "discord.js";
import {find} from "../../Models/guild";
import {find as findMember, edit as editMember} from "../../Models/members";
import {EMBED_ERROR, EMBED_INFO, EMBED_SUCCESS, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, oldMember: GuildMember, newMember: GuildMember) {

    let guildConfig: any = await find(oldMember.guild!.id);
    let memberConfig: any = await findMember(oldMember.guild!.id, oldMember.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/Channel/guildData`);
    let server = guildConfig.channels.logs.server;

    const embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setTitle(language("TITLE_UPDATE").replace('%event%', 'Member'))
        .addFields(
            {name: language("MEMBER"), value: `${oldMember.user} \n(${oldMember.id})`})
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: oldMember.client.user?.displayAvatarURL({dynamic: true})})

    let oldNick
    let newNick
    if (oldMember.nickname === null) oldNick = '`None`'
    else oldNick = oldMember.nickname
    if (newMember.nickname === null) newNick = '`None`'
    else newNick = newMember.nickname

    if (oldNick !== newNick) {
        embed.addFields(
            {name: language("OLD_NICKNAME"), value: oldNick, inline: true},
            {name: language("NEW_NICKNAME"), value: newNick, inline: true})

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
        if (diffRolesString[0] === `<@&${guildConfig.roles.voice}>`) return;
        embed.setColor(EMBED_ERROR)
            .addFields({name: language("ROLE_REMOVED"), value: `${diffRolesString}`, inline: true});
        return client.getChannel(oldMember.guild, server, {embeds: [embed]});
    }
    else if (oldRoles.length < newRoles.length) {
        let diffRolesString = diffArr(newRoles, oldRoles)
        if (diffRolesString[0] === `<@&${guildConfig.roles.voice}>`) return;
        embed.setColor(EMBED_SUCCESS)
            .addFields({name: language("ROLE_ADDED"), value: `${diffRolesString}`, inline: true});
        return client.getChannel(oldMember.guild, server, {embeds: [embed]});
    }

};