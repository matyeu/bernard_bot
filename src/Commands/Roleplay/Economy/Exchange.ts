import {BernardClient} from "../../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {find as findMembers, edit as editMembers} from "../../../Models/roleplay";
import {find as findEconomy, edit as editEconomy} from "../../../Models/economy";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let memberConfig: any = await findMembers(interaction.guild!.id, interaction.user.id);
    let economyConfig: any = await findEconomy(interaction.guild!.id, interaction.user.id);
    let memberConsumables = memberConfig.inventory.consumables;

    let error = client.getEmoji(EMOJIS.error),
        salmon = client.getEmoji(EMOJIS.salmon),
        cantaril = client.getEmoji(EMOJIS.cantaril),
        iron = client.getEmoji(EMOJIS.iron),
        crystal = client.getEmoji(EMOJIS.crystal),
        coal = client.getEmoji(EMOJIS.coal),
        wood = client.getEmoji(EMOJIS.wood),
        chene = client.getEmoji(EMOJIS.chene),
        girolle = client.getEmoji(EMOJIS.girolle),
        coulemelle = client.getEmoji(EMOJIS.coulemelle),
        meat = client.getEmoji(EMOJIS.meat),
        skin = client.getEmoji(EMOJIS.skin),
        money = client.getEmoji(EMOJIS.money),
        bag = client.getEmoji(EMOJIS.bag);

    let price = memberConsumables.wood * 5 + memberConsumables.chene * 9 + memberConsumables.girolle * 5 + memberConsumables.coulemelle * 9
        + memberConsumables.iron * 5 + memberConsumables.coal * 8 + memberConsumables.crystal * 9 + memberConsumables.meat * 7
        + memberConsumables.skin * 9 + memberConsumables.salmon * 5 + memberConsumables.cantaril * 9;

    switch (interaction.options.getSubcommand(false)) {
        case 'table':
            const embedTable = new MessageEmbed()
                .setColor(EMBED_GENERAL)
                .setTitle(language("TITLE"))
                .setDescription(language("DESCRIPTION"))
                .addFields(
                    {
                        name: language("WOOD").replace('%emoji%', wood),
                        value: language("VALUE").replace('%money%', 5).replace('%emoji%', money),
                        inline: true
                    },
                    {
                        name: language("CHENE").replace('%emoji%', chene),
                        value: language("VALUE").replace('%money%', 9).replace('%emoji%', money),
                        inline: true
                    },
                    {
                        name: language("GIROLLES").replace('%emoji%', girolle),
                        value: language("VALUE").replace('%money%', 5).replace('%emoji%', money),
                        inline: true
                    },
                    {
                        name: language("COULEMELLES").replace('%emoji%', coulemelle),
                        value: language("VALUE").replace('%money%', 9).replace('%emoji%', money),
                        inline: true
                    },
                    {
                        name: language("IRON").replace('%emoji%', iron),
                        value: language("VALUE").replace('%money%', 5).replace('%emoji%', money),
                        inline: true
                    },
                    {
                        name: language("COAL").replace('%emoji%', coal),
                        value: language("VALUE").replace('%money%', 8).replace('%emoji%', money),
                        inline: true
                    },
                    {
                        name: language("CRYSTAL").replace('%emoji%', crystal),
                        value: language("VALUE").replace('%money%', 9).replace('%emoji%', money),
                        inline: true
                    },
                    {
                        name: language("MEAT").replace('%emoji%', meat),
                        value: language("VALUE").replace('%money%', 7).replace('%emoji%', money),
                        inline: true
                    },
                    {
                        name: language("SKIN").replace('%emoji%', skin),
                        value: language("VALUE").replace('%money%', 9).replace('%emoji%', money),
                        inline: true
                    },
                    {
                        name: language("SALMON").replace('%emoji%', salmon),
                        value: language("VALUE").replace('%money%', 5).replace('%emoji%', money),
                        inline: true
                    },
                    {
                        name: language("CANTARIL").replace('%emoji%', cantaril),
                        value: language("VALUE").replace('%money%', 9).replace('%emoji%', money),
                        inline: true
                    },
                    {name: `\u200b`, value: `\u200b`, inline: true})
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true})});
            await interaction.reply({embeds: [embedTable]})
            break;
        case 'all':
            economyConfig.money += price;
            memberConsumables.wood -= memberConsumables.wood;
            memberConsumables.chene -= memberConsumables.chene;
            memberConsumables.girolle -= memberConsumables.girolle;
            memberConsumables.coulemelle -= memberConsumables.coulemelle;
            memberConsumables.iron -= memberConsumables.iron;
            memberConsumables.coal -= memberConsumables.coal;
            memberConsumables.crystal -= memberConsumables.crystal;
            memberConsumables.meat -= memberConsumables.meat;
            memberConsumables.skin -= memberConsumables.skin;
            memberConsumables.salmon -= memberConsumables.salmon;
            memberConsumables.cantaril -= memberConsumables.cantaril;
            await editMembers(interaction.guild!.id, interaction.user.id, memberConfig);
            await editEconomy(interaction.guild!.id, interaction.user.id, economyConfig);

            let embedSummary = new MessageEmbed()
                .setColor(EMBED_GENERAL)
                .setDescription('**Récapitulatif des ressources vendues :**')
                .addFields(
                    {name: language("WOOD").replace('%emoji%', wood), value: `${memberConsumables.wood}`, inline: true},
                    {name: language("CHENE").replace('%emoji%', chene), value: `${memberConsumables.chene}`, inline: true},
                    {name: language("GIROLLES").replace('%emoji%', girolle), value: `${memberConsumables.girolle}`, inline: true},
                    {name: language("COULEMELLE").replace('%emoji%', coulemelle), value: `${memberConsumables.coulemelle}`, inline: true},
                    {name: language("IRON").replace('%emoji%', iron), value: `${memberConsumables.iron}`, inline: true},
                    {name: language("COAL").replace('%emoji%', coal), value: `${memberConsumables.coal}`, inline: true},
                    {name: language("CRYSTAL").replace('%emoji%', crystal), value: `${memberConsumables.crystal}`, inline: true},
                    {name: language("MEAT").replace('%emoji%', meat), value: `${memberConsumables.meat}`, inline: true},
                    {name: language("SKIN").replace('%emoji%', skin), value: `${memberConsumables.skin}`, inline: true},
                    {name: language("SALMON").replace('%emoji%', salmon), value: `${memberConsumables.salmon}`, inline: true},
                    {name: language("CANTARIL").replace('%emoji%', cantaril), value: `${memberConsumables.cantaril}`, inline: true},
                    {name: `\u200b`, value: `\u200b`, inline: true})

            let embedSummaryMoney = new MessageEmbed()
                .setColor(EMBED_GENERAL)
                .setDescription(language("DESCRIPTION_SUMMARY").replace('%price%', price).replace('%emoji%', money))
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true})});
            await interaction.reply({embeds: [embedSummary, embedSummaryMoney]})
            break;
        case 'sale':
            let ressource = interaction.options.getString('ressource')!;
            let quantity = interaction.options.getNumber('quantity')!;

            if (memberConsumables[ressource] < quantity)
                return interaction.replyErrorMessage(client, language("NOT_ENOUGH_RESOURCE"), true);

            let priceVente = 0
            if (ressource === "salmon") priceVente = quantity * 5;
            else if (ressource === "meat") priceVente = quantity * 7;
            else if (ressource === "skin") priceVente = quantity * 9;
            else if (ressource === "crystal") priceVente = quantity * 9;
            else if (ressource === "coal") priceVente = quantity * 8;
            else if (ressource === "iron") priceVente = quantity * 5;
            else if (ressource === "cantaril") priceVente = quantity * 9;
            else if (ressource === "coulemelle") priceVente = quantity * 9;
            else if (ressource === "girolle") priceVente = quantity * 5;
            else if (ressource === "chene") priceVente = quantity * 9;
            else if (ressource === "wood") priceVente = quantity * 5;

            economyConfig.money += priceVente;
            memberConsumables[ressource] -= quantity;
            await editMembers(interaction.guild!.id, interaction.user.id, memberConfig);
            await editEconomy(interaction.guild!.id, interaction.user.id, economyConfig);

            return interaction.replySuccessMessage(client, language("SUCCESS")
                //@ts-ignore
                .replace('%quantity%', quantity).replace('%emoji%', client.getEmoji(EMOJIS[ressource]))
                .replace('%price%', priceVente).replace('%money%', money), false)

            break;
        case 'calcinv':
            return interaction.reply(language("CONTENT").replace('%emoji%', bag).replace('%price%', price).replace('%money%', money))
            break;
        default:
            return interaction.replyErrorMessage(client, language("DEFAULT").replace('%subcommand%', interaction.options.getSubcommand()), true)
    }

};

