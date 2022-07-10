import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageEmbed, TextChannel} from "discord.js";
import {EMBED_INFO, EMOJIS, FOOTER} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    let channel = <TextChannel>interaction.channel!;
    let everyone = interaction.guild!.roles.everyone;
    await channel.permissionOverwrites.edit(everyone, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
    });

    await interaction.replySuccessMessage(client, language("PEACE_LAUNCHED"), true);

    let embedIMG = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setImage(language("PICTURE"))
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true})})
        .setTimestamp();
    let embed1 = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(language("EMBED_1"));
    let embed2 = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(language("EMBED_2"));
    let embed3 = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(language("EMBED_3"));
    let embed4 = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(language("EMBED_4"));
    let embed5 = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(language("EMBED_5"));
    let embed6 = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(language("EMBED_6").replace('%emoji%', client.getEmoji(EMOJIS.heart)));


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