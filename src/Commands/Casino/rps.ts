import {BernardClient} from "../../Librairie";
import {CommandInteraction, Message, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";
import {find, edit} from "../../Models/casino";
import {EMBED_CLOSE, EMBED_ERROR, EMBED_GENERAL, EMBED_SUCCESS, EMOJIS, FOOTER_CASINO} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let casinoConfig: any = await find(interaction.guild!.id, interaction.user.id);
    let bet = interaction.options.getNumber('bet')!;

    if (casinoConfig.money < bet)
        return interaction.replyErrorMessage(client, `You do **not have** enough coin!`, true);

    if (bet > 500)
        return interaction.replyErrorMessage(client, `**You can** bet up to **500** coins!`, true);

    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setDescription(`Hey ${interaction.user}!\n\nWhat are you goind to choose? *I already made my choice....🤔*\n\nYour BET: **${bet}**`)
        .setTimestamp()
        .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL({dynamic: true})});

    let buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`rock:${interaction.user.id}`)
                .setEmoji("🪨")
                .setLabel("ROCK")
                .setStyle("SECONDARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`paper:${interaction.user.id}`)
                .setEmoji("📄")
                .setLabel("PAPER")
                .setStyle("SECONDARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`scissors:${interaction.user.id}`)
                .setEmoji("✂")
                .setLabel("SCISSORS")
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
                .setLabel("ROCK")
                .setDisabled(true)
                .setStyle("SECONDARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`paper:${interaction.user.id}`)
                .setEmoji("📄")
                .setLabel("PAPER")
                .setDisabled(true)
                .setStyle("SECONDARY"))
        .addComponents(
            new MessageButton()
                .setCustomId(`scissors:${interaction.user.id}`)
                .setEmoji("✂")
                .setLabel("SCISSORS")
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
        let error = client.getEmoji(EMOJIS.error);
        if (inter.customId.split(':')[1] !== inter.user.id)
            return inter.reply({content: `${error} | You must be **the author** of this command to use this button`, ephemeral: true});

        if (inter.customId.split(':')[0] === 'cashout') {
            if (bet === betCurrent) return inter.reply({content: `${error} | **You must play at least 1 round** to withdraw money`, ephemeral: true})

            casinoConfig.money += betCurrent;
            await edit(interaction.guild!.id, interaction.user.id, casinoConfig);
            embed.setColor(EMBED_SUCCESS)
            embed.setDescription(`**You have withdrawn** ${betCurrent} coins!`)
            return inter.update({embeds: [embed], components: [buttonsDisabled]});
        }

        let CHOICE_RPS = ['ROCK', 'PAPER', 'SCISSORS'];
        let choiceBot = CHOICE_RPS[Math.floor(Math.random() * CHOICE_RPS.length)].toLowerCase();

        let choiceUser = "";
        if (inter.customId.startsWith('rock')) choiceUser = inter.customId.substring(4, 0).toLowerCase();
        if (inter.customId.startsWith('paper')) choiceUser = inter.customId.substring(5, 0).toLowerCase();
        if (inter.customId.startsWith('scissors')) choiceUser = inter.customId.substring(8, 0).toLowerCase();

        // equality
        if (choiceUser === choiceBot) {
            embed.setColor(EMBED_CLOSE)
            embed.setDescription(`${inter.user} has tied with ${client.user} : **${choiceBot}**`);
            return inter.update({embeds: [embed], components: []});
        }
        // user wins
        else if (choiceUser === 'rock' && choiceBot === 'scissors' || choiceUser === 'paper' && choiceBot === 'rock'
            || choiceUser === 'scissors' && choiceBot === 'paper') {
            betCurrent = bet * round;
            embed.setDescription(`Hey ${interaction.user}!\n\nWhat are you goind to choose? *I already made my choice....🤔*\n\nYour BET: **${betCurrent}**`)
            round++;
            return inter.update({embeds: [embed]});
        }
        // bot wins
        else {
            casinoConfig.money -= betCurrent;
            await edit(interaction.guild!.id, interaction.user.id, casinoConfig);
            embed.setColor(EMBED_ERROR)
            embed.setDescription(`${inter.user} you lose with the choice of ${client.user} : **${choiceBot}**\n\nYour lost: **${betCurrent}**`);
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