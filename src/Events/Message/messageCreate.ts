import {BernardClient} from "../../Librairie";
import {Message} from "discord.js";
import {find as finGuild} from "../../Models/guild";
import {find as findMember, edit as editMember} from "../../Models/members";

export default async function (client: BernardClient, message: Message) {

    if (message.author.bot) return;

    const guildId = message.guild!.id;
    const memberId = message.member!.id;

    let guildConfig: any = await finGuild(guildId);
    let memberConfig: any = await findMember(guildId, memberId);
    if (message.channel.id === guildConfig.channels.configVoice && !message.author.bot) await message.delete();

    const mentiondMemberIds = message.mentions.users;

    if (mentiondMemberIds) {
        for (const mentiondMember of mentiondMemberIds.values()) {
            const memberConfig: any = await findMember(guildId, mentiondMember.id);

            if (memberConfig.afk.statut) {
                await message.channel.send(`**${memberConfig.afk.reason.length > 0 ? `${mentiondMember.tag} is currently absent for the following reason: ${memberConfig.afk.reason}.`
                    : `${mentiondMember.tag} is currently absent.`}**`)
            }
        }
    }

    if (memberConfig.afk.statut) {
        memberConfig.afk = {statut: false, reason: ''};
        await editMember(guildId, memberId, memberConfig);
        if (message.guild?.ownerId !== message.author.id)
            await message.member?.setNickname(`${message.member?.displayName.replace('[AFK]', "")}`,
                `${message.member?.displayName} has just withdrawn from the afk list.`);
        await message.channel.send(`**${message.author} you have just been removed from the afk list !**`)

    }
}