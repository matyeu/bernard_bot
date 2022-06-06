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
    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
    const date = moment().subtract(d, 'ms').format('DD/MM/YYYY');

    const embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setDescription(`
            \`${client.user?.username}\` is a feature rich **bot discord**. 
            **designed for the discord community ** 
            \`${client.user?.username}\` has a **variety of commands** and a 
            **A variety of parameters** that can be **adapted to your needs**.  
           \`\`\`👤 Informations\`\`\`
           **» Tag and ID:** ${interaction.client?.user} - ${interaction.client.user?.id}
           **» Préfix:** /
           **» Creator:** <@${CREATOR_ID}>
           **» Version:** \`${JSON.parse(packageInfo).version}\`
           
           \`\`\`📊 Statistics\`\`\`
           **» Servers:** \`${interaction.client?.guilds.cache.size.toString()}\` servers
           **» Last restart:** \`${days}\ and ${hours}\`
           **» Last update:** \`${date}\`
           
           \`\`\`📜 Resources\`\`\`
           **» Librairie / Envrionnement:** [Discord.js v13](https://discord.js.org/#/docs/main/stable/general/welcome) | [Node.js v16.11.0](https://nodejs.org/fr/)
           **» Database:** [Mongoose](https://mongodb.com)
           **» Emojis:** [Favicon](https://www.flaticon.com/search?word=coeur)
           **» Github:** [Bernard](${GITHUB})
           **» Host:** ubuntu \`21.04\`
           
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
    maintenance: false,
    data: {
        name: "botinfo",
        description: "Displays the bot's information.",
        category: "Informations",
        defaultPermission: false
    }
}
