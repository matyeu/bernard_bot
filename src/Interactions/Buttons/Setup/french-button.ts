import {BernardClient} from "../../../Librairie";
import {ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../../config";
import {find, edit} from "../../../Models/guild";

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    if (interaction.user.id !== interaction.guild!.ownerId)
        return interaction.replyErrorMessage(client, language("OWNER_ERROR").replace('%server%', interaction.guild!.name), true);

    const embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: language("AUTHOR").replace('%bot%', client.user!.username)})
        .setDescription(language("LANGUAGE_CURRENT"))
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})});

    let buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`french`)
                .setEmoji("π«π·")
                .setLabel(language("FRENCH"))
                .setDisabled(true)
                .setStyle("PRIMARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`english`)
                .setEmoji("πΊπΈ")
                .setLabel(language("ENGLISH"))
                .setDisabled(false)
                .setStyle("PRIMARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`global`)
                .setEmoji(EMOJIS.xp)
                .setStyle("SECONDARY"))


    await interaction.update({embeds: [embed], components: [buttons]}).then(async () => {
        await interaction.followUp({content: language("CONTENT").replace('%emoji%', client.getEmoji(EMOJIS.check))}).then(async () => {
            let guildConfig: any = await find(interaction.guild!.id);
            guildConfig.language = "fr-FR";
            return edit(interaction.guild!.id, guildConfig);
        });
    });


};

export const button = {
    data: {
        name: "french",
        filepath: "Interactions/Buttons/Setup/frenchButtonData",
    }
}