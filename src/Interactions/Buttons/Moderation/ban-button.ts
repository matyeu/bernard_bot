import {BernardClient, msToTime} from "../../../Librairie";
import {ButtonInteraction, Message, MessageEmbed} from "discord.js";
import {find as findBan, edit as editBan} from "../../../Models/bans";
import {find as findGuild, edit as editGuild} from "../../../Models/guild";
import {EMBED_ERROR, EMBED_INFO, EMOJIS, FOOTER_MODERATION} from "../../../config";
import ban from "../../../Commands/Moderation/ban";

const Logger = require("../../../Librairie/logger");

export default async function (client: BernardClient, interaction: ButtonInteraction) {

    let guildConfig: any = await findGuild(interaction.guild!.id);

    let memberBanId = interaction.customId.split(':')[1];
    let memberBan = await client.users.fetch(memberBanId);
    let memberGuild = await interaction.guild?.members.cache.get(memberBanId)!;
    let banConfig: any = await findBan(interaction.guild!.id, memberBan.id);

    let error = client.getEmoji(EMOJIS.error);
    if (!banConfig) return interaction.reply({
        content: `${error} | The data for this ban was **not found**!`,
        ephemeral: true
    })

    if (banConfig.memberStaff !== interaction.user.id)
        return interaction.reply({content: `${error} | **You are not** responsible for this ban!`, ephemeral: true});

    let memberStaff = await interaction.guild!.members.fetch(interaction.user.id);
    await interaction.update({components: []});

    guildConfig.stats.sanctionsCase++;
    await editGuild(interaction.guild!.id, guildConfig);

    let embedMod = new MessageEmbed()
        .setColor(EMBED_ERROR)
        .setAuthor({
            name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
            iconURL: memberStaff.displayAvatarURL({dynamic: true, format: 'png'})
        })
        .setDescription(`
**Member:** \`${memberBan.tag}\` (${memberBan.id})
**Action:** Ban
**Expiration:** \`${banConfig.time !== "Always" ?  msToTime(banConfig.time) : "Never"}\` 
**Reason:** ${banConfig.reason}`)
        .setTimestamp()
        .setFooter({text: `Case ${guildConfig.stats.sanctionsCase}`})

    let channelPublic = guildConfig.channels.logs.public;
    if (!channelPublic) return;

    channelPublic = interaction.guild!.channels.cache.find(channelPublic => channelPublic.id === `${guildConfig.channels.logs.public}`);
    await channelPublic.send({embeds: [embedMod]})
        .then(async (message: Message) => {
            banConfig.reference = message.id;
            banConfig.case = guildConfig.stats.sanctionsCase;
            await editBan(interaction.guild!.id, memberBanId, banConfig)
        })

    if (memberGuild) {
        try {
            let embedUser = new MessageEmbed()
                .setColor(EMBED_INFO)
                .setTitle(`${client.user?.username} Protect - Ban`)
                .setDescription(`You have been banned from the \`${interaction.guild?.name}\` server for the following reason: **${banConfig.reason}**`)
                .setTimestamp()
                .setFooter({
                    text: FOOTER_MODERATION,
                    iconURL: interaction.client.user?.displayAvatarURL({dynamic: true})
                })
            await memberBan.send({embeds: [embedUser]});
        } catch (err: any) {
            if (err.message.match("Cannot send messages to this user"))
                return Logger.warn(`${memberBan.tag} blocks his private messages, so he did not receive the reason for his ban.`);

            return Logger.error(err);
        }
    }

    return interaction.guild!.bans.create(memberBan.id, {reason: banConfig.reason, days: 7});


};

export const button = {
    data: {
        name: "ban",
    }
}