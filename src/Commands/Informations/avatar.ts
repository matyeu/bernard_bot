import {MessageEmbed, CommandInteraction} from "discord.js";
import {FOOTER, EMBED_GENERAL} from "../../config";
import {BernardClient} from "../../Librairie";

export default async function (client: BernardClient, interaction: CommandInteraction) {
    const member = interaction.options.get("membre")?.user ?? interaction.user;
    const user = await interaction.guild!.members.fetch(member)
    const imgUrl = user.displayAvatarURL({size: 512, dynamic: true});

    const embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setTitle(`Avatar of ${user.displayName}`)
        .setURL(imgUrl)
        .setImage(imgUrl)
        .setTimestamp()
        .setFooter({
            text: `${FOOTER}`,
            iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})
        })

    await interaction.editReply({embeds: [embed],});


}

export const slash = {
    data: {
        name: "avatar",
        description: "Displays a user's avatar.",
        category: "Informations",
        options: [{
            name: "user",
            type: "USER",
            description: "Mention of the user",
            required: false,
        }],
        defaultPermission: false
    }
}
