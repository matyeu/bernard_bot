import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {CREATOR_ID, EMBED_INFO, EMOJIS, FOOTER, GITHUB} from "../../config";
import moment from 'moment';

import {readFileSync} from "fs";
import {join} from "path";

const packageInfo = readFileSync(join(__dirname, "../../../package.json")).toString();

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let heart = client.getEmoji(EMOJIS.heart);

    const d = moment.duration(interaction.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} jour` : `${d.days()} jours`;
    const hours = (d.hours() == 1) ? `${d.hours()} heure` : `${d.hours()} heures`;
    const date = moment().subtract(d, 'ms').format('DD/MM/YYYY');

    const embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(`
            \`${client.user?.username}\` est un **bot discord** riche en fonctionnalités 
            **conçu pour la communauté discord.** \`${client.user?.username}\` possède 
            une **varité de commandes** et une **multitude de paramètres** qui peuvent être **adaptés à vos besoins.**  
           \`\`\`👤 Informations\`\`\`
           **» Tag et ID :** ${interaction.client?.user} - ${interaction.client.user?.id}
           **» Préfix :** /
           **» Créateur :** <@${CREATOR_ID}>
           **» Version :** \`${JSON.parse(packageInfo).version}\`
           
           \`\`\`📊 Statistiques\`\`\`
           **» Serveurs :** \`${interaction.client?.guilds.cache.size.toString()}\` serveurs
           **» Dernier redémarrage :** \`${days}\ et ${hours}\`
           **» Dernière mise à jour :** \`${date}\`
           
           \`\`\`📜 Ressources\`\`\`
           **» Librairie / Envrionnement :** [Discord.js v13](https://discord.js.org/#/docs/main/stable/general/welcome) | [Node.js v16.11.0](https://nodejs.org/fr/)
           **» Base de données :** [Mongoose](https://mongodb.com)
           **» Emojis :** [Favicon](https://www.flaticon.com/search?word=coeur)
           **» Github :** [Bernard](${GITHUB})
           **» Serveur :** ubuntu \`21.04\`
           
           **Developed with ${heart} by \`${JSON.parse(packageInfo).author}\`**
           `)
        .setTimestamp()
        .setFooter({
            text: `${interaction.client.user?.username} ${FOOTER}`,
            iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})
        })
    await interaction.editReply({embeds: [embed]})


}

export const slash = {
    roles: ["membre"],
    maintenance: false,
    data: {
        name: "botinfo",
        description: "Affiche les informations du bot",
        category: "Informations",
        defaultPermission: false
    }
}
