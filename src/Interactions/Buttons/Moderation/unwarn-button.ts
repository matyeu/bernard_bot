import {BernardClient} from "../../../Librairie";
import {ButtonInteraction, MessageEmbed} from "discord.js";
import {edit as editGuild, find as findGuild} from "../../../Models/guild";
import {findOne as findOneWarn} from "../../../Models/warns";
import {EMBED_INFO, EMBED_SUCCESS, EMOJIS, FOOTER_MODERATION} from "../../../config";

const Logger = require("../../../Librairie/logger");

export default async function (client: BernardClient, interaction: ButtonInteraction) {

    let guildConfig: any = await findGuild(interaction.guild!.id);
    let idWarning = interaction.customId.split('-')[1];
    let memberWarnId = interaction.customId.substring(25, 7);
    let memberWarn = interaction.guild?.members.cache.get(memberWarnId)!;
    let warnConfig: any = await findOneWarn(interaction.guild!.id, memberWarnId, idWarning);


    let error = client.getEmoji(EMOJIS.error);
    if (warnConfig.memberStaff !== interaction.user.id)
        return interaction.reply({content: `${error} | **You are not** responsible for this warn!`, ephemeral: true});

    if (!memberWarn)
        return interaction.reply({content: `${error} | This user does **not exist** or **cannot be found**.`, ephemeral: true});

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
        .setDescription(`
**Member:** \`${memberWarn.user.tag}\` (${memberWarn.id})
**Action:** Unwarn
**Reason:** ${warnConfig.reason}
**Reference:** [#${warnConfig.id}](https://discord.com/channels/${interaction.guild!.id}/${guildConfig.channels.logs.public}/${warnConfig.reference})`)
        .setTimestamp()
        .setFooter({text: `Case ${guildConfig.stats.sanctionsCase}`})

    try {
        let embedUser = new MessageEmbed()
            .setColor(EMBED_INFO)
            .setTitle(`${client.user?.username} Protect - Unwarn`)
            .setDescription(`The following warning has been removed: **${warnConfig.reason}**`)
            .addFields(
                {name: `Server`, value: `${interaction.guild?.name}`, inline: true},
                {name: `Date`, value: `\`${warnConfig.date}\``, inline: true},
                {name: `Warning number`, value: `\`${warnConfig.id}\``, inline: true})
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
    }
}