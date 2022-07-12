import {BernardClient, msToTime} from "../../../Librairie";
import {ButtonInteraction, Message, MessageEmbed} from "discord.js";
import {find as findMute, edit as editMute} from "../../../Models/mutes";
import {find as findGuild, edit as editGuild} from "../../../Models/guild";
import {EMBED_CLOSE, EMBED_INFO, EMOJIS, FOOTER_MODERATION} from "../../../config";

const Logger = require("../../../Librairie/logger");

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    let guildConfig: any = await findGuild(interaction.guild!.id);

    let memberMuteId = interaction.customId.split(':')[1];
    let memberMute = await client.users.fetch(memberMuteId);
    let memberGuild = await interaction.guild?.members.cache.get(memberMuteId)!;
    let muteConfig: any = await findMute(interaction.guild!.id, memberMute.id);

    if (!muteConfig) return interaction.replyErrorMessage(client, language("MUTE_NOT_FOUND"), true);

    if (muteConfig.memberStaff !== interaction.user.id)
        return interaction.replyErrorMessage(client, language("RESPONSIBLE_ERROR"), true);

    let memberStaff = await interaction.guild!.members.fetch(interaction.user.id);
    await interaction.update({components: []});

    guildConfig.stats.sanctionsCase++;
    await editGuild(interaction.guild!.id, guildConfig);

    let embedMod = new MessageEmbed()
        .setColor(EMBED_CLOSE)
        .setAuthor({
            name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
            iconURL: memberStaff.displayAvatarURL({dynamic: true, format: 'png'})
        })
        .setDescription(language("DESCRIPTION_LOG").replace('%user%', `\`${memberMute.tag}\` (${memberMute.id})`)
            .replace('%time%', `\`${msToTime(muteConfig.time)}\``).replace('%reason%', muteConfig.reason))
        .setTimestamp()
        .setFooter({text: language("CASE").replace('%case%', guildConfig.stats.sanctionsCase)});

    let channelPublic = guildConfig.channels.logs.public;
    if (!channelPublic) return;

    channelPublic = interaction.guild!.channels.cache.find(channelPublic => channelPublic.id === `${guildConfig.channels.logs.public}`);
    await channelPublic.send({embeds: [embedMod]})
        .then(async (message: Message) => {
            muteConfig.reference = message.id;
            muteConfig.case = guildConfig.stats.sanctionsCase;
            await editMute(interaction.guild!.id, memberMuteId, muteConfig)
        })

    if (memberGuild) {
        try {
            let embedUser = new MessageEmbed()
                .setColor(EMBED_INFO)
                .setTitle(`${client.user?.username} Protect - Mute`)
                .setDescription(language("DESCRIPTION_USER").replace('%server%', interaction.guild?.name) .replace('%reason%', muteConfig.reason))
                .setTimestamp()
                .setFooter({
                    text: FOOTER_MODERATION,
                    iconURL: interaction.client.user?.displayAvatarURL({dynamic: true})
                })
            await memberMute.send({embeds: [embedUser]});
        } catch (err: any) {
            if (err.message.match("Cannot send messages to this user"))
                return Logger.warn(`${memberMute.tag} blocks his private messages, so he did not receive the reason for his mute.`);

            return Logger.error(err);
        }
    }

    return memberGuild.timeout(parseInt(muteConfig.time), 'Mute').catch((err) => Logger.error(err));

};

export const button = {
    data: {
        name: "mute",
        filepath: "Interactions/Buttons/Moderation/muteButtonData",
    }
}