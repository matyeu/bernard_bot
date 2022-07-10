import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";
import {EMOJIS, EMBED_ERROR, FOOTER_MODERATION, EMBED_SUCCESS} from "../../config";
import {find as findGuild} from "../../Models/guild";
import {create, edit, find} from "../../Models/mutes";

const ms = require("ms");

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let guildConfig: any = await findGuild(interaction.guild!.id);

    let userOption = interaction.options.getString("user");
    const userToMute = userOption!.replace("<@!", "").replace(">", "");
    let reason = interaction.options.getString("reason");
    let timeOption = interaction.options.getString('time');
    let time = timeOption ? ms(timeOption) : ms("5m");

    const memberMute = await interaction.guild?.members.cache.get(userToMute.replace(/ /g, ""))!;
    let muteConfig: any = await find(interaction.guild!.id, memberMute.id);

    const memberStaff = interaction.guild?.members.cache.get(interaction.user.id)!;

    if (!memberMute) return interaction.replyErrorMessage(client, language("MEMBER_ERROR"), true);

    if (memberStaff.roles.highest.comparePositionTo(memberMute.roles.highest) <= 0)
        return interaction.replyErrorMessage(client, language("MUTE_ERROR"), true);

    let date = new Date().toLocaleString(guildConfig.language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    if (muteConfig) {
        muteConfig.reason = reason;
        await edit(interaction.guild!.id, memberMute.user.id, muteConfig);
    }
    else {
        await create(interaction.guild!.id, userToMute, interaction.user.id, `${reason}`, time, Date.now());
    }

    let embed = new MessageEmbed()
        .setColor(!muteConfig ? EMBED_ERROR : EMBED_SUCCESS)
        .setAuthor({
            name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
            iconURL: memberStaff.user.displayAvatarURL({dynamic: true})
        })
        .setTitle(`${!muteConfig ? "Mute" : "Unmute"}`)
        .setDescription(language("DESCRIPTION").replace("%user%", interaction.user)
            .replace("%action%", !muteConfig ? "mute" : "unmute").replace("%member%", memberMute.user.tag).replace("%reason%", reason))
        .addFields(
            {
                name: language("MEMBER"),
                value: `${memberMute} (${memberMute.id})`,
                inline: true
            },
            {
                name: `📅 Date`,
                value: date,
                inline: true
            })
        .setTimestamp()
        .setFooter({text: FOOTER_MODERATION, iconURL: interaction.guild!.iconURL({dynamic: true})!});

    let buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(!muteConfig ? `mute:${memberMute.id}` : `unmute:${memberMute.id}`)
                .setEmoji(!muteConfig ? EMOJIS.microOff : EMOJIS.microOn)
                .setLabel(!muteConfig ? "Mute" : "Unmute")
                .setStyle(!muteConfig ? "DANGER" : "SUCCESS"))

        .addComponents(
            new MessageButton()
                .setCustomId(`cancel:${memberStaff.user.id}`)
                .setLabel("Cancel")
                .setStyle(!muteConfig ? "SUCCESS" : "DANGER")
        );

    return interaction.reply({embeds: [embed], components: [buttons]});

};

export const slash = {
    data: {
        name: "mute",
        description: "Mute a user from the server.",
        category: "Moderation",
        permissions: ["MANAGE_MESSAGES"],
        cooldown: 1,
        options: [
            {
                name: "user",
                type: "STRING",
                description: "Mention or ID of the user",
                required: true,
            },
            {
                name: "reason",
                type: "STRING",
                description: "Reason of the mute",
                required: true
            },
            {
                name: "time",
                type: "STRING",
                description: "Time of the mute",
            }

        ],
        defaultPermission: false
    }
}