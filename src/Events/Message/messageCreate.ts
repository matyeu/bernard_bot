import {BernardClient} from "../../Librairie";
import {Message} from "discord.js";
import {find as finGuild} from "../../Models/guild";
import {find as findMember, edit as editMember} from "../../Models/members";

export default async function (client: BernardClient, message: Message) {

    if (message.author.bot) return;

    const guildId = message.guild!.id;
    const memberId = message.member!.id;

    let guildConfig: any = await finGuild(guildId);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/messageData`);
    let memberConfig: any = await findMember(guildId, memberId);
    if (message.channel.id === guildConfig.channels.configVoice && !message.author.bot) await message.delete();

    const mentiondMemberIds = message.mentions.users;

    if (mentiondMemberIds) {
        for (const mentiondMember of mentiondMemberIds.values()) {
            const memberConfig: any = await findMember(guildId, mentiondMember.id);

            if (memberConfig.afk.statut) {
                await message.channel.send(memberConfig.afk.reason.length > 0 ? language("AFK_MESSAGE_WITH_REASON")
                        .replace('%member%', mentiondMember.tag).replace('%reason%', memberConfig.afk.reason) : language("AFK_MESSAGE")
                    .replace('%member%', mentiondMember.tag));
            }
        }
    }

    if (memberConfig.afk.statut) {
        memberConfig.afk = {statut: false, reason: ''};
        await editMember(guildId, memberId, memberConfig);
        if (message.guild?.ownerId !== message.author.id)
            await message.member?.setNickname(`${message.member?.displayName.replace('[AFK]', "")}`,
                language("AFK_WITHDRAWN_LOG").replace('%member%', message.member?.displayName));
        await message.channel.send(language("AFK_WITHDRAWN").replace('%member%', message.author));

    }
}