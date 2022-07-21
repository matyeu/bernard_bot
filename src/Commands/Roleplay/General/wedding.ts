import {BernardClient} from "../../../Librairie";
import {CommandInteraction, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";
import {find as findMembers, edit as editMembers} from "../../../Models/roleplay";
import {find as findWedding, edit as editWedding} from "../../../Models/wedding";
import {find as findEconomy, edit as editEconomy} from "../../../Models/economy";
import {EMBED_GENERAL, EMOJIS} from "../../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let memberConfig: any = await findMembers(interaction.guild!.id, interaction.user!.id);
    let memberConsumables = memberConfig.inventory.consumables;
    let economyConfig: any = await findEconomy(interaction.guild!.id, interaction.user!.id);
    let getSubCommand = interaction.options.getSubcommand(false);

    if (getSubCommand !== "request" && !memberConfig.wedding.enabled)
        return interaction.replyErrorMessage(client, language("WEDDING_NOTFOUND"), true);

    let weddingConfig: any = await findWedding(interaction.guild!.id, interaction.user!.id, memberConfig.wedding.partner);

    switch (getSubCommand) {
        case "request":
            let userOption = interaction.options.getString("user");
            const userToWedding = userOption!.replace("<@!", "").replace(">", "");
            const memberToWedding = interaction.guild?.members.cache.get(userToWedding.replace(/ /g, ""))!;

            if (memberToWedding.id === interaction.user!.id)
                return interaction.replyErrorMessage(client, language("ERROR_YOURSELF"), true);

            if (!memberToWedding) return interaction.replyErrorMessage(client, language("MEMBER_ERROR"), true);
            let memberToWeddingConfig: any = await findMembers(interaction.guild!.id, memberToWedding.id);

            if (!memberToWeddingConfig)
                return interaction.replyErrorMessage(client, language("ACCOUNT_UNDEFINED").replace('%user%', memberToWedding), true);

            if (memberConfig.wedding.enabled && memberToWeddingConfig.wedding.enabled)
                return interaction.replyErrorMessage(client, language("WEDDING_ALREADY"), true);

            let buttons = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(`acceptWedding:${interaction.user.id}-${memberToWedding.id}`)
                        .setLabel(language("WEDDING_ACCEPT"))
                        .setStyle("PRIMARY")
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId(`refusedWedding:${interaction.user.id}-${memberToWedding.id}`)
                        .setLabel(language("WEDDING_REFUSED"))
                        .setStyle("DANGER")
                )

            await interaction.replySuccessMessage(client, language("SUCCESS_CONTENT"), true);

            return interaction.channel!.send({
                content: language("CONTENT_REQUEST").replace('%emoji%', client.getEmoji(EMOJIS.luxury))
                    .replace('%memberToWedding%', memberToWedding).replace('%memberRequest%', interaction.user),
                components: [buttons]
            }).then(message => {
                setTimeout(async () => {
                    await message.delete()
                }, 20000)
            });
            break;
        case 'operation':
            let type = interaction.options.getString('type')!;
            let money = interaction.options.getString('money')!;
            let quantity = interaction.options.getNumber('quantity')!;

            switch (type) {
                case 'retrait':
                    if (weddingConfig[money] < quantity) return interaction.replyErrorMessage(
                        client, language("ERROR_BANK_NOT_ENOUGH").replace('%quantity%', quantity), true);

                    weddingConfig[money] -= quantity;
                    if (money === "money") economyConfig.money += quantity;
                    else memberConsumables[money] += quantity;

                    weddingConfig[money] -= quantity;
                    await interaction.replySuccessMessage(client, language("SUCCESS_RETRAIT_CONTENT").replace('%quantity%', quantity)
                        //@ts-ignore
                        .replace('%emoji%', client.getEmoji(EMOJIS[money])), true);

                    break;
                case 'depot':
                    if (money === "money" && economyConfig.money < quantity && economyConfig.bank < quantity
                        || memberConsumables[money] < quantity) return interaction.replyErrorMessage(
                        client, language("ERROR_DEPOT_NOT_ENOUGH").replace('%quantity%', quantity), true);

                    if (money === "money") economyConfig.money -= quantity;
                    else memberConsumables[money] -= quantity;

                    weddingConfig[money] += quantity;
                    await interaction.replySuccessMessage(client, language("SUCCESS_DEPOT_CONTENT"), true);

                    break;
                default:
                    return interaction.replyErrorMessage(client, language("DEFAULT_TYPE").replace('%type%', type), true);
            }

            await editWedding(interaction.guild!.id, interaction.user.id, memberConfig.wedding.partner, weddingConfig);
            await editEconomy(interaction.guild!.id, interaction.user.id, economyConfig);

            break;
        case 'account':
            let moneyEmoji = client.getEmoji(EMOJIS.money),
                spinelleEmoji = client.getEmoji(EMOJIS.spinelle),
                rubyEmoji = client.getEmoji(EMOJIS.ruby),
                goldEmoji = client.getEmoji(EMOJIS.gold);

            let member1 = await interaction.guild!.members.fetch(weddingConfig.userID_1);
            let member2 = await interaction.guild!.members.fetch(weddingConfig.userID_2);

            let embed = new MessageEmbed()
                .setColor(EMBED_GENERAL)
                .setDescription(language("DESCRIPTION").replace('%member1%', member1.displayName)
                    .replace('%emoji%', client.getEmoji(EMOJIS.luxury)).replace('%member2%', member2.displayName))
                .addFields(
                    {name: language("ADDFIELD_MONEY").replace('%emoji%', moneyEmoji), value: `${weddingConfig.money}`, inline: true},
                    {name: language("ADDFIELD_RUBY").replace('%emoji%', rubyEmoji), value: `${weddingConfig.ruby}`, inline: true},
                    {name: language("ADDFIELD_GOLD").replace('%emoji%', goldEmoji), value: `${weddingConfig.gold}`, inline: true},
                    {name: language("ADDFIELD_SPINELLE").replace('%emoji%', spinelleEmoji), value: `${weddingConfig.spinelle}`, inline: true},)
                .setFooter({text: language("FOOTER").replace('%date%', weddingConfig.date)})

            return interaction.reply({embeds: [embed]});

            break;
        case 'divorce':
            let userPartner;
            if (weddingConfig.userID_1 === interaction.user.id) userPartner = weddingConfig.userID_2;
            else userPartner = weddingConfig.userID_1;

            let partnerConfig: any = await findMembers(interaction.guild!.id, userPartner);

            memberConfig.wedding.enabled = false;
            partnerConfig.wedding.enabled = false;

            memberConfig.wedding.partner = "";
            partnerConfig.wedding.partner = "";

            await editMembers(interaction.guild!.id, interaction.user.id, memberConfig);
            await editMembers(interaction.guild!.id, userPartner, partnerConfig);
            await weddingConfig.delete();

            await interaction.replySuccessMessage(client, language("SUCCESS_DIVORCE_CONTENT"), true);

            break;
        default:
            return interaction.replyErrorMessage(client, language("DEFAULT").replace('%subcommand%', getSubCommand), true);
    }


}

