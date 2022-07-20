import {BernardClient} from "../../../Librairie";
import {ButtonInteraction} from "discord.js";
import {find as findExchange} from "../../../Models/exchange";
import {EMOJIS} from "../../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    if (interaction.customId.split('-')[1] !== interaction.user.id)
        return interaction.replyErrorMessage(client, language("MEMBER_ERROR"), true);

    let requestMember = interaction.customId.substring(16, 34);
    let member = await interaction.guild!.members.fetch(requestMember);

    let exchangeConfig: any = await findExchange(interaction.guild!.id, member.id);
    if (!exchangeConfig) return interaction.replyErrorMessage(client, language("EXCHANGE_NOTEXIST"), true);

    await interaction.update({
        content: language("SUCCESS_CONTENT").replace('%emoji%', client.getEmoji(EMOJIS.check))
            .replace('%user%', interaction.user).replace('%requestUser%', member),
        components: []
    });

    return exchangeConfig.delete();


};

export const button = {
    data: {
        name: "refusedExchange",
        filepath: "Interactions/Buttons/Exchange/refusedExchangeButtonData",
    }
}