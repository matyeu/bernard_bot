import {MessageEmbed, CommandInteraction} from "discord.js";
import {EMOJIS, FOOTER, EMBED_GENERAL} from "../../config";
import {BernardClient} from "../../Librairie";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let onlineMembers: number = 0;
    let offlineMembers: number = 0;
    let dndMembers: number = 0;
    let afkMembers: number = 0;

    let online = client.getEmoji(EMOJIS.online);
    let dnd = client.getEmoji(EMOJIS.dnd);
    let afk = client.getEmoji(EMOJIS.afk);
    let offline = client.getEmoji(EMOJIS.offline);


    interaction.guild?.members.cache.forEach(member => {
            if (member.presence?.status === "online") {
                onlineMembers++;
            } else if (member.presence?.status === "offline") {
                offlineMembers++;
            } else if (member.presence?.status === "dnd") {
                dndMembers++;
            } else if (member.presence?.status === "idle") {
                afkMembers++;
            }
        }
    );
    const embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setTitle(`Statut des membres du serveur: [${interaction.guild?.members.cache.size}] membres`)
        .setThumbnail(<string>interaction.guild?.iconURL({dynamic: true, format: "png"}))
        .addFields(
            {
                name: `${online} **En Ligne** `,
                value: `\`${onlineMembers}\` membres`,
                inline: true
            },

            {
                name: `${dnd} **Occupés**: `,
                value: `\`${dndMembers}\` membres`,
                inline: true
            },
            {
                name: `${afk} **Absents**: `,
                value: "\`" + afkMembers + "\` membres",
                inline: true
            },
            {
                name: `${offline} **Hors Ligne**: `,
                value: "\`" + offlineMembers + "\` membres",
                inline: true
            },
        )
        .setFooter({
            text: `${FOOTER}`, iconURL: interaction.client?.user?.displayAvatarURL({dynamic: true, format: "png"})
        })
        .setTimestamp();

    interaction.editReply({embeds: [embed]});
}

export const slash = {
    roles: ["membre"],
    data: {
        name: "membres",
        description: "Donne Les Informations sur les membres du serveur",
        category: "Informations",
        defaultPermission: false
    }
}
