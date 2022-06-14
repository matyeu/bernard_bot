import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {find, edit} from "../../Models/casino";
import {EMBED_ERROR, EMBED_SUCCESS, FOOTER_CASINO} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let casinoConfig: any = await find(interaction.guild!.id, interaction.user.id);
    let bet = interaction.options.getNumber('bet')!;

    if (casinoConfig.money < bet)
        return interaction.replyErrorMessage(client, `You do **not have** enough coin!`, true);

    if (bet > 500)
        return interaction.replyErrorMessage(client, `**You can** bet up to **500** coins!`, true);

    let stop: any = ((Math.random() * 6)).toFixed(1);
    stop = parseFloat(stop);
    let profit = bet;
    let newProfit: any = 0;

    let loss = bet;
    let multiplier: any = 1;
    let replyEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle("Crash")
        .setDescription(`${interaction.user} you have bet $${bet}`)
        .addFields(
            {name: 'Multiplier ', value: `${multiplier}x`, inline: true},
            {name: "Profit: ", value: `$${newProfit}`, inline: true},
            {name: "How to play", value: `-stop: To stop before crash`, inline: false})
        .setTimestamp()
        .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL({dynamic: true})});

    await interaction.reply({embeds: [replyEmbed], fetchReply: true})
        .then((crashMessage: any) => {
            let refreshID = setInterval(() => {
                multiplier = (multiplier + 0.2).toFixed(1);
                multiplier = parseFloat(multiplier);
                newProfit = (multiplier * profit).toFixed(0);
                newProfit = parseFloat(newProfit) - profit;
                replyEmbed = new MessageEmbed()
                    .setColor('BLUE')
                    .setTitle("Crash")
                    .setDescription(`${interaction.user} you have bet $${bet}`)
                    .addFields(
                        {name: 'Multiplier ', value: `${multiplier}x`, inline: true},
                        {name: "Profit: ", value: `$${newProfit}`, inline: true},
                        {name: "How to play", value: `-stop: To stop before crash`, inline: false}
                    )
                    .setTimestamp()
                    .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL({dynamic: true})});

                crashMessage.edit({embeds: [replyEmbed]});

                if (multiplier >= stop) {
                    clearInterval(refreshID);
                    replyEmbed = new MessageEmbed()
                        .setColor(EMBED_ERROR)
                        .setTitle("Crash")
                        .setDescription(`${interaction.user.id} you have lost $${bet}`)
                        .addFields(
                            {name: 'Multiplier ', value: `${multiplier}x`, inline: true},
                            {name: "Profit: ", value: `$${newProfit}`, inline: true},
                            {name: "Balance", value: `$${casinoConfig.money - loss}`, inline: false})
                        .setTimestamp()
                        .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL({dynamic: true})});

                    crashMessage.edit({embeds: [replyEmbed]});
                    casinoConfig.money -= loss;
                    edit(interaction.guild!.id, interaction.user.id, casinoConfig);
                }
            }, 2000);
            client.on('messageCreate', (msg) => {
                if (msg.content.toLowerCase() === "-stop" && !(multiplier >= stop) && msg.author.id === interaction.user.id) {
                    clearInterval(refreshID);
                    replyEmbed = new MessageEmbed()
                        .setColor(EMBED_SUCCESS)
                        .setTitle("Crash")
                        .setDescription(`${interaction.user.id} you have won $${newProfit}`)
                        .addFields(
                            {name: 'Multiplier ', value: `${multiplier}x`, inline: true},
                            {name: "Profit: ", value: `$${newProfit}`, inline: true},
                            {name: "Balance", value: `$${casinoConfig.money + newProfit}`, inline: false})
                        .setTimestamp()
                        .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL({dynamic: true})});
                    crashMessage.edit({embeds: [replyEmbed]});
                    casinoConfig.money += newProfit;
                    edit(interaction.guild!.id, interaction.user.id, casinoConfig);
                    return;
                }
            });
        });


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