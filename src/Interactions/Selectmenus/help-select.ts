import {BernardClient} from "../../Librairie";
import {MessageEmbed, SelectMenuInteraction} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER, LINK_DISCORD, LINK_GITHUB_BOT, LINK_GITHUB_SITE} from "../../config";
import {readdirSync} from "fs";

export default async function (client: BernardClient, interaction: SelectMenuInteraction, language: any) {

    const embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: language("AUTHOR")})
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

    await interaction.update({content: null}).then(() => {
        switch (interaction.values[0]) {
            case 'general':
                const commandFolder = readdirSync('./src/Commands');
                embed.setTitle(language("TITLE_GENERAL"));
                for (const category of commandFolder) {
                    if (category === "Development" || category === "Roleplay") continue;
                    embed.addFields({
                        name: `${category}`,
                        value: `\`${client.slashCommands.filter(cmd => cmd.slash.data.category == category).map(cmd => cmd.slash.data.name).join(',')}\``
                    })
                }
                break;
            case 'roleplay':
                embed.setTitle(language("TITLE_ROLEPLAY").replace('%emoji%', client.getEmoji(EMOJIS.roleplay))
                    .replace('%emoji%', client.getEmoji(EMOJIS.roleplay)));
                    embed.addFields({
                        name: `Roleplay`,
                        value: `\`${client.slashCommands.filter(cmd => cmd.slash.data.category == "Roleplay").map(cmd => cmd.slash.data.name).join(',')}\``
                    });
                break;
            case 'link':
                embed.setDescription(language("DESCRIPTION_LINK").replace("%discord%", LINK_DISCORD)
                    .replace("%bot%", LINK_GITHUB_BOT).replace("%site%", LINK_GITHUB_SITE));
                break;
            default:
                return interaction.editErrorMessage(client, language("DEFAULT").replace('%subcommand%', interaction.values[0]), true)
        }
        ;
    });
    return interaction.followUp({embeds: [embed]})

};

export const select = {
    data: {
        name: "selectHelp",
        filepath: "Interactions/Selectmenus/selectHelpData",
    }
}