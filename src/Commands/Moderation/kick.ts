import {BernardClient} from "../../Librairie";
import {CommandInteraction, Message, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";
import {edit as editGuild, find as findGuild} from "../../Models/guild";
import {EMOJIS, EMBED_ERROR, FOOTER_MODERATION, EMBED_INFO} from "../../config";

const Logger = require("../../Librairie/logger");

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let guildConfig: any = await findGuild(interaction.guild!.id);
    let error = client.getEmoji(EMOJIS.error);

    let userOption = interaction.options.getString("user");
    const userToKick = userOption!.replace("<@!", "").replace(">", "");
    const memberKick = await interaction.guild?.members.cache.get(userToKick.replace(/ /g, ""));

    const memberStaff = interaction.guild?.members.cache.get(interaction.user.id)!;

    let reason = interaction.options.getString("reason");

    let date = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    if (!memberKick) return interaction.replyErrorMessage(client, "This user does **not exist** or **cannot be found**.", true);

    if (memberStaff.roles.highest.comparePositionTo(memberKick.roles.highest) <= 0)
        return interaction.replyErrorMessage(client, "**You can't kick** this user.", true);

    let embed = new MessageEmbed()
        .setColor(EMBED_ERROR)
        .setAuthor({
            name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
            iconURL: memberStaff.user.displayAvatarURL({dynamic: true})
        })
        .setTitle(`Kick`)
        .setDescription(`${interaction.user} wants to kick ${memberKick.user.tag} for the following reason: **${reason}**`)
        .addFields(
            {
                name: `👤 Member (ID)`,
                value: `${memberKick} (${memberKick.user.id})`,
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
                .setCustomId(`kick:${interaction.user.id}`)
                .setEmoji("⚡" )
                .setLabel("Kick")
                .setStyle("DANGER"))
        .addComponents(
            new MessageButton()
                .setCustomId(`cancel:${memberStaff.user.id}`)
                .setLabel("Cancel")
                .setStyle("PRIMARY")
        );


    await interaction.replySuccessMessage(client, `Embed being created`, false)
    let message = <Message>await interaction.editReply({content: null, embeds: [embed], components: [buttons]});

    let collector = message.createMessageComponentCollector({filter: ()=> true});
    collector.on("collect", async (inter) => {
        if (inter.customId.split(':')[0] === "kick") {
            if (inter.customId.split(':')[1] !== inter.user.id)
                return inter.reply({content: `${error} | **You are not** responsible for this kick!`, ephemeral: true});

            guildConfig.stats.sanctionsCase++;
            await editGuild(interaction.guild!.id, guildConfig);

            await inter.update({components: []});

            let embedMod = new MessageEmbed()
                .setColor(EMBED_ERROR)
                .setAuthor({
                    name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
                    iconURL: memberStaff.displayAvatarURL({dynamic: true, format: 'png'})
                })
                .setDescription(`
**Member:** \`${memberKick.user.tag}\` (${memberKick.id})
**Action:** Kick
**Reason:** ${reason}`)
                .setTimestamp()
                .setFooter({text: `Case ${guildConfig.stats.sanctionsCase}`})

            await client.getChannel(inter.guild!, guildConfig.channels.logs.public, {embeds: [embedMod]});

            try {
                let embedUser = new MessageEmbed()
                    .setColor(EMBED_INFO)
                    .setTitle(`${client.user?.username} Protect - Kick`)
                    .setDescription(`You have been kicked from the \`${interaction.guild?.name}\` server for the following reason: **${reason}**`)
                    .setTimestamp()
                    .setFooter({
                        text: FOOTER_MODERATION,
                        iconURL: interaction.client.user?.displayAvatarURL({dynamic: true})
                    })
                await memberKick.send({embeds: [embedUser]});
            } catch (err: any) {
                if (err.message.match("Cannot send messages to this user"))
                    return Logger.warn(`${memberKick.user.tag} blocks his private messages, so he did not receive the reason for his kick.`);

                return Logger.error(err);
            }

            return memberKick.kick(`${reason}`);
        }
    });

};

export const slash = {
    data: {
        name: "kick",
        description: "Kick a user from the server.",
        category: "Moderation",
        permissions: ["KICK_MEMBERS"],
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
                description: "Reason of the kick",
                required: true
            },

        ],
        defaultPermission: false
    }
}