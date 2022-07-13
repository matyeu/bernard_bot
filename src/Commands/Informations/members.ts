import {MessageEmbed, CommandInteraction} from "discord.js";
import {EMOJIS, FOOTER, EMBED_GENERAL} from "../../config";
import {BernardClient} from "../../Librairie";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

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
        .setTitle(language("TITLE").replace('%total%', interaction.guild?.members.cache.size))
        .setThumbnail(<string>interaction.guild?.iconURL({dynamic: true}))
        .addFields(
            {
                name: `${online} ${language("ONLINE")}`,
                value: language("TOTAL_MEMBERS").replace('%total%', onlineMembers),
                inline: true
            },

            {
                name: `${dnd} ${language("DND")}`,
                value: language("TOTAL_MEMBERS").replace('%total%', dndMembers),
                inline: true
            },
            {
                name: `${afk} ${language("AFK")}`,
                value: language("TOTAL_MEMBERS").replace('%total%', afkMembers),
                inline: true
            },
            {
                name: `${offline} ${language("OFFLINE")}`,
                value: language("TOTAL_MEMBERS").replace('%total%', offlineMembers),
                inline: true
            },
        )
        .setFooter({
            text: `${FOOTER}`, iconURL: interaction.client?.user?.displayAvatarURL({dynamic: true, format: "png"})
        })
        .setTimestamp();

    await interaction.reply({embeds: [embed]});
}

export const slash = {
    data: {
        name: "members",
        description: "Displays the number of members.",
        category: "Informations",
        permissions: ["SEND_MESSAGES"],
        defaultPermission: false
    }
}
