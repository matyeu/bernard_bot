import {BernardClient, msToTime} from "../../../Librairie";
import {ButtonInteraction, Message, MessageEmbed} from "discord.js";
import {find as findMute, edit as editMute} from "../../../Models/mutes";
import {find as findGuild, edit as editGuild} from "../../../Models/guild";
import {EMBED_CLOSE, EMBED_INFO, EMOJIS, FOOTER_MODERATION} from "../../../config";

const Logger = require("../../../Librairie/logger");

export default async function (client: BernardClient, interaction: ButtonInteraction) {

    let guildConfig: any = await findGuild(interaction.guild!.id);

    let memberMuteId = interaction.customId.split(':')[1];
    let memberMute = await client.users.fetch(memberMuteId);
    let memberGuild = await interaction.guild?.members.cache.get(memberMuteId)!;
    let muteConfig: any = await findMute(interaction.guild!.id, memberMute.id);

    let error = client.getEmoji(EMOJIS.error);
    if (!muteConfig) return interaction.reply({
        content: `${error} | The data for this mute was **not found**!`,
        ephemeral: true
    })

    if (muteConfig.memberStaff !== interaction.user.id)
        return interaction.reply({content: `${error} | **You are not** responsible for this mute!`, ephemeral: true});

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
        .setDescription(`
**Member:** \`${memberMute.tag}\` (${memberMute.id})
**Action:** Mute
**Expiration:** \`${msToTime(muteConfig.time)}\` 
**Reason:** ${muteConfig.reason}`)
        .setTimestamp()
        .setFooter({text: `Case ${guildConfig.stats.sanctionsCase}`})

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
                .setDescription(`You have been muted from the \`${interaction.guild?.name}\` server for the following reason: **${muteConfig.reason}**`)
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
    }
}