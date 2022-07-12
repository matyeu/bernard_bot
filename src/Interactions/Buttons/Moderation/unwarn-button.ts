import {BernardClient} from "../../../Librairie";
import {ButtonInteraction, MessageEmbed} from "discord.js";
import {edit as editGuild, find as findGuild} from "../../../Models/guild";
import {findOne as findOneWarn} from "../../../Models/warns";
import {EMBED_INFO, EMBED_SUCCESS, FOOTER_MODERATION} from "../../../config";

const Logger = require("../../../Librairie/logger");

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    let guildConfig: any = await findGuild(interaction.guild!.id);
    let idWarning = interaction.customId.split('-')[1];
    let memberWarnId = interaction.customId.substring(25, 7);
    let memberWarn = interaction.guild?.members.cache.get(memberWarnId)!;
    let warnConfig: any = await findOneWarn(interaction.guild!.id, memberWarnId, idWarning);

    if (warnConfig.memberStaff !== interaction.user.id)
        return interaction.replyErrorMessage(client, language("ERROR_AUTHOR"), true)

    if (!memberWarn)
        return interaction.replyErrorMessage(client, language("UNWARN_NOT_FOUND"), true)

    let memberStaff = await interaction.guild!.members.fetch(interaction.user.id);
    await interaction.update({components: []});

    guildConfig.stats.sanctionsCase++;
    await editGuild(interaction.guild!.id, guildConfig)

    let embedMod = new MessageEmbed()
        .setColor(EMBED_SUCCESS)
        .setAuthor({
            name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
            iconURL: memberStaff.displayAvatarURL({dynamic: true, format: 'png'})
        })
        .setDescription(language("DESCRIPTION_LOG")
            .replace('%user%', `\`${memberWarn.user.tag}\` (${memberWarn.id})`).replace('%reason%', warnConfig.reason)
            .replace('%reference%', `[#${warnConfig.id}](https://discord.com/channels/${interaction.guild!.id}/${guildConfig.channels.logs.public}/${warnConfig.reference})`))
        .setTimestamp()
        .setFooter({text: language("CASE").replace('%case%', guildConfig.stats.sanctionsCase)});

    try {
        let embedUser = new MessageEmbed()
            .setColor(EMBED_INFO)
            .setTitle(`${client.user?.username} Protect - Unwarn`)
            .setDescription(language("DESCRIPTION_USER").replace('%server%', interaction.guild!.name).replace('%reason%', warnConfig.reason))
            .addFields(
                {name: language("NAME_SERVER"), value: `${interaction.guild?.name}`, inline: true},
                {name: `Date`, value: `\`${warnConfig.date}\``, inline: true},
                {name: language("NAME_WARN"), value: `\`${warnConfig.id}\``, inline: true})
            .setFooter({text: FOOTER_MODERATION, iconURL: interaction.guild!.iconURL({dynamic: true})!});
        await memberWarn.send({embeds: [embedUser]});
    } catch (err: any) {
        if (err.message.match("Cannot send messages to this user"))
            return Logger.warn(`${memberWarn.user.tag} blocks his private messages, so he did not receive the reason for his unwarn.`);

        return Logger.error(err);
    }

    return client.getChannel(interaction.guild!, guildConfig.channels.logs.public, {embeds: [embedMod]})
        .then(() => {
            return warnConfig.delete();
        });

};

export const button = {
    data: {
        name: "unwarn",
        filepath: "Interactions/Buttons/Moderation/unwarnButtonData",
    }
}