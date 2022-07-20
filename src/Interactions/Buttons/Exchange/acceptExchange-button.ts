import {BernardClient} from "../../../Librairie";
import {ButtonInteraction} from "discord.js";
import {find as findExchange} from "../../../Models/exchange";
import {find as findMembers, edit as editMembers} from "../../../Models/roleplay";
import {find as findEconomy, edit as editEconomy} from "../../../Models/economy";
import {EMOJIS} from "../../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    if (interaction.customId.split('-')[1] !== interaction.user.id)
        return interaction.replyErrorMessage(client, language("MEMBER_ERROR"), true);

    let requestMember = interaction.customId.substring(15, 33)
    let member = await interaction.guild!.members.fetch(requestMember);

    let exchangeConfig: any = await findExchange(interaction.guild!.id, member.id);
    if (!exchangeConfig) return interaction.replyErrorMessage(client, language("EXCHANGE_NOTEXIST"), true);

    let memberConfig: any = await findMembers(interaction.guild!.id, member.id);
    let memberConsumables = memberConfig.inventory.consumables;
    let economyConfig: any = await findEconomy(interaction.guild!.id, member.id);

    let memberToExchangeConfig: any = await findMembers(interaction.guild!.id, interaction.user.id);
    let memberToExchangeConsumables = memberToExchangeConfig.inventory.consumables;
    let economyToExchangeConfig: any = await findEconomy(interaction.guild!.id, interaction.user.id);

    memberConsumables[exchangeConfig.item] += exchangeConfig.quantity;
    economyConfig.money -= exchangeConfig.money;

    memberToExchangeConsumables[exchangeConfig.item] -= exchangeConfig.quantity;
    economyToExchangeConfig.money += exchangeConfig.money;

    await editMembers(interaction.guild!.id, member.id, memberConfig);
    await editEconomy(interaction.guild!.id, member.id, economyConfig);

    await editMembers(interaction.guild!.id, interaction.user.id, memberToExchangeConfig);
    await editEconomy(interaction.guild!.id, interaction.user.id, economyToExchangeConfig);

    await interaction.update({
        content: language("SUCCESS_CONTENT").replace('%emoji%', client.getEmoji(EMOJIS.check))
            .replace('%user%', interaction.user).replace('%requestUser%', member),
        components: []
    });

    return exchangeConfig.delete();


};

export const button = {
    data: {
        name: "acceptExchange",
        filepath: "Interactions/Buttons/Exchange/acceptExchangeButtonData",
    }
}