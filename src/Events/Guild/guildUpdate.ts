import {BernardClient} from "../../Librairie";
import {Guild, MessageEmbed} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_INFO, FOOTER_LOG} from "../../config";

export default async function (client: BernardClient, oldGuild: Guild, newGuild: Guild) {

    let guildConfig: any = await find(oldGuild.id);
    let server = guildConfig.channels.logs.server;

    let hastag = "🎙",
        avatar = "👤";

    const embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setTitle(`Server update`)
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: oldGuild.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

    if (oldGuild.name !== newGuild.name) {
        embed.addFields(
            {name: `${hastag} Old name`, value: oldGuild.name, inline: true},
            {name: `${hastag} New name`, value: newGuild.name, inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.description !== newGuild.description) {
        embed.addFields(
            {name: `${hastag} Old description`, value: oldGuild.description ? oldGuild.description : '`None description`', inline: true},
            {name: `${hastag} New description`, value: newGuild.description ? newGuild.description : '`None description`', inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.verificationLevel !== newGuild.verificationLevel) {
        embed.addFields(
            {name: `${hastag} Old level of vérification`, value: oldGuild.verificationLevel, inline: true},
            {name: `${hastag} New level of vérification`, value: newGuild.verificationLevel, inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.systemChannelId !== newGuild.systemChannelId) {
        embed.addFields(
            {name: `${hastag} Old channel system`, value: oldGuild.systemChannel ? `<#${oldGuild.systemChannelId}>` : '`None channel system`', inline: true},
            {name: `${hastag} New channel system`, value: newGuild.systemChannel ? `<#${newGuild.systemChannelId}>` : '`None channel system`', inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.afkChannelId !== newGuild.afkChannelId) {
        embed.addFields(
            {name: `${hastag} Old channel AFK`, value: oldGuild.afkChannel ? `<#${oldGuild.afkChannelId}>` : '`None channel AFK`', inline: true},
            {name: `${hastag} New channel AFK`, value: newGuild.afkChannel ? `<#${newGuild.afkChannelId}>` : '`None channel AFK`', inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.publicUpdatesChannelId !== newGuild.publicUpdatesChannelId && oldGuild.rulesChannelId !== newGuild.rulesChannelId) {
        embed.addFields(
            {name: `${hastag} Old public update channel`, value: oldGuild.publicUpdatesChannel ? `<#${oldGuild.publicUpdatesChannelId}>` : '`None public update channel`', inline: true},
            {name: `${hastag} New public update channel`, value: newGuild.publicUpdatesChannel ? `<#${newGuild.publicUpdatesChannelId}>` : '`None public update channel`', inline: true},
            {name: `${hastag} Old rules channel`, value: oldGuild.rulesChannel ? `<#${oldGuild.rulesChannelId}>` : '`None rules channel`', inline: true},
            {name: `${hastag} New rules channel`, value: newGuild.rulesChannel ? `<#${newGuild.rulesChannelId}>` : '`None rules channel`', inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    }

    if (oldGuild.publicUpdatesChannelId !== newGuild.publicUpdatesChannelId) {
        embed.addFields(
            {name: `${hastag} Old public update channel`, value: oldGuild.publicUpdatesChannel ? `<#${oldGuild.publicUpdatesChannelId}>` : '`None public update channel`', inline: true},
            {name: `${hastag} New public update channel`, value: newGuild.publicUpdatesChannel ? `<#${newGuild.publicUpdatesChannelId}>` : '`None public update channel`', inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.rulesChannelId !== newGuild.rulesChannelId) {
        embed.addFields(
            {name: `${hastag} Old rules channel`, value: oldGuild.rulesChannel ? `<#${oldGuild.rulesChannelId}>` : '`None rules channel`', inline: true},
            {name: `${hastag} Old rules channel`, value: newGuild.rulesChannel ? `<#${newGuild.rulesChannelId}>` : '`None rules channel`', inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    };

    if (oldGuild.ownerId !== newGuild.ownerId) {
        embed.addFields(
            {name: `${avatar} Ancien propriétaire`, value: `<#${oldGuild.ownerId}>`, inline: true},
            {name: `${avatar} Nouveau propriétaire`, value: `<#${newGuild.ownerId}>`, inline: true})

        return client.getChannel(oldGuild, server, {embeds: [embed]});
    }
};