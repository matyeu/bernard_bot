import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";
import {find as findGuild, edit as editGuild} from "../../Models/guild";
import {create as createWarn, findOne as findOneWarn, find as findWarn, findGuild as findGuilWarn} from "../../Models/warns";
import {EMBED_CLOSE, EMBED_INFO, EMBED_SUCCESS, FOOTER_MODERATION} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let guildConfig: any = await findGuild(interaction.guild!.id);
    const memberStaff = interaction.guild?.members.cache.get(interaction.user.id)!;

    let date = new Date().toLocaleString(guildConfig.language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    switch (interaction.options.getSubcommand()) {
        case 'user':
            let deleteWarn = interaction.options.getNumber("delete");
            let reason = interaction.options.getString("reason");

            let userOption = interaction.options.getString("user");
            const userToWarn = userOption!.replace("<@!", "").replace(">", "");
            const memberToWarn = interaction.guild?.members.cache.get(userToWarn.replace(/ /g, ""))!;

            if (!memberToWarn)
                return interaction.replyErrorMessage(client, language("MEMBER_ERROR"), true);

            if (memberStaff.roles.highest.comparePositionTo(memberToWarn.roles.highest) <= 0)
                return interaction.replyErrorMessage(client, language("WARN_ERROR"), true);

            if (reason && !deleteWarn) {
                guildConfig.stats.sanctionsCase++;
                await editGuild(interaction.guild!.id, guildConfig);

                await createWarn(interaction.guild!.id, memberToWarn.user.id, guildConfig.stats.sanctionsCase, interaction.user.id, reason);

                let embedWarn = new MessageEmbed()
                    .setColor(EMBED_CLOSE)
                    .setAuthor({
                        name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
                        iconURL: memberStaff.user.displayAvatarURL({dynamic: true})
                    })
                    .setTitle(`Warn`)
                    .setDescription(language("DESCRIPTION_WARN").replace('%user%', interaction.user)
                        .replace('%member%', memberToWarn.user.tag).replace('%reason%', reason))
                    .addFields(
                        {
                            name: language("MEMBER"),
                            value: `${memberToWarn} (${memberToWarn.user.id})`,
                            inline: true
                        },
                        {
                            name: `📅 Date`,
                            value: date,
                            inline: true
                        })
                    .setTimestamp()
                    .setFooter({text: FOOTER_MODERATION, iconURL: interaction.guild!.iconURL({dynamic: true})!});

                let buttonsWarn = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId(`warn:${memberToWarn.id}-${guildConfig.stats.sanctionsCase}`)
                            .setEmoji("⚡")
                            .setLabel("Warn")
                            .setStyle("DANGER"))
                    .addComponents(
                        new MessageButton()
                            .setCustomId(`cancel:${memberStaff.user.id}`)
                            .setLabel("Cancel")
                            .setStyle("PRIMARY")
                    );

                return interaction.reply({embeds: [embedWarn], components: [buttonsWarn]});
            } else if (reason && deleteWarn) {
                let foundWarn: any = await findOneWarn(interaction.guild!.id, memberToWarn.user.id, `${deleteWarn}`);

                if (foundWarn) {
                    let byMember = interaction.guild?.members.cache.get(foundWarn.memberStaff)!;

                    let embedUnwarn = new MessageEmbed()
                        .setColor(EMBED_SUCCESS)
                        .setAuthor({
                            name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
                            iconURL: memberStaff.user.displayAvatarURL({dynamic: true})
                        })
                        .setTitle(`Unwarn`)
                        .setDescription(language("DESCRIPTION_WARN").replace('%user%', interaction.user)
                            .replace('%member%', memberToWarn.user.tag).replace('%reason%', reason))
                        .addFields(
                            {
                                name: language("MEMBER"),
                                value: `${memberToWarn}\n(${memberToWarn.user.id})`,
                                inline: true
                            },
                            {
                                name: `👤 Staff (ID)`,
                                value: `${byMember ? `${byMember}\n(${byMember.id})` : language("OLD_STAFF")}`,
                                inline: true
                            },
                            {
                                name: `📅 Date`,
                                value: `\`${foundWarn.date}\``,
                                inline: true
                            }
                        )
                        .setTimestamp()
                        .setFooter({text: FOOTER_MODERATION, iconURL: interaction.guild!.iconURL({dynamic: true})!});

                    let buttonsUnwarn = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId(`unwarn:${memberToWarn.id}-${foundWarn.id}`)
                                .setEmoji("✅")
                                .setLabel("Unwarn")
                                .setStyle("SUCCESS"))
                        .addComponents(
                            new MessageButton()
                                .setCustomId(`cancel:${memberStaff.user.id}`)
                                .setLabel("Cancel")
                                .setStyle("PRIMARY")
                        );
                    return interaction.reply({embeds: [embedUnwarn], components: [buttonsUnwarn]});

                } else {
                    return interaction.replyErrorMessage(client, language("NOT_WARNING"), true);
                }
            } else if (!reason && deleteWarn) {
                return interaction.replyErrorMessage(client, language("REASON_REQUIRED"), true);
            } else {
                let warns: any = await findWarn(interaction.guild!.id, memberToWarn.user.id);

                let embedInfo = new MessageEmbed()
                    .setColor(EMBED_INFO)
                    .setAuthor({
                        name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
                        iconURL: memberStaff.user.displayAvatarURL({dynamic: true})
                    })
                    .setDescription(language("WARN_USER_HAS").replace('%user%', `${memberToWarn.displayName}#${memberToWarn.user.discriminator}`)
                        .replace('%number%', warns.length))
                for (let i = 0; i < (warns.length > 25 ? 25 : warns.length); i++) {
                    let userWarn = warns[i];
                    let byMember = interaction.guild?.members.cache.get(userWarn.memberStaff)!;
                    let by = byMember ? `${byMember.displayName}#${byMember.user.discriminator}` : language("OLD_STAFF");
                    embedInfo.addFields(
                        {
                            name: language("NAME_VALUE_USER").replace('%number%', userWarn.id).replace('%staff%', by).replace('%date%', userWarn.date),
                            value: userWarn.reason,
                            inline: true
                        })
                        .setTimestamp()
                        .setFooter({text: FOOTER_MODERATION, iconURL: interaction.guild!.iconURL({dynamic: true})!});
                }
                return interaction.reply({embeds: [embedInfo]});
            }
            break;
        case
        'server':
            let warnsServer: any = await findGuilWarn(interaction.guild!.id);

            let embedServer = new MessageEmbed()
                .setColor(EMBED_INFO)
                .setAuthor({
                    name: `${interaction.guild!.name}`,
                    iconURL: `${interaction.guild!.iconURL() ? interaction.guild!.iconURL({dynamic: true}) : ""}`
                })
                .setDescription(language("WARN_SERVER_HAS").replace('%server%', interaction.guild!.name).replace('%number%', warnsServer.length))
            for (let i = 0; i < (warnsServer.length > 25 ? 25 : warnsServer.length); i++) {
                let userWarn = warnsServer[i];
                let userWarning = interaction.guild?.members.cache.get(userWarn.memberWarn)!;
                let user = userWarning ? `${userWarning.displayName}#${userWarning.user.discriminator}` : language("OLD_MEMBER");
                let byMember = interaction.guild?.members.cache.get(userWarn.memberStaff)!;
                let by = byMember ? `${byMember.displayName}#${byMember.user.discriminator}` : language("OLD_STAFF");
                embedServer.addFields(
                    {
                        name: language("NAME_VALUE_SERVER").replace('%user%', user).replace('%staff%', by).replace('%date%', userWarn.date),
                        value: userWarn.reason,
                        inline: true
                    })
                    .setTimestamp()
                    .setFooter({text: FOOTER_MODERATION, iconURL: interaction.guild!.iconURL({dynamic: true})!});
            }
            return interaction.reply({embeds: [embedServer]});
            break;
        default:
            return interaction.replyErrorMessage(client, language("DEFAULT"), true);
    }

}

export const slash = {
    data: {
        name: "warn",
        description: "Add or remove a warning to a user.",
        category: "Moderation",
        permissions: ["MANAGE_MESSAGES"],
        cooldown: 1,
        options: [
            {
                name: "user",
                type: "SUB_COMMAND",
                description: "Display warns of a user.",
                options: [
                    {
                        name: "user",
                        type: "STRING",
                        description: "Mention or ID of the user.",
                        required: true
                    },
                    {
                        name: "reason",
                        type: "STRING",
                        description: "Reason of the warn.",
                    },
                    {
                        name: "delete",
                        type: "NUMBER",
                        description: "Specify the number of the warn deleted."
                    },
                ]
            },
            {
                name: "server",
                type: "SUB_COMMAND",
                description: "Display server warnings.",
            }
        ],
        defaultPermission: false
    }
}