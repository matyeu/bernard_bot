import {BernardClient} from "../../Librairie";
import {Guild, MessageEmbed} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_INFO, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, oldGuild: Guild, newGuild: Guild) {

    let guildConfig: any = await find(oldGuild.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/guildData`);
    let server = guildConfig.channels.logs.server;

    let hastag = "🎙",
        avatar = "👤";

    const embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setTitle(language("TITLE_UPDATE").replace('%event%', 'Server'))
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: oldGuild.client.user?.displayAvatarURL({dynamic: true})})

    if (oldGuild.name !== newGuild.name) {
        embed.addFields(
            {name: language("OLD_NAME").replace('%emoji%', hastag), value: oldGuild.name, inline: true},
            {name: language("NEW_NAME").replace('%emoji%', hastag), value: newGuild.name, inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.description !== newGuild.description) {
        embed.addFields(
            {name: language("OLD_DESCRIPTION").replace('%emoji%', hastag), value: oldGuild.description ? oldGuild.description : '`None`', inline: true},
            {name: language("NEW_DESCRIPTION").replace('%emoji%', hastag), value: newGuild.description ? newGuild.description : '`None`', inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.verificationLevel !== newGuild.verificationLevel) {
        embed.addFields(
            {name: language("OLD_LEVEL").replace('%emoji%', hastag), value: oldGuild.verificationLevel, inline: true},
            {name: language("NEW_LEVEL").replace('%emoji%', hastag), value: newGuild.verificationLevel, inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.systemChannelId !== newGuild.systemChannelId) {
        embed.addFields(
            {name: language("OLD_CHANNEL_SYSTEM").replace('%emoji%', hastag),
                value: oldGuild.systemChannel ? `<#${oldGuild.systemChannelId}>` : '`None`', inline: true},
            {name: language("NEW_CHANNEL_SYSTEM").replace('%emoji%', hastag),
                value: newGuild.systemChannel ? `<#${newGuild.systemChannelId}>` : '`None`', inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.afkChannelId !== newGuild.afkChannelId) {
        embed.addFields(
            {name: language("OLD_CHANNEL_AFK").replace('%emoji%', hastag),
                value: oldGuild.afkChannel ? `<#${oldGuild.afkChannelId}>` : '`None`', inline: true},
            {name: language("NEW_CHANNEL_AFK").replace('%emoji%', hastag),
                value: newGuild.afkChannel ? `<#${newGuild.afkChannelId}>` : '`None`', inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.publicUpdatesChannelId !== newGuild.publicUpdatesChannelId && oldGuild.rulesChannelId !== newGuild.rulesChannelId) {
        embed.addFields(
            {name: language("OLD_CHANNEL_PUBLIC").replace('%emoji%', hastag),
                value: oldGuild.publicUpdatesChannel ? `<#${oldGuild.publicUpdatesChannelId}>` : '`None`', inline: true},
            {name: language("NEW_CHANNEL_PUBLIC").replace('%emoji%', hastag),
                value: newGuild.publicUpdatesChannel ? `<#${newGuild.publicUpdatesChannelId}>` : '`None`', inline: true},
            {name: language("OLD_CHANNEL_RULES").replace('%emoji%', hastag),
                value: oldGuild.rulesChannel ? `<#${oldGuild.rulesChannelId}>` : '`None`', inline: true},
            {name: language("NEW_CHANNEL_RULES").replace('%emoji%', hastag),
                value: newGuild.rulesChannel ? `<#${newGuild.rulesChannelId}>` : '`None`', inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    }

    if (oldGuild.publicUpdatesChannelId !== newGuild.publicUpdatesChannelId) {
        embed.addFields(
            {name: language("OLD_CHANNEL_PUBLIC").replace('%emoji%', hastag),
                value: oldGuild.publicUpdatesChannel ? `<#${oldGuild.publicUpdatesChannelId}>` : '`None`', inline: true},
            {name: language("NEW_CHANNEL_PUBLIC").replace('%emoji%', hastag),
                value: newGuild.publicUpdatesChannel ? `<#${newGuild.publicUpdatesChannelId}>` : '`None`', inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.rulesChannelId !== newGuild.rulesChannelId) {
        embed.addFields(
            {name: language("OLD_CHANNEL_RULES"),
                value: oldGuild.rulesChannel ? `<#${oldGuild.rulesChannelId}>` : '`None`', inline: true},
            {name: language("NEW_CHANNEL_RULES"),
                value: newGuild.rulesChannel ? `<#${newGuild.rulesChannelId}>` : '`None`', inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.ownerId !== newGuild.ownerId) {
        embed.addFields(
            {name: language("OLD_OWNER").replace('%emoji%', avatar), value: `<#${oldGuild.ownerId}>`, inline: true},
            {name: language("NEW_OWNER").replace('%emoji%', avatar), value: `<#${newGuild.ownerId}>`, inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    }
};