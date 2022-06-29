import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {find} from "../../Models/roleplay";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let userOption = interaction.options.getString("user");
    const userToEquipment = userOption!.replace("<@!", "").replace(">", "");
    const member = interaction.guild?.members.cache.get(userToEquipment.replace(/ /g, ""))!;

    if (!member)
        return interaction.replyErrorMessage(client, "This user does **not exist** or **cannot be found**.", true);

    let memberConfig: any = await find(member.guild.id, member.id);
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
        .setAuthor({name: `Equipment of ${member.displayName}#${member.user.discriminator}`, iconURL: member.user.displayAvatarURL({dynamic: true, format: "png"})})
        .addFields(
            {name: `Headset`, value: `${memberEquipment.headset ? headset : '`None`' }`, inline: true},
            {name: `Legwarmers`, value: `${memberEquipment.legwarmers ? legwarmers : '`None`' }`, inline: true},
            {name: `Boots`, value: `${memberEquipment.boots ? boots : '`None`' }`, inline: true},
            {name: `Gloves`, value: `${memberEquipment.gloves ? gloves : '`None`' }`, inline: true},
            {name: `Ring`, value: `${memberEquipment.ring ? ring : '`None`' }`, inline: true},
            {name: `Collar`, value: `${memberEquipment.collar ? collar : '`None`' }`, inline: true},
            {name: `Belt`, value: `${memberEquipment.belt ? belt : '`None`' }`, inline: true},
            {name: `Weapon`, value: `${memberEquipment.arme ? arme : '`None`' }`, inline: true},
            {name: `Shield`, value: `${memberEquipment.shield ? shield : '`None`' }`, inline: true},
            {name: `Arc`, value: `${memberEquipment.arc ? arc : '`None`' }`, inline: true},
            {name: `Fishing rod`, value: `${memberEquipment.fishingRod ? fishingRod : '`None`' }`, inline: true},
            {name: `Pickaxe`, value: `${memberEquipment.pickaxe ? pickaxe : '`None`' }`, inline: true},
            {name: `Axe`, value: `${memberEquipment.axe ? axe : '`None`' }`, inline: true},)
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