import {BernardClient} from "../../../../../Librairie";
import {ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";
import {EMBED_GENERAL, EMOJIS} from "../../../../../config";
import {find, edit} from "../../../../../Models/morpion";

export default async function (client: BernardClient, interaction: ButtonInteraction) {

    let interactionTcheck = interaction.customId;
    let interactionUserId = interaction.user.id;

    let error = client.getEmoji(EMOJIS.error);
    if (interactionTcheck.substring(33, 15) !== interactionUserId && interactionTcheck.split('-')[1] !== interactionUserId)
        return interaction.reply({content: `${error} | You are **not part** of the game!`, ephemeral: true});

    let requestGameUser = interactionTcheck.substring(33, 15);
    let member = await interaction.guild!.members.fetch(requestGameUser);

    let morpionConfig: any = await find(interaction.guild!.id, member.user.id);
    let gridBox = morpionConfig.grid;

    if (morpionConfig.currentPlayer !== interactionUserId)
        return interaction.reply({content: `${error} | It's **not your turn**!`, ephemeral: true});

    morpionConfig.currentPlayer = interactionUserId === morpionConfig.userID_1 ? morpionConfig.userID_2 : morpionConfig.userID_1;
    gridBox[1][2] = interactionUserId === morpionConfig.firstPlayer ? "⭕" : "❌";
    morpionConfig.boxChecked += 1;
    await edit(member.guild!.id, member.user.id, morpionConfig);

    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setDescription(`**<@${morpionConfig.userID_1}> vs <@${morpionConfig.userID_2}>\n\n❗️ <@${morpionConfig.currentPlayer}> must play with : ${interactionUserId !== morpionConfig.firstPlayer ? "⭕" : "❌"}**`)

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
                .setEmoji(`${gridBox[1][1] === "?" ? "❔" : gridBox[1][1]}`)
                .setStyle(`${gridBox[1][1] === "?" ? "SECONDARY" : "PRIMARY"}`)
                .setDisabled(gridBox[1][1] === "?" ? false : true)
        )
        .addComponents(
            new MessageButton()
                .setCustomId(`boxCenterRight:${morpionConfig.userID_1}-${morpionConfig.userID_2}`)
                .setEmoji(`${interactionUserId === morpionConfig.firstPlayer ? "⭕" : "❌"}`)
                .setStyle("PRIMARY")
                .setDisabled(true)
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

    let messageVictory = `❗️ | ${interaction.user} **won** the game against <@${interactionUserId === morpionConfig.userID_1 ? morpionConfig.userID_2 : morpionConfig.userID_1}>.`;

    if (gridBox[1][2] === gridBox[1][0] && gridBox[1][2] === gridBox[1][1]){
        await interaction.update({content: `${messageVictory}`, components: [], embeds: []})
        return morpionConfig.delete();
    }
    else if (gridBox[1][2] === gridBox[0][2] && gridBox[1][2] === gridBox[2][2]){
        await interaction.update({content: `${messageVictory}`, components: [], embeds: []})
        return morpionConfig.delete();
    }
    else if (morpionConfig.boxChecked === 9) {
        await interaction.update({content: `❗️ | The game between <@${morpionConfig.userID_1}> and <@${morpionConfig.userID_2}> is over : **Draw**`, components: [], embeds: []})
        return morpionConfig.delete();
    }

    await interaction.update({embeds: [embed], components: [buttonsTop, buttonsCenter, buttonsBottom, buttonsUtil]})
};

export const button = {
    data: {
        name: "boxCenterRight",
    }
}