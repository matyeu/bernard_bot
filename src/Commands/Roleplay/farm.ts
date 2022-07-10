import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageAttachment, MessageEmbed} from "discord.js";
import {find as findMember, edit as editMember} from "../../Models/roleplay";
import {find as findLevel, edit as editLevel} from "../../Models/levels";
import {EMBED_ERROR, EMBED_INFO, EMBED_SUCCESS, EMOJIS, FOOTER} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let choices = interaction.options.getString('choice');
    let memberConfig: any = await findMember(interaction.guild!.id, interaction.user!.id);
    let memberLevel: any = await findLevel(interaction.guild!.id, interaction.user!.id);

    let xpToAdd = Math.floor((Math.random() * 60) + 1);
    memberLevel.roleplay.experience += xpToAdd;
    await editLevel(interaction.guild!.id, interaction.user.id, memberLevel);

    let farmCD = 150000; // 2,5 minutes
    let farmLast = await memberConfig.cooldowns.farms;
    let timeFarmCd = farmCD - (Date.now() - farmLast);

    let energy = client.getEmoji(EMOJIS.energy),
        xp = client.getEmoji(EMOJIS.xp);

    if (farmLast !== null && farmCD - (Date.now() - farmLast) > 0) {
        return interaction.replyErrorMessage(client,
            language("COOLDOWNS").replace('%minutes%', Math.floor(timeFarmCd / (1000 * 60) % 60)).replace('%seconds%', Math.floor(timeFarmCd / (1000) % 60)),
            true);
    }

    if (memberConfig.health.energy.now < 2) return interaction.replyErrorMessage(client,
        language("DONT_HAVE_ENERGY").replace('%choice%', choices), true)

    switch (choices) {
        case "fishing":
            if (!memberConfig.inventory.equipements.fishingRod)
                return interaction.replyErrorMessage(client, language("ERROR_FISHING"), true);

            let fishingRod = client.getEmoji(EMOJIS.fishingRod),
                salmon = client.getEmoji(EMOJIS.salmon),
                cantaril = client.getEmoji(EMOJIS.cantaril);

            let fish = new MessageAttachment('./assets/Images/Roleplay/Farms/fish.png');
            await interaction.reply({content: language("START_FISHING").replace('%emoji%', fishingRod)});

            let salmonToAdd = Math.floor((Math.random() * 10) + 0);
            let cantarilToAdd = Math.floor((Math.random() * 5) + 0);

            if (salmonToAdd && cantarilToAdd === 0) {
                const embedFishError = new MessageEmbed()
                    .setColor(EMBED_INFO)
                    .setTitle(language("FAILED_FISHING").replace('%user%', interaction.user.tag))
                    .setDescription(language("DESCRIPTION_FISHING"))
                    .setTimestamp()
                    .setFooter({text: FOOTER, iconURL: interaction.user?.displayAvatarURL({dynamic: true, format: "png"})});
                return interaction.channel!.send({embeds: [embedFishError]});
            }

            memberConfig.inventory.consumables.salmon += salmonToAdd;
            memberConfig.inventory.consumables.cantaril += cantarilToAdd;

            let embedFish = new MessageEmbed()
                .setColor(EMBED_INFO)
                .setTitle(language("SUCCESSFUL_FISHING").replace('%emoji%', energy))
                .setThumbnail("attachment://fish.png")
                .addFields(
                    {name: language("SALMON").replace('%emoji%', salmon), value: `${salmonToAdd}`, inline: true},
                    {name: language("CANTARIL").replace('%emoji%', cantaril), value: `${cantarilToAdd}`, inline: true},
                    {name: language("XP_RECEIVED").replace('%emoji%', xp), value: `${xpToAdd}`, inline: true},
                    {name: language("ENERGY_NAME").replace('%emoji%', energy), value: language("ENERGY_VALUE")
                            .replace('%energy%', `${memberConfig.health.energy.now -1}/50`), inline: false},
                )
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

            await interaction.channel!.send({embeds: [embedFish], files: [fish]});

            break;
        case "hunt":
            if (!memberConfig.inventory.equipements.arc)
                return interaction.replyErrorMessage(client, language("ERROR_HUNT"), true);
            if (memberConfig.inventory.consumables.arrow < 1)
                return interaction.replyErrorMessage(client, language("ERROR_ARROW"), true);

            let arc = client.getEmoji(EMOJIS.arc),
                arrow = client.getEmoji(EMOJIS.arrow),
                meat = client.getEmoji(EMOJIS.meat),
                skin = client.getEmoji(EMOJIS.skin);

            let arrowTh = new MessageAttachment('./assets/Images/Roleplay/Farms/arrow.png');
            await interaction.reply({content: language("START_HUNT").replace('%emoji%', arc)});

            let meatToAdd = Math.floor((Math.random() * 10) + 0);
            let skinToAdd = Math.floor((Math.random() * 5) + 0);

            if (meatToAdd && meatToAdd === 0) {
            const embedHuntError = new MessageEmbed()
                .setColor(EMBED_INFO)
                .setTitle(language("FAILED_HUNT").replace('%user%', interaction.user.tag))
                .setDescription(language("DESCRIPTION_HUNT"))
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: interaction.user?.displayAvatarURL({dynamic: true, format: "png"})});
            return interaction.channel!.send({embeds: [embedHuntError]});
        }

            memberConfig.inventory.consumables.meat += meatToAdd;
            memberConfig.inventory.consumables.skin += skinToAdd;
            memberConfig.inventory.consumables.arrow -= 1;

            let embedHunt = new MessageEmbed()
            .setColor(EMBED_ERROR)
            .setTitle(language("SUCCESSFUL_HUNT").replace('%energy%', energy).replace('%arrow%', arrow))
            .setThumbnail("attachment://arrow.png")
            .addFields(
                {name: language("MEAT").replace('%emoji%', meat), value: `${meatToAdd}`, inline: true},
                {name: language("SKIN").replace("%emoji%", skin), value: `${skinToAdd}`, inline: true},
                {name: language("XP_RECEIVED").replace("%emoji%", xp), value: `${xpToAdd}`, inline: true},
                {name: language("ENERGY_NAME").replace('%emoji%', energy), value: language("ENERGY_VALUE")
                        .replace('%energy%', `${memberConfig.health.energy.now -1}/50`), inline: false},
            )
            .setTimestamp()
            .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

            await interaction.channel!.send({embeds: [embedHunt], files: [arrowTh]});

            break;
        case "pick":
            if (!memberConfig.inventory.equipements.gloves)
                return interaction.replyErrorMessage(client, language("ERROR_PICK"), true);

            let mushroom = new MessageAttachment('./assets/Images/Roleplay/Farms/mushroom.png')
            await interaction.reply({content: language("START_PICK").replace('%emoji%', "🍄")});

            let girolleToAdd = Math.floor((Math.random() * 10) + 0);
            let coulemelleToAdd = Math.floor((Math.random() * 5) + 0);

            if (girolleToAdd && coulemelleToAdd === 0) {
                const embedPickError = new MessageEmbed()
                    .setColor(EMBED_INFO)
                    .setTitle(language("FAILED_PICK").replace('%user%', interaction.user.tag))
                    .setDescription(language("DESCRIPTION_PICK"))
                    .setTimestamp()
                    .setFooter({text: FOOTER, iconURL: interaction.user?.displayAvatarURL({dynamic: true, format: "png"})});
                return interaction.channel!.send({embeds: [embedPickError]})
            }

            memberConfig.inventory.consumables.girolle += girolleToAdd;
            memberConfig.inventory.consumables.coulemelle += coulemelleToAdd;

            let girolle = client.getEmoji(EMOJIS.girolle),
                coulemelle = client.getEmoji(EMOJIS.coulemelle);

            let embedPick = new MessageEmbed()
                .setColor(EMBED_SUCCESS)
                .setTitle(language("SUCCESSFUL_PICK").replace('%emoji%', energy))
                .setThumbnail("attachment://mushroom.png")
                .addFields(
                    {name: language("GIROLLE").replace('%emoji%', girolle), value: `${girolleToAdd}`, inline: true},
                    {name: language("COULEMELLE").replace('%emoji%', coulemelle), value: `${coulemelleToAdd}`, inline: true},
                    {name: language("XP_RECEIVED").replace("%emoji%", xp), value: `${xpToAdd}`, inline: true},
                    {name: language("ENERGY_NAME").replace('%emoji%', energy), value: language("ENERGY_VALUE")
                            .replace('%energy%', `${memberConfig.health.energy.now -1}/50`), inline: false},
                )
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

            await interaction.channel!.send({embeds: [embedPick], files: [mushroom]})

            break;
        case "cut":
            if (!memberConfig.inventory.equipements.axe)
                return interaction.replyErrorMessage(client, language("ERROR_CUT"), true);

            let axe = client.getEmoji(EMOJIS.axe),
                wood = client.getEmoji(EMOJIS.wood),
                chene = client.getEmoji(EMOJIS.chene);

            let forest = new MessageAttachment('./assets/Images/Roleplay/Farms/forest.png');
            await interaction.reply({content: language("START_CUT").replace('%emoji%', axe)});

            let woodToAdd = Math.floor((Math.random() * 10) + 0);
            let cheneToAdd = Math.floor((Math.random() * 5) + 0);

            if (woodToAdd && cheneToAdd === 0) {
                const embedForestError = new MessageEmbed()
                    .setColor(EMBED_INFO)
                    .setTitle(language("FAILED_CUT").replace('%user%', interaction.user.tag))
                    .setDescription(language("DESCRIPTION_CUT"))
                    .setTimestamp()
                    .setFooter({text: FOOTER, iconURL: interaction.user?.displayAvatarURL({dynamic: true, format: "png"})});
                return interaction.channel!.send({embeds: [embedForestError]})
            }

            memberConfig.inventory.consumables.wood += woodToAdd;
            memberConfig.inventory.consumables.chene += cheneToAdd;

            const embedForest = new MessageEmbed()
                .setColor("#306d27")
                .setTitle(language("SUCCESSFUL_CUT").replace('%emoji%', energy))
                .setThumbnail("attachment://forest.png")
                .addFields(
                    {name: language("WOOD").replace("%emoji%", wood), value: `${woodToAdd}`, inline: true},
                    {name: language("CHENE").replace("%emoji%", chene), value: `${cheneToAdd}`, inline: true},
                    {name: language("XP_RECEIVED").replace("%emoji%", xp), value: `${xpToAdd}`, inline: true},
                    {name: language("ENERGY_NAME").replace('%emoji%', energy), value: language("ENERGY_VALUE")
                            .replace('%energy%', `${memberConfig.health.energy.now -1}/50`), inline: false},
                )
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

            await interaction.channel!.send({embeds: [embedForest], files: [forest]})

            break;
        default:
            return interaction.replyErrorMessage(client, language("DEFAULT")
                .replace('%subcommand%', interaction.options.getSubcommand()), true)
    }

    memberConfig.health.energy.now -= 1;
    memberConfig.cooldowns.farms = Date.now();
    memberConfig.experience += xpToAdd;
    await editMember(interaction.guild!.id, interaction.user.id, memberConfig);
};

export const slash = {
    data: {
        name: "farm",
        description: "The farm command allows you to fish, hunt, gather etc...",
        category: "Roleplay",
        permissions: ["SEND_MESSAGES"],
        cooldown: 1,
        options: [
            {
                name: "choice",
                description: "The choice of the action to be taken.",
                type: "STRING",
                required: true,
                choices: [
                    {name: "fishing", value: "fishing"},
                    {name: "hunt", value: "hunt"},
                    {name: "pick", value: "pick"},
                    {name: "cut", value: "cut"},
                ]
            }
        ],
        roleplay: true,
        defaultPermission: false
    }
}