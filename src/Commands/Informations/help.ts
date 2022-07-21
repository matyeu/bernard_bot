import {CommandInteraction, MessageActionRow, MessageEmbed, MessageSelectMenu} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../config";
import {BernardClient} from "../../Librairie";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any ) {

    const embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setTitle(language("TITLE"))
        .setDescription(`${language("DESCRIPTION")} ${interaction.client.user?.username}.`)
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true})})

    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
            .setCustomId("selectHelp")
            .setPlaceholder(language("PLACEHOLDER"))
            .addOptions([
                {
                    label: language("LABEL_GENERAL"),
                    description: language("DESCRIPTION_GENERAL"),
                    emoji: "🎈",
                    value: "general",
                },
                {
                    label: language("LABEL_ROLEPLAY"),
                    description: language("DESCRIPTION_ROLEPLAY"),
                    emoji: EMOJIS.roleplay,
                    value: "roleplay"
                },
                {
                    label: language("LABEL_LINK"),
                    description: language("DESCRIPTION_GENERAL"),
                    emoji: "🔗",
                    value: "link",
                },
            ])
    );

    await interaction.reply({embeds: [embed], components: [row]})

}

exports.slash = {
    data: {
        name: "help",
        description: "Command help",
        category: "Informations",
        permissions: ["SEND_MESSAGES"],
    }
};

