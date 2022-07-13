import {BernardClient} from "../../Librairie";
import {Guild, MessageEmbed, TextChannel, VoiceState} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_ERROR, EMBED_SUCCESS, EMOJIS, FOOTER_LOG} from "../../config";
import {find as findMember} from "../../Models/members";

const Logger = require('../../Librairie/logger');

export default async function (client: BernardClient, oldMember: VoiceState, newMember: VoiceState) {

    if (oldMember.member?.user.bot) return;
    let guildConfig: any = await find(oldMember.guild!.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/channelData`);
    let memberConfig: any = await findMember(oldMember.guild!.id, oldMember.id);
    let voiceRole = client.getRole(oldMember.guild, guildConfig.roles.voice);
    let server = guildConfig.channels.logs.server;

    let voiceOnEmoji = client.getEmoji(EMOJIS.voiceOn),
        voiceOffEmoji = client.getEmoji(EMOJIS.voiceOff),
        microOnEmoji = client.getEmoji(EMOJIS.microOn),
        microOffEmoji = client.getEmoji(EMOJIS.microOff);

    let embed = new MessageEmbed()
        .addFields(
            {name: language("MEMBER"), value: `<@${newMember.id}>\n(${newMember.id})`, inline: true},
            {
                name: `${voiceOnEmoji} Channel (ID)`,
                value: `${!oldMember.channelId ? `<#${newMember.channelId}>\n(${newMember.channelId})` : `<#${oldMember.channelId}>\n(${oldMember.channelId})`}`,
                inline: true
            },
        )
        .setTimestamp()
        .setFooter({text: FOOTER_LOG, iconURL: newMember.client.user?.displayAvatarURL({dynamic: true})})

    if (!oldMember.channelId && newMember.channelId || oldMember.channelId && !newMember.channelId) {
        Logger.client(`${oldMember.member?.user.tag} just ${!oldMember.channelId ? 'connected' : 'disconnected'} at a vocal show!`);

        let voiceChannel = <TextChannel>newMember.guild?.channels.cache.get(guildConfig.channels.configVoice)
        let permissionChannel = [...voiceChannel.permissionOverwrites.cache.values()];
        if (newMember.channelId === memberConfig.voice.id) {
            await voiceChannel.edit({
                permissionOverwrites: [...permissionChannel, {
                    id: newMember.id,
                    allow: ["VIEW_CHANNEL"]
                }]
            });
        };

        if (oldMember.channelId) {
            if (oldMember.channelId === memberConfig.voice.id) await voiceChannel.permissionOverwrites.delete(newMember.id);
            const channelLeft = oldMember.guild.channels.resolve(oldMember.channelId!)!;
            let memberCount = 0;
            //@ts-ignore
            for (const _ of channelLeft.members) memberCount++;

            if (channelLeft && !memberCount && channelLeft.parentId === guildConfig.category.voice)
                await channelLeft?.delete();
        };

        if (voiceRole) {
            !oldMember.channelId ? await oldMember.member?.roles.add(voiceRole, language("LOG_ROLE"))
                : await oldMember.member?.roles.remove(voiceRole, language("LOG_ROLE"));
            embed.addFields({
                name: `🤖 Rôle (ID) ${!oldMember.channelId ? language("ADDED") : language("REMOVED")}`,
                value: `${voiceRole}\n(${voiceRole?.id})`,
                inline: true
            })
        }
        embed.setColor(!oldMember.channelId ? EMBED_SUCCESS : EMBED_ERROR)
            .setTitle(!oldMember.channelId ? language("CONNECTION") : language("DISCONNECT"))

        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});

    };

    if (!oldMember.selfVideo && newMember.selfVideo || oldMember.selfVideo && !newMember.selfVideo) {

        embed.setColor(!oldMember.selfVideo ? EMBED_SUCCESS : EMBED_ERROR)
            .setTitle(!oldMember.selfVideo ? language("CAMERA_ON") : language("CAMERA_OFF"));
        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});

    }
    if (!oldMember.streaming && newMember.streaming || oldMember.streaming && !newMember.streaming) {

        embed.setColor(!oldMember.streaming ? EMBED_SUCCESS : EMBED_ERROR)
            .setTitle(!oldMember.streaming ? language("STREAMING_START") : language("STREAMING_STOP"));
        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});

    }

    if (!oldMember.selfDeaf && newMember.selfDeaf || oldMember.selfDeaf && !newMember.selfDeaf) {
        embed.setColor(!oldMember.selfDeaf ? EMBED_SUCCESS : EMBED_ERROR)
            .setTitle(!oldMember.selfDeaf ? language('DEAF_ON') : language("DEAD_OFF"))
            .addFields(
                {name: language("DEAF"), value: `${!oldMember.selfDeaf ? voiceOffEmoji : voiceOnEmoji}`, inline: true}
            )
        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});
    }

    if (!oldMember.selfMute && newMember.selfMute || oldMember.selfMute && !newMember.selfMute) {

        embed.setColor(!oldMember.selfMute ? EMBED_SUCCESS : EMBED_ERROR)
            .setTitle(!oldMember.selfMute ? language("MUTE_ON") : language("MUTE_OFF"))
            .addFields(
                {name: `🤖 Mute`, value: `${!oldMember.selfMute ? microOffEmoji : microOnEmoji}`, inline: true}
            )
        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});

    }

    if (!oldMember.serverDeaf && newMember.serverDeaf || oldMember.serverDeaf && !newMember.serverDeaf) {

        embed.setColor(!oldMember.serverDeaf ? EMBED_SUCCESS : EMBED_ERROR)
            .setTitle(!oldMember.serverDeaf ? language("DEAF_SERVER_ON") : language("DEAF_SERVER_OFF"))
            .addFields(
                {name: language("DEAF"), value: `${!oldMember.serverDeaf ? voiceOffEmoji : voiceOnEmoji}`, inline: true}
            )
        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});

    }
    ;

    if (!oldMember.serverMute && newMember.serverMute || oldMember.serverMute && !newMember.serverMute) {

        embed.setColor(!oldMember.serverMute ? EMBED_SUCCESS : EMBED_ERROR)
            .setTitle(!oldMember.serverMute ? language("MUTE_SERVER_ON") : language("MUTE_SERVER_OFF"))
            .addFields(
                {name: `🤖 Mute`, value: `${!oldMember.serverMute ? microOffEmoji : microOnEmoji}`, inline: true}
            )
        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});

    }
};