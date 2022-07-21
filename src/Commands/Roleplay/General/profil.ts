import {BernardClient} from "../../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {find as findMembers} from "../../../Models/roleplay";
import {find as findLevels} from "../../../Models/levels";
import {find as findEconomy} from "../../../Models/economy";
import {EMBED_GENERAL, EMOJIS} from "../../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let userOption = interaction.options.getString("user");
    const userToProfil = userOption!.replace("<@!", "").replace(">", "");
    const member = interaction.guild?.members.cache.get(userToProfil.replace(/ /g, ""))!

    let memberConfig: any = await findMembers(interaction.guild!.id, member.id);
    let levelConfig: any = await findLevels(interaction.guild!.id, member.id);
    let economyConfig: any = await findEconomy(interaction.guild!.id, member.id);

    if (!member)
        return interaction.replyErrorMessage(client, language("MEMBER_ERROR"), true);

    if (!memberConfig) return interaction.replyErrorMessage(client,
        language("ACCOUNT_UNDEFINED").replace('%user%',`${member.displayName}#${member.user.discriminator}`), true);


    let partner = await interaction.guild!.members.fetch(memberConfig.wedding.partner);

    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({
            name: language("AUTHOR").replace('%user%', `${member.displayName}#${member.user.discriminator}`),
            iconURL: member.user.displayAvatarURL({dynamic: true})
        })
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .addFields(
            {
                name: language("ADDFIELD_LEVEL").replace('%emoji%', client.getEmoji(EMOJIS.level)),
                value: `${levelConfig.roleplay.level} (${levelConfig.roleplay.experience} EXP)`,
                inline: true
            },
            {
                name: language("ADDFIELD_MONEY").replace('%emoji%', client.getEmoji(EMOJIS.money)),
                value: `${economyConfig.money}`,
                inline: true
            },
            {
                name: language("ADDFIELD_BANK").replace('%emoji%', client.getEmoji(EMOJIS.bank)),
                value: `${economyConfig.bank}`,
                inline: true
            },
            {
                name: language("ADDFIELD_LIFE").replace('%emoji%', client.getEmoji(EMOJIS.heart)),
                value: `${memberConfig.health.hp.now}/${memberConfig.health.hp.total}`,
                inline: true
            },
            {
                name: language("ADDFIELD_ENERGY").replace('%emoji%', client.getEmoji(EMOJIS.energy)),
                value: `${memberConfig.health.energy.now}/${memberConfig.health.energy.total}`,
                inline: true
            },
            {
                name: language("ADDFIELD_HYGIENE").replace('%emoji%', client.getEmoji(EMOJIS.hygiene)),
                value: `${memberConfig.health.hygiene.now}/${memberConfig.health.hygiene.total}`,
                inline: true
            },
            {
                name: language("ADDFIELD_WEDDING").replace('%emoji%', client.getEmoji(EMOJIS.luxury)),
                value: memberConfig.wedding.enabled ? language("ADDFIELD_VALUE_WEDDING")
                    .replace('%user%', `${member.displayName}`).replace('%partner%', `${partner.displayName}`) : "`None`",
                inline: true
            },
            {
                name: language("ADDFIELD_POWER").replace('%emoji%', client.getEmoji(EMOJIS.power)),
                value: language("ADDFIELD_VALUE_POWER").replace('%emoji%', client.getEmoji(EMOJIS.attack))
                    .replace('%attack%', `${memberConfig.power.attack}`).replace('%emoji%', client.getEmoji(EMOJIS.defense))
                    .replace('%defense%', `${memberConfig.power.defense}`),
                inline: true
            }
        )
        .setFooter({text: language("FOOTER").replace('%uui%', memberConfig.uui)
                .replace('%user%', `${member.displayName}`).replace('%date%', `${memberConfig.createAccount}`)});

    await interaction.reply('Loading...');
    return interaction.editReply({content: null, embeds: [embed]});

};

export const slash = {
    data: {
        name: "profil",
        description: "View your profil or a user's profil.",
        category: "Roleplay",
        permissions: ["SEND_MESSAGES"],
        options: [
            {
                name: "user",
                description: "The user to view the profil of.",
                type: "STRING",
                required: true,
            }
        ],
        defaultPermission: false
    }
}