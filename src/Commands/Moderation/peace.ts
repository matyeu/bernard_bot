import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageEmbed, TextChannel} from "discord.js";
import {EMBED_INFO, EMOJIS, FOOTER} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let channel = <TextChannel>interaction.channel!;
    let everyone = interaction.guild!.roles.everyone;
    await channel.permissionOverwrites.edit(everyone, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
    });

    await interaction.replySuccessMessage(client, `The peace order will be launched`, true);

    let embedIMG = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setImage(`https://i.pinimg.com/originals/98/c7/fa/98c7fa7afe6df8db59aa5ba9e69068a4.gif`)
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true})})
        .setTimestamp();
    let embed1 = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(`**Tempers flare, it happens, but let's try to stay calm...** `);
    let embed2 = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(`**This exchange is unpleasant for everyone, so we breathe and relax...**`);
    let embed3 = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(`**If you really want to continue to debate, continue in private... **`);
    let embed4 = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(`**Because you create a bad atmosphere that disturbs everyone... **`);
    let embed5 = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(`**Please respect the peace that usually prevails on this channel... Merci :pray: **`);

    let embed6 = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(`**You can speak again, in calmness and joy-attitude !** ${client.getEmoji(EMOJIS.heart)}`)


    await channel.send({embeds: [embedIMG]});
    let message = await channel.send({embeds: [embed1]});
    setTimeout(() => message.edit({embeds: [embed2]}), 10000);
    setTimeout(() => message.edit({embeds: [embed3]}), 20000);
    setTimeout(() => message.edit({embeds: [embed4]}), 30000);
    setTimeout(() => message.edit({embeds: [embed5]}), 40000);
    setTimeout(() => {
        channel.permissionOverwrites.edit(everyone, {
            SEND_MESSAGES: null,
            ADD_REACTIONS: null
        })
    }, 50000);
    setTimeout(() => message.edit({embeds: [embed6]}), 60000);
};

export const slash = {
    data: {
        name: "peace",
        description: "Lock a channel for 1 minute.",
        category: "Moderation",
        cooldown: 1,
        permissions: ["MANAGE_MESSAGES"],
        defaultPermission: false,
    }
}