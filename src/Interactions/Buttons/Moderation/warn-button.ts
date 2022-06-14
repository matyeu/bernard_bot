import {BernardClient} from "../../../Librairie";
import {ButtonInteraction, Message, MessageEmbed} from "discord.js";
import {find as findGuild} from "../../../Models/guild";
import {findOne as findOneWarn, edit as editWarn} from "../../../Models/warns";
import {EMBED_CLOSE, EMBED_INFO, EMOJIS} from "../../../config";

const Logger = require("../../../Librairie/logger");

export default async function (client: BernardClient, interaction: ButtonInteraction) {

    let guildConfig: any = await findGuild(interaction.guild!.id);
    let idWarning = interaction.customId.split('-')[1];
    let memberWarnId = interaction.customId.substring(23, 5);
    let memberWarn = interaction.guild?.members.cache.get(memberWarnId)!;
    let warnConfig: any = await findOneWarn(interaction.guild!.id, memberWarnId, idWarning);

    let error = client.getEmoji(EMOJIS.error);
    if (warnConfig.memberStaff !== interaction.user.id)
        return interaction.reply({content: `${error} | **You are not** responsible for this ban!`, ephemeral: true});

    if (!memberWarn)
        return interaction.reply({content: `${error} | This user does **not exist** or **cannot be found**.`, ephemeral: true});

    let memberStaff = await interaction.guild!.members.fetch(interaction.user.id);
    await interaction.update({components: []});

    let embedMod = new MessageEmbed()
        .setColor(EMBED_CLOSE)
        .setAuthor({
            name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
            iconURL: memberStaff.displayAvatarURL({dynamic: true, format: 'png'})
        })
        .setDescription(`
**Member:** \`${memberWarn.user.tag}\` (${memberWarn.id})
**Action:** Warn
**Reason:** ${warnConfig.reason}`)
        .setTimestamp()
        .setFooter({text: `Case ${warnConfig.id}`})

    let channelPublic = guildConfig.channels.logs.public;
    if (!channelPublic) return;

    channelPublic = interaction.guild!.channels.cache.find(channelPublic => channelPublic.id === `${guildConfig.channels.logs.public}`);
    await channelPublic.send({embeds: [embedMod]})
        .then(async (message: Message) => {
            warnConfig.reference = message.id;
            await editWarn(interaction.guild!.id, memberWarnId, warnConfig.id, warnConfig)
        });

    try {
        let embedUser = new MessageEmbed()
            .setColor(EMBED_INFO)
            .setTitle(`${client.user?.username} Protect - Warn`)
            .setDescription(`You have been warned from the \`${interaction.guild?.name}\` server for the following reason: **${warnConfig.reason}**`)
            .addFields(
                {name: `Server`, value: `${interaction.guild?.name}`, inline: true},
                {name: `Date`, value: `\`${warnConfig.date}\``, inline: true},
                {name: `Warning number`, value: `\`${warnConfig.id}\``, inline: true})
            .setFooter({text: `The warning number is to be kept for any claim`})
        await memberWarn.send({embeds: [embedUser]});
    } catch (err: any) {
        if (err.message.match("Cannot send messages to this user"))
            return Logger.warn(`${memberWarn.user.tag} blocks his private messages, so he did not receive the reason for his warn.`);

        return Logger.error(err);
    }

};

export const button = {
    data: {
        name: "warn",
    }
}