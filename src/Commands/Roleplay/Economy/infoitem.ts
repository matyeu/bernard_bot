import {BernardClient} from "../../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {EMOJIS, FOOTER} from "../../../config";
import {find as findGuild} from "../../../Models/guild";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let guildConfig: any = await findGuild(interaction.guild!.id);

    let idArticle = interaction.options.getNumber('id')!;

    let shop;
    if (idArticle >= 1 && idArticle <= 6) shop = require(`../../../../assets/Json/Shop/materials.json`)
    else if (idArticle >= 7 && idArticle <= 12) shop = require(`../../../../assets/Json/Shop/equipments.json`)
    else if (idArticle >= 13 && idArticle <= 18) shop = require(`../../../../assets/Json/Shop/foods.json`)
    else return interaction.replyErrorMessage(client, language("ERROR_SHOP"), true);

    let position = shop.map((e: { id: number; }) => e.id).indexOf(idArticle);
    const item = shop[position];

    const embed = new MessageEmbed()
        .setColor(item.color)
        .setTitle(`${item.icon} | ${guildConfig.language === "fr-FR" ? item.name_fr : item.name_en}`)
    if (guildConfig.language === "fr-FR" && item.description_fr) embed.setDescription(item.description_fr)
    else if (item.description_en) embed.setDescription(item.description_en)
    embed.addFields(
        {
            name: 'ID',
            value: `\`${item.id}\``,
            inline: false
        },
        {
            name: language("ADDFIELD_NAME").replace('%emoji%', client.getEmoji(EMOJIS.salary)),
            value: language("ADDFIELD_VALUE").replace('%price%', item.price).replace('%emoji%', client.getEmoji(EMOJIS.money)),
            inline: false
        },
    )
        .setFooter({text: language("FOOTER").replace('%item%', item.id)});

    return interaction.reply({embeds: [embed]});


}

export const slash = {
    data: {
        name: "infoitem",
        description: "Allows you to obtain information on an item.",
        category: "Roleplay",
        permissions: ["SEND_MESSAGES"],
        options: [
            {
                name: "id",
                description: "What is the id of the item? Refer to the store",
                type: "NUMBER",
                required: true,
            },
        ],
        roleplay: true,
        defaultPermission: false
    }
}