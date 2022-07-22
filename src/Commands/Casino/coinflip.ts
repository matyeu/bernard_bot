import {BernardClient} from "../../Librairie";
import {
    CommandInteraction,
    Message,
    MessageActionRow,
    MessageButton,
    MessageEmbed
} from "discord.js";
import {edit, find} from "../../Models/economy";
import {EMBED_ERROR, EMBED_GENERAL, EMBED_SUCCESS, EMOJIS, FOOTER_CASINO, IMAGES} from "../../config";


export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let bet = interaction.options.getNumber('bet')!;
    let casinoConfig: any = await find(interaction.guild!.id, interaction.user.id);

    if (casinoConfig.money < bet || bet === 0)
        return interaction.replyErrorMessage(client, language("BET_ERROR_NOTHAVE"), true);

    if (bet > 500)
        return interaction.replyErrorMessage(client, language("BET_ERROR_UP"), true);

    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setTitle(language("TITLE"))
        .setDescription(language("DESCRIPTION").replace('%user%', interaction.user)
            .replace('%bet%', bet).replace('%emoji%', client.getEmoji(EMOJIS.money)))
        .setTimestamp()
        .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL({dynamic: true})});

    let buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`face:${interaction.user.id}`)
                .setEmoji(EMOJIS.face)
                .setLabel("FACE")
                .setStyle("SECONDARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`${language("LABEL_TAIL").toLowerCase()}:${interaction.user.id}`)
                .setEmoji(EMOJIS.tail)
                .setLabel(language("LABEL_TAIL"))
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
                .setCustomId(`face:${interaction.user.id}`)
                .setEmoji(EMOJIS.face)
                .setLabel("FACE")
                .setDisabled(true)
                .setStyle("SECONDARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`${language("LABEL_TAIL").toLowerCase()}:${interaction.user.id}`)
                .setEmoji(EMOJIS.tail)
                .setLabel(language("LABEL_TAIL"))
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

    const collector = message.createMessageComponentCollector({
        filter: () => true,
        componentType: 'BUTTON',
        idle: 60000
    });

    collector.on('collect', async inter => {

        if (inter.customId.split(':')[1] !== inter.user.id)
            return inter.replyErrorMessage(client, language("BUTTON_ERROR"), true);

        if (inter.customId.split(':')[0] === 'cashout') {
            if (bet === betCurrent) return inter.replyErrorMessage(client, language("CASHOUT_ERROR"), true);

            casinoConfig.money += betCurrent;
            await edit(interaction.guild!.id, interaction.user.id, casinoConfig);

            embed.setColor(EMBED_SUCCESS)
            embed.setDescription(language("USER_WIN").replace('%user%', inter.user).replace('%bet%', betCurrent)
                .replace('%emoji%', client.getEmoji(EMOJIS.money)));
            return inter.update({embeds: [embed], components: [buttonsDisabled]});
        }

        let choice = ['face', language("LABEL_TAIL").toLowerCase()];
        let choiceRandom = choice[Math.floor(Math.random() * choice.length)].toLowerCase();
        let choiceUser = inter.customId.split(':')[0];

        let messageEmbed = new MessageEmbed()
            .setColor(EMBED_GENERAL)
            .setImage(choiceRandom === language("LABEL_TAIL").toLowerCase() ? IMAGES.coinflip_tail : IMAGES.coinflip_face)
            .setTimestamp()
            .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL({dynamic: true})});

        if (choiceRandom === choiceUser) {
            betCurrent = bet * round;
            await inter.update({embeds: [messageEmbed], components: []});

            setTimeout(async () => {
                let messageWin = embed.setDescription(language("EMBED_WIN").replace('%user%', inter.user).replace('%bet%', betCurrent)
                    .replace('%result%', choiceRandom).replace('%emoji%', client.getEmoji(EMOJIS.money)))
                await message.edit({embeds: [messageWin], components: [buttons]});
                return round++;
            }, 4100)
        } else {
            await inter.update({embeds: [messageEmbed], components: []});
            casinoConfig.money -= betCurrent;
            await edit(interaction.guild!.id, interaction.user.id, casinoConfig);

            setTimeout(async () => {
                let messageLost = embed.setColor(EMBED_ERROR)
                embed.setDescription(language("EMBED_LOST").replace('%user%', inter.user).replace('%bet%', betCurrent)
                    .replace('%result%', choiceRandom).replace('%emoji%', client.getEmoji(EMOJIS.money)))
                return message.edit({embeds: [messageLost], components: [buttonsDisabled]});
            }, 4100)
        }

    });

    collector.on('end', async () => {
        await message.edit({components: [buttonsDisabled]});
    });
};

export const slash = {
    data: {
        name: "coinflip",
        description: "Allows you to play coinflip.",
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