export const slash = {
    data: {
        name: "wedding",
        description: "Allows you to marry two people.",
        category: "Roleplay",
        permissions: ["SEND_MESSAGES"],
        options: [
            {
                name: "request",
                description: "Allows you to propose wedding.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "user",
                        description: "Who is the person to propose to?",
                        type: "STRING",
                        required: true
                    }
                ]
            },
            {
                name: "operation",
                description: "Allows you to make a withdrawal or deposit to the joint account.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "type",
                        description: "What type of operation would you like to do?",
                        type: "STRING",
                        required: true,
                        choices: [
                            {name: "Retrait", value: "retrait"},
                            {name: "Depot", value: "depot"}
                        ]
                    },
                    {
                        name: "money",
                        description: "What is the currency involved in this operation?",
                        type: "STRING",
                        required: true,
                        choices: [
                            {name: "Money", value: "money"},
                            {name: "Ruby", value: "ruby"},
                            {name: "Gold", value: "gold"},
                            {name: "Spinelle", value: "spinelle"},

                        ]
                    },
                    {
                        name: "quantity",
                        description: "What is the quantity?",
                        type: "NUMBER",
                        required: true
                    },
                ]
            },
            {
                name: "account",
                description: "Allows you to see the joint account.",
                type: "SUB_COMMAND",
            },
            {
                name: "divorce",
                description: "Allows you to divorce.",
                type: "SUB_COMMAND",
            }
        ],
        roleplay: true,
        defaultPermission: false
    }
}