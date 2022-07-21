import {BernardClient} from "../../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../../config";
import {find as findGuild} from "../../../Models/guild";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let guildConfig: any = await findGuild(interaction.guild!.id);
    let choice = interaction.options.getString("choice")!;
    let shop = require(`../../../../assets/Json/Shop/${choice}.json`);

    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setTitle(language("TITLE").replace('%emoji%', client.getEmoji(EMOJIS.star)).replace('%shop%', language(choice.toUpperCase())))
        .setDescription(language("DESCRIPTION")
            .replace('%shop%',
                guildConfig.language === "fr-FR" ?
                    shop.map((e: { name_fr: string, icon: string, id: string; }) => `${e.icon} ${e.name_fr} - **ID** : \`${e.id}\``).join('** | **')
                    : shop.map((e: { name_en: string, icon: string, id: string; }) => `${e.icon} ${e.name_en} - **ID** : \`${e.id}\``).join('** | **')))
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: client.user?.displayAvatarURL({dynamic: true})});

    return interaction.reply({embeds: [embed]})

}

export const slash = {
    data: {
        name: "shop",
        description: "Allows to see the store.",
        category: "Roleplay",
        permissions: ["SEND_MESSAGES"],
        options: [
            {
                name: "choice",
                description: "Which category would you like to see?",
                type: "STRING",
                required: true,
                choices: [
                    {name: "Equipments", value: "equipments"},
                    {name: "Materials", value: "materials"},
                    {name: "Foods", value: "foods"},
                ],
            },
        ],
        roleplay: true,
        defaultPermission: false
    }
}