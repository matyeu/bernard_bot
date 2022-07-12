import {BernardClient} from "../../../Librairie";
import {ButtonInteraction, Message, MessageEmbed} from "discord.js";
import {find as findMute, edit as editMute} from "../../../Models/mutes";
import {find as findGuild, edit as editGuild} from "../../../Models/guild";
import {EMBED_INFO, EMBED_SUCCESS, EMOJIS, FOOTER_MODERATION} from "../../../config";

const Logger = require("../../../Librairie/logger");

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    let guildConfig: any = await findGuild(interaction.guild!.id);

    let memberUnmuteId = interaction.customId.split(':')[1];
    let memberUnmute = await client.users.fetch(memberUnmuteId);
    let memberGuild = await interaction.guild?.members.cache.get(memberUnmuteId)!;
    let muteConfig: any = await findMute(interaction.guild!.id, memberUnmute.id);

    if (!muteConfig) return interaction.replyErrorMessage(client, language("UNMUTE_NOT_FOUND"), true)

    if (muteConfig.memberStaff !== interaction.user.id)
        return interaction.replyErrorMessage(client, language("RESPONSIBLE_ERROR"), true)

    let memberStaff = await interaction.guild!.members.fetch(interaction.user.id);
    await interaction.update({components: []});

    guildConfig.stats.sanctionsCase++;
    await editGuild(interaction.guild!.id, guildConfig);

    let embedMod = new MessageEmbed()
        .setColor(EMBED_SUCCESS)
        .setAuthor({
            name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
            iconURL: memberStaff.displayAvatarURL({dynamic: true, format: 'png'})
        })
        .setDescription(language("DESCRIPTION_LOG")
            .replace('%user%', `\`${memberUnmute.tag}\` (${memberUnmute.id})`).replace('%reason%', muteConfig.reason)
            .replace('%reference%', `[#${muteConfig.case}](https://discord.com/channels/${interaction.guild!.id}/${guildConfig.channels.logs.public}/${muteConfig.reference})`))
        .setTimestamp()
        .setFooter({text: language("CASE").replace('%case%', guildConfig.stats.sanctionsCase)});

    let channelPublic = guildConfig.channels.logs.public;
    if (!channelPublic) return;

    channelPublic = interaction.guild!.channels.cache.find(channelPublic => channelPublic.id === `${guildConfig.channels.logs.public}`);
    await channelPublic.send({embeds: [embedMod]})
        .then(async (message: Message) => {
            muteConfig.reference = message.id;
            muteConfig.case = guildConfig.stats.sanctionsCase;
            await editMute(interaction.guild!.id, memberUnmuteId, muteConfig)
        })

    if (memberGuild) {
        try {
            let embedUser = new MessageEmbed()
                .setColor(EMBED_INFO)
                .setTitle(`${client.user?.username} Protect - Unmute`)
                .setDescription(language("DESCRIPTION_USER").replace('%server%', interaction.guild?.name) .replace('%reason%', muteConfig.reason))
                .setTimestamp()
                .setFooter({
                    text: FOOTER_MODERATION,
                    iconURL: interaction.client.user?.displayAvatarURL({dynamic: true})
                })
            await memberUnmute.send({embeds: [embedUser]});
        } catch (err: any) {
            if (err.message.match("Cannot send messages to this user"))
                return Logger.warn(`${memberUnmute.tag} blocks his private messages, so he did not receive the reason for his mute.`);

            return Logger.error(err);
        }
    }

    return memberGuild.timeout(null, 'Unmute').catch((err) => Logger.error(err)).then(async () => {await muteConfig.delete()});

};

export const button = {
    data: {
        name: "unmute",
        filepath: "Interactions/Buttons/Moderation/unmuteButtonData",
    }
}