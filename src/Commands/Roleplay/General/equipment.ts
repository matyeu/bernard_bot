import {BernardClient} from "../../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {find} from "../../../Models/roleplay";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let userOption = interaction.options.getString("user");
    const userToEquipment = userOption!.replace("<@!", "").replace(">", "");
    const member = interaction.guild?.members.cache.get(userToEquipment.replace(/ /g, ""))!;

    if (!member)
        return interaction.replyErrorMessage(client, language("MEMBER_ERROR"), true);

    let memberConfig: any = await find(member.guild.id, member.id);
    if (!memberConfig) return interaction.replyErrorMessage(client,
        language("ACCOUNT_UNDEFINED").replace('%user%',`${member.displayName}#${member.user.discriminator}`), true);


    let memberEquipment = memberConfig.inventory.equipements;

    const headset = client.getEmoji(EMOJIS.headsetEq);
    const legwarmers = client.getEmoji(EMOJIS.legwarmers);
    const boots = client.getEmoji(EMOJIS.boots);
    const gloves = client.getEmoji(EMOJIS.gloves);
    const ring = client.getEmoji(EMOJIS.ring);
    const collar = client.getEmoji(EMOJIS.collar);
    const belt = client.getEmoji(EMOJIS.belt);
    const arme = client.getEmoji(EMOJIS.arme);
    const shield = client.getEmoji(EMOJIS.shield);
    const arc = client.getEmoji(EMOJIS.arc);
    const fishingRod = client.getEmoji(EMOJIS.fishingRod);
    const pickaxe = client.getEmoji(EMOJIS.pickaxe);
    const axe = client.getEmoji(EMOJIS.axe);

    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: language("AUTHOR").replace('%user%', `${member.displayName}#${member.user.discriminator}`),
            iconURL: member.user.displayAvatarURL({dynamic: true, format: "png"})})
        .addFields(
            {name: language("HEADSET"), value: `${memberEquipment.headset ? headset : '`None`' }`, inline: true},
            {name: language("LEGWARMERS"), value: `${memberEquipment.legwarmers ? legwarmers : '`None`' }`, inline: true},
            {name: language("BOOTS"), value: `${memberEquipment.boots ? boots : '`None`' }`, inline: true},
            {name: language("GLOVES"), value: `${memberEquipment.gloves ? gloves : '`None`' }`, inline: true},
            {name: language("RING"), value: `${memberEquipment.ring ? ring : '`None`' }`, inline: true},
            {name: language("COLLAR"), value: `${memberEquipment.collar ? collar : '`None`' }`, inline: true},
            {name: language("BELT"), value: `${memberEquipment.belt ? belt : '`None`' }`, inline: true},
            {name: language("WEAPON"), value: `${memberEquipment.arme ? arme : '`None`' }`, inline: true},
            {name: language("SHIELD"), value: `${memberEquipment.shield ? shield : '`None`' }`, inline: true},
            {name: language("ARC"), value: `${memberEquipment.arc ? arc : '`None`' }`, inline: true},
            {name: language("FISHING_ROD"), value: `${memberEquipment.fishingRod ? fishingRod : '`None`' }`, inline: true},
            {name: language("PICKAXE"), value: `${memberEquipment.pickaxe ? pickaxe : '`None`' }`, inline: true},
            {name: language("AXE"), value: `${memberEquipment.axe ? axe : '`None`' }`, inline: true},)
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: client.user?.displayAvatarURL({dynamic: true, format: "png"})});

    return interaction.reply({embeds: [embed]})
};

export const slash = {
    data: {
        name: "equipment",
        description: "Display your or a user's equipment.",
        category: "Roleplay",
        permissions: ["SEND_MESSAGES"],
        options: [
            {
                name: "user",
                type: "STRING",
                description: "Mention or ID of the user",
                required: true,
            },
        ],
        roleplay: true,
        defaultPermission: false
    }
}