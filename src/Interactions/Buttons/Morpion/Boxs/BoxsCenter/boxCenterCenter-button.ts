import {BernardClient} from "../../../../../Librairie";
import {ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";
import {EMBED_GENERAL} from "../../../../../config";
import {edit, find} from "../../../../../Models/morpion";

export default async function (client: BernardClient, interaction: ButtonInteraction, language: any) {

    let interactionTcheck = interaction.customId;
    let interactionUserId = interaction.user.id;

    if (interactionTcheck.substring(34, 16) !== interactionUserId && interactionTcheck.split('-')[1] !== interactionUserId)
        return interaction.replyErrorMessage(client, language("ERROR_GAME"), true);

    let requestGameUser = interactionTcheck.substring(34, 16);
    let member = await interaction.guild!.members.fetch(requestGameUser);

    let morpionConfig: any = await find(interaction.guild!.id, member.user.id);
    let gridBox = morpionConfig.grid;

    if (morpionConfig.currentPlayer !== interactionUserId)
        return interaction.replyErrorMessage(client, language("ERROR_TURN"), true)

    morpionConfig.currentPlayer = interactionUserId === morpionConfig.userID_1 ? morpionConfig.userID_2 : morpionConfig.userID_1;
    gridBox[1][1] = interactionUserId === morpionConfig.firstPlayer ? "⭕" : "❌";
    morpionConfig.boxChecked += 1;
    await edit(member.guild!.id, member.user.id, morpionConfig);

    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setDescription(language("DESCRIPTION").replace('%member1%', `<@${morpionConfig.userID_1}>`).replace('%member2%', `<@${morpionConfig.userID_2}>`)
            .replace('%currentPlayer%', `<@${morpionConfig.currentPlayer}>`).replace('%emoji%', interactionUserId !== morpionConfig.firstPlayer ? "⭕" : "❌"))

    let buttonsTop = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`boxTopLeft:${morpionConfig.userID_1}-${morpionConfig.userID_2}`)
                .setEmoji(`${gridBox[0][0] === "?" ? "❔" : gridBox[0][0]}`)
                .setStyle(`${gridBox[0][0] === "?" ? "SECONDARY" : "PRIMARY"}`)
                .setDisabled(gridBox[0][0] === "?" ? false : true)
        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxTopCenter:${morpionConfig.userID_1}-${morpionConfig.userID_2}`)
                .setEmoji(`${gridBox[0][1] === "?" ? "❔" : gridBox[0][1]}`)
                .setStyle(`${gridBox[0][1] === "?" ? "SECONDARY" : "PRIMARY"}`)
                .setDisabled(gridBox[0][1] === "?" ? false : true)
        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxTopRight:${morpionConfig.userID_1}-${morpionConfig.userID_2}`)
                .setEmoji(`${gridBox[0][2] === "?" ? "❔" : gridBox[0][2]}`)
                .setStyle(`${gridBox[0][2] === "?" ? "SECONDARY" : "PRIMARY"}`)
                .setDisabled(gridBox[0][2] === "?" ? false : true)
        )
    let buttonsCenter = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`boxCenterLeft:${morpionConfig.userID_1}-${morpionConfig.userID_2}`)
                .setEmoji(`${gridBox[1][0] === "?" ? "❔" : gridBox[1][0]}`)
                .setStyle(`${gridBox[1][0] === "?" ? "SECONDARY" : "PRIMARY"}`)
                .setDisabled(gridBox[1][0] === "?" ? false : true)
        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxCenterCenter:${morpionConfig.userID_1}-${morpionConfig.userID_2}`)
                .setEmoji(`${interactionUserId === morpionConfig.firstPlayer ? "⭕" : "❌"}`)
                .setStyle("PRIMARY")
                .setDisabled(true)
        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxCenterRight:${morpionConfig.userID_1}-${morpionConfig.userID_2}`)
                .setEmoji(`${gridBox[1][2] === "?" ? "❔" : gridBox[1][2]}`)
                .setStyle(`${gridBox[1][2] === "?" ? "SECONDARY" : "PRIMARY"}`)
                .setDisabled(gridBox[1][2] === "?" ? false : true)
        )

    let buttonsBottom = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`boxBottomLeft:${morpionConfig.userID_1}-${morpionConfig.userID_2}`)
                .setEmoji(`${gridBox[2][0] === "?" ? "❔" : gridBox[2][0]}`)
                .setStyle(`${gridBox[2][0] === "?" ? "SECONDARY" : "PRIMARY"}`)
                .setDisabled(gridBox[2][0] === "?" ? false : true)
        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxBottomCenter:${morpionConfig.userID_1}-${morpionConfig.userID_2}`)
                .setEmoji(`${gridBox[2][1] === "?" ? "❔" : gridBox[2][1]}`)
                .setStyle(`${gridBox[2][1] === "?" ? "SECONDARY" : "PRIMARY"}`)
                .setDisabled(gridBox[2][1] === "?" ? false : true)
        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxBottomRight:${morpionConfig.userID_1}-${morpionConfig.userID_2}`)
                .setEmoji(`${gridBox[2][2] === "?" ? "❔" : gridBox[2][2]}`)
                .setStyle(`${gridBox[2][2] === "?" ? "SECONDARY" : "PRIMARY"}`)
                .setDisabled(gridBox[2][2] === "?" ? false : true)
        )

    let buttonsUtil = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`exitMorpion:${morpionConfig.userID_1}-${morpionConfig.userID_2}`)
                .setEmoji("🚪")
                .setStyle("SECONDARY")
        )
        .addComponents(
            new MessageButton()
                .setCustomId(`abandonmentMorpion:${morpionConfig.userID_1}-${morpionConfig.userID_2}`)
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

    let messageVictory = language("CONTENT_VICTORY").replace('%memberWin%', interaction.user)
        .replace('%memberLost%', `<@${interactionUserId === morpionConfig.userID_1 ? morpionConfig.userID_2 : morpionConfig.userID_1}>`);

    if (gridBox[1][1] === gridBox[1][0] && gridBox[1][1] === gridBox[1][2]){
        await interaction.update({content: `${messageVictory}`, components: [], embeds: []})
        return morpionConfig.delete();
    }
    else if (gridBox[1][1] === gridBox[0][1] && gridBox[1][1] === gridBox[2][1]){
        await interaction.update({content: `${messageVictory}`, components: [], embeds: []})
        return morpionConfig.delete();
    }
    else if (morpionConfig.boxChecked === 9) {
        await interaction.update({content: language("CONTENT_BETWEEN")
                .replace('%member1%', `<@${morpionConfig.userID_1}>`).replace('%member2%', `<@${morpionConfig.userID_2}>`), components: [], embeds: []})
        return morpionConfig.delete();
    }

    await interaction.update({embeds: [embed], components: [buttonsTop, buttonsCenter, buttonsBottom, buttonsUtil]})
};

export const button = {
    data: {
        name: "boxCenterCenter",
        filepath: "Interactions/Buttons/Morpion/Boxs/boxsButtonData",
    }
}