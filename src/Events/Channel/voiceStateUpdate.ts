import {BernardClient} from "../../Librairie";
import {Guild, MessageEmbed, TextChannel, VoiceState} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_ERROR, EMBED_SUCESS, EMOJIS, FOOTER_LOG} from "../../config";
import {find as findMember} from "../../Models/members";

const Logger = require('../../Librairie/logger');

export default async function (client: BernardClient, oldMember: VoiceState, newMember: VoiceState) {

    if (oldMember.member?.user.bot) return;
    let guildConfig: any = await find(oldMember.guild!.id);
    let memberConfig: any = await findMember(oldMember.guild!.id, oldMember.id);
    let voiceRole = client.getRole(oldMember.guild, guildConfig.roles.voice);
    let server = guildConfig.channels.logs.server;

    let voiceOnEmoji = client.getEmoji(EMOJIS.voiceOn),
        voiceOffEmoji = client.getEmoji(EMOJIS.voiceOff),
        microOnEmoji = client.getEmoji(EMOJIS.microOn),
        microOffEmoji = client.getEmoji(EMOJIS.microOff);

    let embed = new MessageEmbed()
        .addFields(
            {name: `👤 Member (ID)`, value: `<@${newMember.id}>\n(${newMember.id})`, inline: true},
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
            !oldMember.channelId ? await oldMember.member?.roles.add(voiceRole, "Automatic voice role")
                : await oldMember.member?.roles.remove(voiceRole, "Automatic voice role");
            embed.addFields({
                name: `🤖 Rôle (ID) ${!oldMember.channelId ? 'added' : 'removed'}`,
                value: `${voiceRole}\n(${voiceRole?.id})`,
                inline: true
            })
        }
        embed.setColor(!oldMember.channelId ? EMBED_SUCESS : EMBED_ERROR)
            .setTitle(!oldMember.channelId ? 'Connection' : 'Disconnect')

        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});

    };

    if (!oldMember.selfVideo && newMember.selfVideo || oldMember.selfVideo && !newMember.selfVideo) {

        embed.setColor(!oldMember.selfVideo ? EMBED_SUCESS : EMBED_ERROR)
            .setTitle(!oldMember.selfVideo ? 'Camera On' : 'Camera Off');
        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});

    }
    if (!oldMember.streaming && newMember.streaming || oldMember.streaming && !newMember.streaming) {

        embed.setColor(!oldMember.streaming ? EMBED_SUCESS : EMBED_ERROR)
            .setTitle(!oldMember.streaming ? 'Start Streaming' : 'Stop Streaming');
        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});

    }

    if (!oldMember.selfDeaf && newMember.selfDeaf || oldMember.selfDeaf && !newMember.selfDeaf) {
        embed.setColor(!oldMember.selfDeaf ? EMBED_SUCESS : EMBED_ERROR)
            .setTitle(!oldMember.selfDeaf ? 'Deaf On' : 'Dead Off')
            .addFields(
                {name: `🤖 Deaf`, value: `${!oldMember.selfDeaf ? voiceOffEmoji : voiceOnEmoji}`, inline: true}
            )
        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});
    }

    if (!oldMember.selfMute && newMember.selfMute || oldMember.selfMute && !newMember.selfMute) {

        embed.setColor(!oldMember.selfMute ? EMBED_SUCESS : EMBED_ERROR)
            .setTitle(!oldMember.selfMute ? 'Mute On' : 'Mute Off')
            .addFields(
                {name: `🤖 Mute`, value: `${!oldMember.selfMute ? microOffEmoji : microOnEmoji}`, inline: true}
            )
        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});

    }

    if (!oldMember.serverDeaf && newMember.serverDeaf || oldMember.serverDeaf && !newMember.serverDeaf) {

        embed.setColor(!oldMember.serverDeaf ? EMBED_SUCESS : EMBED_ERROR)
            .setTitle(!oldMember.serverDeaf ? 'Deaf (Server) On' : 'Deaf (Server) Off')
            .addFields(
                {name: `🤖 Deaf`, value: `${!oldMember.serverDeaf ? voiceOffEmoji : voiceOnEmoji}`, inline: true}
            )
        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});

    }
    ;

    if (!oldMember.serverMute && newMember.serverMute || oldMember.serverMute && !newMember.serverMute) {

        embed.setColor(!oldMember.serverMute ? EMBED_SUCESS : EMBED_ERROR)
            .setTitle(!oldMember.serverMute ? 'Mute (Server) On' : 'Mute (Server) Off')
            .addFields(
                {name: `🤖 Mute`, value: `${!oldMember.serverMute ? microOffEmoji : microOnEmoji}`, inline: true}
            )
        return client.getChannel(<Guild>newMember!.guild, server, {embeds: [embed]});

    }
};