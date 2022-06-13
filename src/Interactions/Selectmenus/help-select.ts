import {BernardClient} from "../../Librairie";
import {MessageEmbed, SelectMenuInteraction} from "discord.js";
import {EMBED_GENERAL, FOOTER, LINK_DISCORD, LINK_GITHUB} from "../../config";
import {readdirSync} from "fs";

export default async function (client: BernardClient, interaction: SelectMenuInteraction) {

    const embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: `❓ Getting help`})
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

    await interaction.update({content: null}).then(() => {
        switch (interaction.values[0]) {
            case 'general':
                const commandFolder = readdirSync('./src/Commands');
                embed.setTitle(`🎈 The list of orders 🎈 `)
                for (const category of commandFolder) {
                    if (category === "Development") continue;
                    embed.addFields({
                        name: `${category}`,
                        value: `\`${client.slashCommands.filter(cmd => cmd.slash.data.category == category).map(cmd => cmd.slash.data.name).join(',')}\``
                    })
                }
                break;
            case 'link':
                embed.setDescription(`
**• Link support :** ${LINK_DISCORD}
**• Link github :** ${LINK_GITHUB}
                `)
                break;
            default:
                interaction.reply({content: `**This value cannot be found !**`, ephemeral: true})
        };
    });
    return interaction.followUp({embeds: [embed]})

};

export const select = {
    data: {
        name: "selectHelp",
    }
}