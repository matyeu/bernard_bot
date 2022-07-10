import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";
import {find as findGuild} from "../../Models/guild";
import {create, find, edit} from "../../Models/bans";
import {EMBED_ERROR, EMBED_SUCCESS, FOOTER_MODERATION} from "../../config";

const ms = require("ms");

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let guildConfig: any = await findGuild(interaction.guild!.id);

    let memberOption = interaction.options.getString("user");
    const userToBan = memberOption!.replace("<@!", "").replace(">", "");
    let reason = interaction.options.getString("reason");
    let timeOption = interaction.options.getString('time');
    let time = timeOption ? ms(timeOption) : language("ALWAYS");

    //ban
    const memberBan = await client.users.fetch(userToBan.replace(/ /g, ""));
    const memberGuild = await interaction.guild?.members.cache.get(userToBan.replace(/ /g, ""))!;

    //unban
    const bans = await interaction.guild!.bans.fetch()
    let memberUnban = bans.get(userToBan)!;

    const memberStaff = interaction.guild?.members.cache.get(interaction.user.id)!;

    if (memberGuild && memberStaff.roles.highest.comparePositionTo(memberGuild.roles.highest) <= 0)
        return interaction.replyErrorMessage(client, language("BAN_ERROR"), true);

    let date = new Date().toLocaleString(guildConfig.language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });


    if (!memberGuild && memberUnban) {
        const banConfig: any = await find(interaction.guild!.id, memberUnban.user.id);
        banConfig.reason = reason;
        await edit(interaction.guild!.id, memberUnban.user.id, banConfig);
    }
    else {
        await create(interaction.guild!.id, userToBan, interaction.user.id, `${reason}`, time, Date.now());
    }

    let embed = new MessageEmbed()
        .setColor(!memberUnban ? EMBED_ERROR : EMBED_SUCCESS)
        .setAuthor({
            name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
            iconURL: memberStaff.user.displayAvatarURL({dynamic: true})
        })
        .setTitle(`${!memberUnban ? "Ban" : "Unban"}`)
        .setDescription(language("DESCRIPTION").replace('%user%', interaction.user)
            .replace('%action%', !memberUnban ? "ban" : "unban").replace('%member%', memberBan.tag).replace('%reason%', reason))
        .addFields(
            {
                name: language("MEMBER"),
                value: `${memberBan.tag} (${memberBan.id})`,
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
                .setCustomId(!memberUnban ? `ban:${memberBan.id}` : `unban:${memberBan.id}`)
                .setEmoji(!memberUnban ? "⚡" : "✅")
                .setLabel(!memberUnban ? "Ban" : "Unban")
                .setStyle(!memberUnban ? "DANGER" : "SUCCESS"))

        .addComponents(
            new MessageButton()
                .setCustomId(`cancel:${memberStaff.user.id}`)
                .setLabel("Cancel")
                .setStyle(!memberUnban ? "SUCCESS" : "DANGER")
        );

    return interaction.reply({embeds: [embed], components: [buttons]});

};

export const slash = {
    data: {
        name: "ban",
        description: "Bans or Unban a user from the server.",
        category: "Moderation",
        permissions: ["BAN_MEMBERS"],
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
                description: "Reason of the ban/unban",
                required: true
            },
            {
                name: "time",
                type: "STRING",
                description: "Time of the ban",
                required: false,
            }

        ],
        defaultPermission: false
    }
}