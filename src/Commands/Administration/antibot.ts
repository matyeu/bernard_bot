import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {find, edit} from "../../Models/guild";
import {EMBED_ERROR, EMBED_SUCCESS, FOOTER} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let guildConfig: any = await find(interaction.guild!.id);
    let isActivated = guildConfig.modules.antibot;

    guildConfig.modules.antibot = !isActivated;
    await edit(interaction.guild!.id, guildConfig);

    const embed = new MessageEmbed()
        .setColor(isActivated ? EMBED_ERROR : EMBED_SUCCESS)
        .setTitle(`Antibot ${isActivated ? 'OFF' : 'ON'}`)
        .setDescription(language("DESCRIPTION").replace('%state%', isActivated ? 'ON' : 'OFF'))
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

    await interaction.reply({embeds: [embed]})
};

export const slash = {
    data: {
        name: "antibot",
        description: "Allow or Deny the addition of bot",
        category: "Administration",
        permissions: ["ADMINISTRATOR"],
        defaultPermission: false,
    }
}