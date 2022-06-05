import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {EMBED_INFO, FOOTER, } from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    const start = Date.now();
    interaction.editReply({content: "Pong !"}).then(() => {

        const end = Date.now();
        const time = end - start;

        let botLatency = `${'```js'}\n ${Math.round(time)} ms ${'```'}`
        let apiLatency = `${'```js'}\n ${Math.round(interaction.client.ws.ping)} ms ${'```'}`

        const embed = new MessageEmbed()
            .setColor(EMBED_INFO)
            .setTitle(`🏓 | Temps de réponses`)
            .addFields(
                {name: `Latence du bot`, value: botLatency, inline: true},
                {name: `Latence de l'api`, value: apiLatency, inline: true},
            )
            .setTimestamp()
            .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})});

        interaction.editReply({content: null, embeds: [embed]});
    });


}

export const slash = {
    roles: ["membre"],
    maintenance: false,
    data: {
        name: "ping",
        description: "Ping ? Pong !",
        category: "Informations",
        defaultPermission: false
    }
}