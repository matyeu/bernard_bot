import {BernardClient} from "../../Librairie";
import {ModalSubmitInteraction} from "discord.js";
import {find} from "../../Models/client";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../config";

const {MessageEmbed} = require("discord.js");

export default async function (client: BernardClient, interaction: ModalSubmitInteraction, language: any) {

    let titleBug = interaction.fields.getTextInputValue('titleBug');
    let descriptionBug = interaction.fields.getTextInputValue('descriptionBug');

    let clientConfig: any = await find(interaction.guild!.id);
    let channelBug = clientConfig.bug;

    let thread = client.getEmoji(EMOJIS.thread);

    if (!channelBug)
        return interaction.replyErrorMessage(client, language("CHANNEL_BUG_NOTFOUND"), true);
    if (descriptionBug?.length < 20)
        return interaction.replyErrorMessage(client, language("ERROR_BUG"), true);

    const member = await interaction.guild!.members.fetch(interaction.user)
    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: `${member.displayName}#${member.user.discriminator}`, iconURL: member.displayAvatarURL({dynamic: true, format: 'png'})})
        .setTitle(`${titleBug}`)
        .setDescription(language("DESCRIPTION").replace('%description%', descriptionBug).replace('%emoji%', thread))
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: 'png'})});

    channelBug = client.channels.cache.find(channelSuggest => channelSuggest.id === `${clientConfig.bug}`);

    const msg = await channelBug.send({embeds: [embed]});
    await interaction.replySuccessMessage(client, language("CONTENT"), true)
    await msg.react(EMOJIS.thread)




};
exports.modal = {
    data: {
        name: "bugReport",
        filepath: "Interactions/Modals/bugreportModalData",
    }
};