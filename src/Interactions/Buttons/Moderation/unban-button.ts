import {BernardClient} from "../../../Librairie";
import {ButtonInteraction, MessageEmbed} from "discord.js";
import {find as findGuild, edit as editGuild} from "../../../Models/guild";
import {find as findBan} from "../../../Models/bans";
import {EMBED_SUCCESS, EMOJIS} from "../../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction) {

    let guildConfig: any = await findGuild(interaction.guild!.id);
    let memberUnbanId = interaction.customId.split(':')[1];
    let memberUnban = await client.users.fetch(memberUnbanId);
    let banConfig: any = await findBan(interaction.guild!.id, memberUnbanId);

    let error = client.getEmoji(EMOJIS.error);
    if (!banConfig) return interaction.reply({
        content: `${error} | The data for this ban was **not found**!`,
        ephemeral: true
    })

    if (banConfig.memberStaff !== interaction.user.id)
        return interaction.reply({content: `${error} | **You are not** responsible for this unban!`, ephemeral: true});

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
**Member:** \`${memberUnban.tag}\` (${memberUnban.id})
**Action:** Unban
**Reason:** ${banConfig.reason}
**Reference:** [#${banConfig.case}](https://discord.com/channels/${interaction.guild!.id}/${guildConfig.channels.logs.public}/${banConfig.reference})`)
        .setTimestamp()
        .setFooter({text: `Case ${guildConfig.stats.sanctionsCase}`})

    await interaction.guild!.bans.remove(memberUnban.id, `${banConfig.reason}`)
        .then(async () => {await banConfig.delete()});

    return client.getChannel(interaction.guild!, guildConfig.channels.logs.public, {embeds: [embedMod]});

};

export const button = {
    data: {
        name: "unban",
    }
}