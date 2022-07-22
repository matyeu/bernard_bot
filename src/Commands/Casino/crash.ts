import {BernardClient} from "../../Librairie";
import {ButtonInteraction, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";
import {find, edit} from "../../Models/economy";
import {EMBED_ERROR, EMBED_SUCCESS, EMOJIS, FOOTER_CASINO} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let casinoConfig: any = await find(interaction.guild!.id, interaction.user.id);
    let bet = interaction.options.getNumber('bet')!;
    let member = await interaction.guild!.members.fetch(interaction.user.id)

    if (casinoConfig.money < bet || bet === 0)
        return interaction.replyErrorMessage(client, language("BET_ERROR_NOTHAVE"), true);

    if (bet > 500)
        return interaction.replyErrorMessage(client, language("BET_ERROR_UP"), true);

    let stop: any = ((Math.random() * 6)).toFixed(1);
    stop = parseFloat(stop);
    let profit = bet;
    let newProfit: any = 0;

    let loss = bet;
    let multiplier: any = 1;
    let replyEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle("Crash")
        .setDescription(language("BET").replace('%user%', `${member.displayName}#${member.user.discriminator}`).replace('%bet%', bet))
        .addFields(
            {inline: true, name: 'Multiplier', value: `${multiplier}x`},
            {inline: true, name: "Profit: ", value: `${newProfit} ${client.getEmoji(EMOJIS.money)}`}
        )
        .addField(language("HOW_TO_PLAY"), language("VALUE_HOW_TO_PLAY"))
        .setTimestamp()
        .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL({dynamic: true})});

    let button = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`stop:${interaction.user.id}`)
                .setLabel("STOP")
                .setStyle("DANGER"))

    let buttonDisabled = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("stop")
                .setLabel("STOP")
                .setStyle("DANGER")
                .setDisabled(true))

    await interaction.reply({
        embeds: [replyEmbed],
        components: [button],
        fetchReply: true
    })
        .then((crashMessage: any) => {
                let refreshID = setInterval(() => {
                    multiplier = (multiplier + 0.2).toFixed(1);
                    multiplier = parseFloat(multiplier);
                    newProfit = (multiplier * profit).toFixed(0);
                    newProfit = parseFloat(newProfit) - profit;
                    replyEmbed = new MessageEmbed()
                        .setColor(EMBED_SUCCESS)
                        .setTitle("Crash")
                        .setDescription(language("BET").replace('%user%', `${member.displayName}#${member.user.discriminator}`).replace('%bet%', bet))
                        .addFields(
                            {inline: true, name: 'Multiplier ', value: `${multiplier}x`},
                            {inline: true, name: "Profit: ", value: `${newProfit} ${client.getEmoji(EMOJIS.money)}`}
                        )
                        .addField(language("HOW_TO_PLAY"), language("VALUE_HOW_TO_PLAY"))
                        .setTimestamp()
                        .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL({dynamic: true})});
                    crashMessage.edit({
                        embeds: [replyEmbed]
                    });

                    if (multiplier >= stop) {
                        clearInterval(refreshID);
                        replyEmbed = new MessageEmbed()
                            .setColor(EMBED_ERROR)
                            .setTitle("Crash")
                            .setDescription(language("BET_LOST").replace('%user%', `${member.displayName}#${member.user.discriminator}`).replace('%bet%', bet))
                            .addFields(
                                {inline: true, name: 'Multiplier ', value: `${multiplier}x`},
                                {inline: true, name: "Profit: ", value: `${newProfit} ${client.getEmoji(EMOJIS.money)}`}
                            )
                            .addField("Balance", `${casinoConfig.money - loss} ${client.getEmoji(EMOJIS.money)}`)
                            .setTimestamp()
                            .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL({dynamic: true})});
                        crashMessage.edit({
                            embeds:[ replyEmbed],
                            components: [buttonDisabled]
                        });

                        casinoConfig.money -= loss;
                        edit(interaction.guild!.id, interaction.user.id, casinoConfig);
                    }
                }, 2000);

            const collector = crashMessage.createMessageComponentCollector({ filter: ()=> true, componentType: 'BUTTON', idle: 60000 });

            collector.on('collect', async (inter: ButtonInteraction) => {
                if (inter.customId.split(':')[1] !== inter.user.id)
                    return inter.replyErrorMessage(client, language("BUTTON_ERROR"), true);

                    clearInterval(refreshID);
                    replyEmbed = new MessageEmbed()
                        .setColor(EMBED_SUCCESS)
                        .setTitle("Crash")
                        .setDescription(language("BET_WON").replace('%user%', `${member.displayName}#${member.user.discriminator}`).replace('%bet%', bet))
                        .addFields(
                            {inline: true, name: 'Multiplier ', value: `${multiplier}x`},
                            {inline: true, name: "Profit: ", value: `${newProfit} ${client.getEmoji(EMOJIS.money)}`}
                        )
                        .addField("Balance", `${casinoConfig.money + newProfit} ${client.getEmoji(EMOJIS.money)}`);
                    await inter.update({
                        embeds: [ replyEmbed ],
                        components: [buttonDisabled]
                    });

                    casinoConfig.money += newProfit;
                    await edit(interaction.guild!.id, interaction.user.id, casinoConfig);
                    return collector.stop();
                });

            }
        );


};

export const slash = {
    data: {
        name: "crash",
        description: "Allows you to play crash.",
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