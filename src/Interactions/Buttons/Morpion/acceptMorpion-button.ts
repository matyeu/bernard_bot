import {BernardClient} from "../../../Librairie";
import {ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";
import {edit, find} from "../../../Models/morpion";
import {EMBED_GENERAL} from "../../../config";

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    if (interaction.customId.split(':')[1] === interaction.user.id)
        return interaction.replyErrorMessage(client, language("ERROR_YOURSELF"), true)

    let button = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`acceptMorpion`)
                .setEmoji('🎮')
                .setLabel(language("LABEL_JOIN"))
                .setStyle("SECONDARY")
                .setDisabled(true)

        )

    await interaction.update({components: [button]})

    let requestGameUser = interaction.message.content.substring(7, 25)
    let member = await interaction.guild!.members.fetch(requestGameUser)
    let morpionConfig: any = await find(interaction.guild!.id, member.user.id);

    morpionConfig.userID_2 = interaction.user.id;
    morpionConfig.grid = [
        ["?", "?", "?"],
        ["?", "?", "?"],
        ["?", "?", "?"]
    ]

    let players = [member.user.id, interaction.user.id];
    let firstPlayer = players[Math.floor(Math.random() * players.length)];
    morpionConfig.firstPlayer = firstPlayer;
    morpionConfig.currentPlayer = firstPlayer;

    await edit(interaction.guild!.id, member.id, morpionConfig);

    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setDescription(language("CONTENT_START").replace('%member1%', member)
            .replace('%member2%', interaction.user).replace('%firstPlayer%', firstPlayer))

    let buttonsTop = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`boxTopLeft:${member.user.id}-${interaction.user.id}`)
                .setEmoji("❔")
                .setStyle("SECONDARY")

        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxTopCenter:${member.user.id}-${interaction.user.id}`)
                .setEmoji("❔")
                .setStyle("SECONDARY")

        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxTopRight:${member.user.id}-${interaction.user.id}`)
                .setEmoji("❔")
                .setStyle("SECONDARY")

        )
    let buttonsCenter = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`boxCenterLeft:${member.user.id}-${interaction.user.id}`)
                .setEmoji("❔")
                .setStyle("SECONDARY")

        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxCenterCenter:${member.user.id}-${interaction.user.id}`)
                .setEmoji("❔")
                .setStyle("SECONDARY")

        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxCenterRight:${member.user.id}-${interaction.user.id}`)
                .setEmoji("❔")
                .setStyle("SECONDARY")

        )

    let buttonsBottom = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`boxBottomLeft:${member.user.id}-${interaction.user.id}`)
                .setEmoji("❔")
                .setStyle("SECONDARY")

        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxBottomCenter:${member.user.id}-${interaction.user.id}`)
                .setEmoji("❔")
                .setStyle("SECONDARY")

        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxBottomRight:${member.user.id}-${interaction.user.id}`)
                .setEmoji("❔")
                .setStyle("SECONDARY")

        )

    let buttonsUtil = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`exitMorpion:${member.user.id}-${interaction.user.id}`)
                .setEmoji("🚪")
                .setStyle("SECONDARY")

        )
        .addComponents(
            new MessageButton()
                .setCustomId(`abandonmentMorpion:${member.user.id}-${interaction.user.id}`)
                .setEmoji("🏳")
                .setStyle("SECONDARY")

        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxEmpty`)
                .setEmoji("➖")
                .setStyle("SECONDARY")
                .setDisabled(true)

        )

    return interaction.followUp({embeds: [embed], components: [buttonsTop, buttonsCenter, buttonsBottom, buttonsUtil]})

};

export const button = {
    data: {
        name: "acceptMorpion",
        filepath: "Interactions/Buttons/Morpion/acceptMorpionButtonData",
    }
}