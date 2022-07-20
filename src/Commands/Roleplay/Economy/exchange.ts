import {BernardClient} from "../../../Librairie";
import {CommandInteraction, MessageActionRow, MessageButton} from "discord.js";
import {create as createExchange, find as findExchange} from "../../../Models/exchange";
import {find as findMembers} from "../../../Models/roleplay";
import {find as findEconomy} from "../../../Models/economy";
import {EMOJIS} from "../../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let exchangeConfig: any = await findExchange(interaction.guild!.id, interaction.user.id);

    let userOption = interaction.options.getString("user");
    const userToExchange = userOption!.replace("<@!", "").replace(">", "");
    const memberToExchange = interaction.guild?.members.cache.get(userToExchange.replace(/ /g, ""))!;

    let economyConfig: any = await findEconomy(interaction.guild!.id, interaction.user.id);

    if (!memberToExchange) return interaction.replyErrorMessage(client, language("MEMBER_ERROR"), true);

    let memberToExchangeConfig: any = await findMembers(interaction.guild!.id, memberToExchange.id);
    let memberToExchangeConsumables = memberToExchangeConfig.inventory.consumables;

    if (!memberToExchangeConfig) return interaction.replyErrorMessage(client,
        language("ACCOUNT_UNDEFINED").replace('%user%',`${memberToExchange.displayName}#${memberToExchange.user.discriminator}`), true);

    let item = interaction.options.getString('money')!;
    let quantity = interaction.options.getNumber('desired_quantity')!;
    let money = interaction.options.getNumber('sent_money')!;

    if (economyConfig.money < money)
        return interaction.replyErrorMessage(client, language("QUANTITY_ERROR_NOTHAVE").replace('%quantity%', money - economyConfig.money )
            .replace('%emoji%', client.getEmoji(EMOJIS.money)), true);

    if (memberToExchangeConsumables[item] < quantity)
        return interaction.replyErrorMessage(client, language("USER_ERROR_NOTHAVE")
            //@ts-ignore
            .replace('%quantity%', quantity - memberToExchangeConsumables[item]).replace('%emoji%', client.getEmoji(EMOJIS[item]))
            .replace('%user%', memberToExchange), true);

    await interaction.reply({
        content: language("SUCCESS_CONTENT").replace('%emoji%', client.getEmoji(EMOJIS.exchange)), ephemeral: true});

    let buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`acceptExchange:${interaction.user.id}-${memberToExchange.id}`)
                .setLabel(language("ACCEPT"))
                .setStyle("PRIMARY")
        )
        .addComponents(
            new MessageButton()
                .setCustomId(`refusedExchange:${interaction.user.id}-${memberToExchange.id}`)
                .setLabel(language("REFUSED"))
                .setStyle("DANGER")
        )

    return interaction.channel?.send({content: language("EXCHANGE_CONTENT")
        .replace('%emoji%', client.getEmoji(EMOJIS.exchange)
        ).replace('%userToExchange%', memberToExchange)
        //@ts-ignore
        .replace('%user%', interaction.user).replace('%emoji%', client.getEmoji(EMOJIS[item])).replace('%quantity%', quantity)
            .replace('%money%', money).replace('%moneyEmoji%', client.getEmoji(EMOJIS.money)),
        components: [buttons]}).then(async (msg) => {
        if (!exchangeConfig) await createExchange(interaction.guild!.id, interaction.user.id, memberToExchange.id, item, quantity, money)
            .then(c => {setTimeout(async () => {
                await msg.delete()
                c.delete()}, 20000)});
    });

};

export const slash = {
    data: {
        name: "exchange",
        description: "Allows you to make a safe exchange.",
        category: "Roleplay",
        permissions: ["SEND_MESSAGES"],
        options: [
            {
                name: "user",
                description: "Which user do you want to exchange?",
                type: "STRING",
                required: true,
            },
            {
                name: "money",
                description: "What is the currency involved in the exchange?",
                type: "STRING",
                required: true,
                choices: [
                    {name: "Spinelle", value: "spinelle"},
                ]
            },
            {
                name: "desired_quantity",
                description: "What is the quantity you wish to receive for the desired currency?",
                type: "NUMBER",
                required: true,
            },
            {
                name: "sent_money",
                description: "How much money would you like to send for this exchange?",
                type: "NUMBER",
                required: true,
            }
        ],
        defaultPermission: false
    }
}