export const slash = {
    data: {
        name: "sale",
        description: "Command sale.",
        category: "Roleplay",
        permissions: ["SEND_MESSAGES"],
        options: [
            {
                name: "table",
                description: "Allows you to see the table of sales of resources and currencies.",
                type: "SUB_COMMAND",
            },
            {
                name: "all",
                description: "Allows you to sell all your inventory.",
                type: "SUB_COMMAND",
            },
            {
                name: "sale",
                description: "Allows you to sell a resource or a currency from your inventory.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "ressource",
                        description: "Which resource/currency would you like to send?",
                        type: "STRING",
                        required: true,
                        choices: [
                            {name: "Salmon", value: "salmon"},
                            {name: "Cantaril", value: "cantaril"},
                            {name: "Iron", value: "iron"},
                            {name: "Crystal", value: "crystal"},
                            {name: "Coal", value: "coal"},
                            {name: "Meat", value: "meat"},
                            {name: "Skin", value: "skin"},
                            {name: "Wood", value: "wood"},
                            {name: "Chêne", value: "chene"},
                            {name: "Coulemelle", value: "coulemelle"},
                            {name: "Girolle", value: "girolle"},
                        ]
                    },
                    {
                        name: "quantity",
                        description: "What is the quantity to be sold?",
                        type: "NUMBER",
                        required: true,
                    },
                ],
            },
            {
                name: "calcinv",
                description: "Allows you to calculate the value of your inventory.",
                type: "SUB_COMMAND",
            }
        ],
        defaultPermission: false
    }
}