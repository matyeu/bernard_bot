import {BernardClient} from "../../Librairie";
import {CommandInteraction, Message, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";
import {find, edit} from "../../Models/economy";
import {EMBED_CLOSE, EMBED_ERROR, EMBED_GENERAL, EMBED_SUCCESS, EMOJIS, FOOTER_CASINO} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let casinoConfig: any = await find(interaction.guild!.id, interaction.user.id);
    let bet = interaction.options.getNumber('bet')!;

    if (casinoConfig.money < bet)
        return interaction.replyErrorMessage(client, language("BET_ERROR_NOTHAVE"), true);

    if (bet > 500)
        return interaction.replyErrorMessage(client, language("BET_ERROR_UP"), true);

    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setDescription(language("DESCRIPTION").replace('%user%', interaction.user).replace('%bet%', bet)
            .replace('%emoji%', client.getEmoji(EMOJIS.money)))
        .setTimestamp()
        .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL({dynamic: true})});

    let buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`${language("LABEL_ROCK")}:${interaction.user.id}`)
                .setEmoji("🪨")
                .setLabel(language("LABEL_ROCK"))
                .setStyle("SECONDARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`${language("LABEL_PAPER")}:${interaction.user.id}`)
                .setEmoji("📄")
                .setLabel(language("LABEL_PAPER"))
                .setStyle("SECONDARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`${language("LABEL_SCISSORS")}:${interaction.user.id}`)
                .setEmoji("✂")
                .setLabel(language("LABEL_SCISSORS"))
                .setStyle("SECONDARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`cashout:${interaction.user.id}`)
                .setEmoji("💵")
                .setLabel("CASHOUT")
                .setStyle("SUCCESS"));

    let buttonsDisabled = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`rock:${interaction.user.id}`)
                .setEmoji("🪨")
                .setLabel(language("LABEL_ROCK"))
                .setDisabled(true)
                .setStyle("SECONDARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`paper:${interaction.user.id}`)
                .setEmoji("📄")
                .setLabel(language("LABEL_PAPER"))
                .setDisabled(true)
                .setStyle("SECONDARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`scissors:${interaction.user.id}`)
                .setEmoji("✂")
                .setLabel(language("LABEL_SCISSORS"))
                .setDisabled(true)
                .setStyle("SECONDARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`cashout:${interaction.user.id}`)
                .setEmoji("💵")
                .setLabel("CASHOUT")
                .setDisabled(true)
                .setStyle("SUCCESS"));

    await interaction.replySuccessMessage(client, `Let's play!`, false);
    let message = <Message>await interaction.editReply({content: null, embeds: [embed], components: [buttons]});

    let betCurrent = bet;
    let round = 2;

    const collector = message.createMessageComponentCollector({ filter: ()=> true, componentType: 'BUTTON', idle: 60000 });

    collector.on('collect', async inter => {
        if (inter.customId.split(':')[1] !== inter.user.id)
            return inter.replyErrorMessage(client, language("BUTTON_ERROR"), true);

        if (inter.customId.split(':')[0] === 'cashout') {
            if (bet === betCurrent) return inter.replyErrorMessage(client, language("CASHOUT_ERROR"), true);

            casinoConfig.money += betCurrent;
            await edit(interaction.guild!.id, interaction.user.id, casinoConfig);
            embed.setColor(EMBED_SUCCESS)
            embed.setDescription(language("USER_WIN").replace('%bet%', betCurrent).replace('%emoji%', client.getEmoji(EMOJIS.money)))
            return inter.update({embeds: [embed], components: [buttonsDisabled]});
        }

        let CHOICE_RPS = [language("LABEL_ROCK"), language("LABEL_PAPER"), language("LABEL_SCISSORS")];
        let choiceBot = CHOICE_RPS[Math.floor(Math.random() * CHOICE_RPS.length)].toLowerCase();
        let choiceUser = inter.customId.split(':')[0].toLowerCase();

        // equality
        if (choiceUser === choiceBot) {
            embed.setColor(EMBED_CLOSE)
            embed.setDescription(language("EQUALITY").replace('%user%', inter.user).replace('%bot%', client.user)
                .replace('%choiceBot%', choiceBot));
            return inter.update({embeds: [embed], components: [buttonsDisabled]});
        }
        // user wins
        else if (choiceUser === language("LABEL_ROCK").toLowerCase() && choiceBot === language("LABEL_SCISSORS").toLowerCase()
            || choiceUser === language("LABEL_PAPER").toLowerCase() && choiceBot === language("LABEL_ROCK").toLowerCase()
            || choiceUser === language("LABEL_SCISSORS").toLowerCase() && choiceBot === language("LABEL_PAPER").toLowerCase()) {
            betCurrent = bet * round;
            embed.setDescription(language("DESCRIPTION").replace('%user%', inter.user).replace('%bet%', betCurrent)
                .replace('%emoji%', client.getEmoji(EMOJIS.money)))
            round++;
            return inter.update({embeds: [embed]});
        }
        // bot wins
        else {
            casinoConfig.money -= betCurrent;
            await edit(interaction.guild!.id, interaction.user.id, casinoConfig);
            embed.setColor(EMBED_ERROR)
            embed.setDescription(language("BOT_WIN").replace('%user%', inter.user).replace('%bot%', client.user)
                .replace('%choiceBot%', choiceBot).replace('%lost%', betCurrent).replace('%emoji%', client.getEmoji(EMOJIS.money)))
            return inter.update({embeds: [embed], components: [buttonsDisabled]});
        }
    });

    collector.on('end', async () => {
        await message.edit({components: [buttonsDisabled]});
    });





};

export const slash = {
    data: {
        name: "rps",
        description: "Allows you to play rps.",
        category: "Casino",
        permissions: ["SEND_MESSAGES"],
        options: [
            {
                name: "bet",
                type: "NUMBER",
                description: "The amount of money you want to bet.",
                required: true,
            }
        ],
        defaultPermission: false
    }
}