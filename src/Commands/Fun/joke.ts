import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../config";

const {Client} = require("blague.xyz");


export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {

    const guildConfig: any = await find(interaction.guild!.id);

    const joker = new Client(process.env.BLAGUEXYZ, {
        defaultLang: guildConfig.language === "fr-FR" ? "fr" : "en"});


    joker.randomJoke().then((joke: { question: string; answer: string; }) => {
        let random = new MessageEmbed()
            .setColor(EMBED_GENERAL)
            .setTitle(language("TITLE").replace('%emoji%', client.getEmoji(EMOJIS.game)).replace('%user%', interaction.user.username))
            .setDescription(language("DESCRIPTION").replace('%question%', joke.question).replace('%answer%', joke.answer))
            .setTimestamp()
            .setFooter({
                text: `${FOOTER}`,
                iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})
            });
        interaction.reply({embeds: [random]});
    });

};

export const slash = {
    data: {
        name: "joke",
        description: "Allows you to display a joke.",
        category: "Fun",
        permissions: ["SEND_MESSAGES"],
        defaultPermission: false
    }
}