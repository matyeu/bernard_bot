import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageAttachment, MessageEmbed} from "discord.js";
import {find as findMember, edit as editMember} from "../../Models/roleplay";
import {find as findLevel, edit as editLevel} from "../../Models/levels";
import {EMBED_ERROR, EMBED_INFO, EMBED_SUCCESS, EMOJIS, FOOTER} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction) {

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
            `Please wait **${Math.floor(timeFarmCd / (1000 * 60) % 60)} minute(s) ${Math.floor(timeFarmCd / (1000) % 60)}** to run this command again.`,
            true);
    }

    if (memberConfig.health.energy.now < 2) return interaction.replyErrorMessage(client,
        `You don't have enough energy to **${choices}**`, true)

    switch (choices) {
        case "fishing":
            if (!memberConfig.inventory.equipements.fishingRod)
                return interaction.replyErrorMessage(client,
                    `**You really think you can fish with your bare hands (even our prehistoric men couldn't do it...)? You need a fishing rod to start fishing!**`, true);

            let fishingRod = client.getEmoji(EMOJIS.fishingRod),
                salmon = client.getEmoji(EMOJIS.salmon),
                cantaril = client.getEmoji(EMOJIS.cantaril);

            let fish = new MessageAttachment('./Assets/Images/Roleplay/Farms/fish.png');
            await interaction.reply({content: `${fishingRod} | You have started **fishing**...`});

            let salmonToAdd = Math.floor((Math.random() * 10) + 0);
            let cantarilToAdd = Math.floor((Math.random() * 5) + 0);

            if (salmonToAdd && cantarilToAdd === 0) {
                const embedFishError = new MessageEmbed()
                    .setColor(EMBED_INFO)
                    .setTitle(`🐟 Failed fishing ${interaction.user.tag}!`)
                    .setDescription(`You could not find fish!`)
                    .setTimestamp()
                    .setFooter({text: FOOTER, iconURL: interaction.user?.displayAvatarURL({dynamic: true, format: "png"})});
                return interaction.channel!.send({embeds: [embedFishError]});
            }

            memberConfig.inventory.consumables.salmon += salmonToAdd;
            memberConfig.inventory.consumables.cantaril += cantarilToAdd;

            let embedFish = new MessageEmbed()
                .setColor(EMBED_INFO)
                .setTitle(`🐟 Successful fishing! (-1 ${energy})`)
                .setThumbnail("attachment://fish.png")
                .addFields(
                    {name: `${salmon} Caught salmon`, value: `${salmonToAdd}`, inline: true},
                    {name: `${cantaril} Caught cantarils`, value: `${cantarilToAdd}`, inline: true},
                    {name: `${xp} XP received`, value: `${xpToAdd}`, inline: true},
                    {name: `${energy} Energy`, value: `You now have ${memberConfig.health.energy.now -1}/50`, inline: false},
                )
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

            await interaction.channel!.send({embeds: [embedFish], files: [fish]});

            break;
        case "hunt":
            if (!memberConfig.inventory.equipements.arc)
                return interaction.replyErrorMessage(client, `**Do you really think you can hunt with your hands? You need a bow!**`, true);
            if (memberConfig.inventory.consumables.arrow < 1)
                return interaction.replyErrorMessage(client,`**You don't have an arrow to hunt with**`, true);

            let arc = client.getEmoji(EMOJIS.arc),
                arrow = client.getEmoji(EMOJIS.arrow),
                meat = client.getEmoji(EMOJIS.meat),
                skin = client.getEmoji(EMOJIS.skin);

            let arrowTh = new MessageAttachment('./Assets/Images/Roleplay/Farms/arrow.png');
            await interaction.reply({content: `${arc} | You started **hunting**...`});

            let meatToAdd = Math.floor((Math.random() * 10) + 0);
            let skinToAdd = Math.floor((Math.random() * 5) + 0);

            if (meatToAdd && meatToAdd === 0) {
            const embedHuntError = new MessageEmbed()
                .setColor(EMBED_INFO)
                .setTitle(`🍖 Failed hunt ${interaction.user.tag}!`)
                .setDescription(`You could not find meat!`)
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: interaction.user?.displayAvatarURL({dynamic: true, format: "png"})});
            return interaction.channel!.send({embeds: [embedHuntError]});
        }

            memberConfig.inventory.consumables.meat += meatToAdd;
            memberConfig.inventory.consumables.skin += skinToAdd;
            memberConfig.inventory.consumables.arrow -= 1;

            let embedHunt = new MessageEmbed()
            .setColor(EMBED_ERROR)
            .setTitle(`🍖 Successful hunt! (-1 ${energy} & -1 ${arrow})`)
            .setThumbnail("attachment://arrow.png")
            .addFields(
                {name: `${meat} Collected meats`, value: `${meatToAdd}`, inline: true},
                {name: `${skin} Collected skin`, value: `${skinToAdd}`, inline: true},
                {name: `${xp} XP received`, value: `${xpToAdd}`, inline: true},
                {name: `${energy} Energy`, value: `You now have ${memberConfig.health.energy.now -1}/50`, inline: false},
            )
            .setTimestamp()
            .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

            await interaction.channel!.send({embeds: [embedHunt], files: [arrowTh]});

            break;
        case "pick":
            if (!memberConfig.inventory.equipements.gloves)
                return interaction.replyErrorMessage(client,
                    `**Thinking about picking with your bare hands (imagine getting stung...)? You need gloves to start picking !**`, true);

            let mushroom = new MessageAttachment('./Assets/Images/Roleplay/Farms/mushroom.png')
            await interaction.reply({content: `🍄 | You have started to **pick**...`});

            let girolleToAdd = Math.floor((Math.random() * 10) + 0);
            let coulemelleToAdd = Math.floor((Math.random() * 5) + 0);

            if (girolleToAdd && coulemelleToAdd === 0) {
                const embedPickError = new MessageEmbed()
                    .setColor(EMBED_INFO)
                    .setTitle(`🍄 Failed pickup ${interaction.user.tag} !`)
                    .setDescription(`You could not find a mushroom!`)
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
                .setTitle(`🍄 Successful picking! (-1 ${energy})`)
                .setThumbnail("attachment://mushroom.png")
                .addFields(
                    {name: `${girolle} Girolle picked`, value: `${girolleToAdd}`, inline: true},
                    {name: `${coulemelle} Coulemelle picked`, value: `${coulemelleToAdd}`, inline: true},
                    {name: `${xp} XP received`, value: `${xpToAdd}`, inline: true},
                    {name: `${energy} Energy`, value: `You now have ${memberConfig.health.energy.now -1}/50`, inline: false},
                )
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

            await interaction.channel!.send({embeds: [embedPick], files: [mushroom]})

            break;
        case "cut":
            if (!memberConfig.inventory.equipements.axe)
                return interaction.replyErrorMessage(client, `Are you really thinking about cutting with your bare hands? You need an axe to start cutting!`, true);

            let axe = client.getEmoji(EMOJIS.axe),
                wood = client.getEmoji(EMOJIS.wood),
                chene = client.getEmoji(EMOJIS.chene);

            let forest = new MessageAttachment('./Assets/Images/Roleplay/forest.png');
            await interaction.reply({content: `${axe} **| You have started to **cut**...`});

            let woodToAdd = Math.floor((Math.random() * 10) + 0);
            let cheneToAdd = Math.floor((Math.random() * 5) + 0);

            if (woodToAdd && cheneToAdd === 0) {
                const embedForestError = new MessageEmbed()
                    .setColor(EMBED_INFO)
                    .setTitle(`🌲 Failed cut ${interaction.user.tag}!`)
                    .setDescription(`You couldn't find any wood!`)
                    .setTimestamp()
                    .setFooter({text: FOOTER, iconURL: interaction.user?.displayAvatarURL({dynamic: true, format: "png"})});
                return interaction.channel!.send({embeds: [embedForestError]})
            }

            memberConfig.inventory.consumables.wood += woodToAdd;
            memberConfig.inventory.consumables.chene += cheneToAdd;

            const embedForest = new MessageEmbed()
                .setColor("#306d27")
                .setTitle(`🌲 Successful cutting! (-1 ${energy})`)
                .setThumbnail("attachment://forest.png")
                .addFields(
                    {name: `${wood} Cut wood`, value: `${woodToAdd}`, inline: true},
                    {name: `${chene} Cut oak wood`, value: `${cheneToAdd}`, inline: true},
                    {name: `${xp} XP received`, value: `${xpToAdd}`, inline: true},
                    {name: `${energy} Energy`, value: `You now have ${memberConfig.health.energy.now -1}/50`, inline: false},
                )
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

            await interaction.channel!.send({embeds: [embedForest], files: [forest]})

            break;
        default:
            return interaction.replyErrorMessage(client, `The indicated action does **not exist** or **cannot be found**!`, true)
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