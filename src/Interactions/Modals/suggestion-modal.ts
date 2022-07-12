import {BernardClient} from "../../Librairie";
import {MessageEmbed, ModalSubmitInteraction} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../config";
import {find} from "../../Models/client";

export default async function(client: BernardClient, interaction: ModalSubmitInteraction, language: any) {

    let titleSuggestion = interaction.fields.getTextInputValue('titleSuggestion');
    let descriptionSuggestion = interaction.fields.getTextInputValue('descriptionSuggestion');

    let clientConfig: any = await find(interaction.guild!.id);
    let channelSuggest = clientConfig.suggestion;

    let error = client.getEmoji(EMOJIS.error),
        thread = client.getEmoji(EMOJIS.thread),
        check = client.getEmoji(EMOJIS.check);

    if (!channelSuggest)
        return interaction.replyErrorMessage(client, language("CHANNEL_SUGGESTION_NOTFOUND"), true);
    if (descriptionSuggestion?.length < 20)
        return interaction.replyErrorMessage(client, language("ERROR_SUGGESTION"), true);

    const member = await interaction.guild!.members.fetch(interaction.user)
    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: `${member.displayName}#${member.user.discriminator}`, iconURL: member.displayAvatarURL({dynamic: true, format: 'png'})})
        .setTitle(`${titleSuggestion}`)
        .setDescription(language("DESCRIPTION").replace('%description%', descriptionSuggestion).replace('%emoji%', thread))
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: 'png'})});

    channelSuggest = client.channels.cache.find(channelSuggest => channelSuggest.id === `${clientConfig.suggestion}`);

    const msg = await channelSuggest.send({embeds: [embed]});
    await interaction.replySuccessMessage(client, language("CONTENT"), true)
    await msg.react(EMOJIS.check)
    await msg.react(EMOJIS.error)
    await msg.react(EMOJIS.thread)

};
exports.modal = {
    data: {
        name: "suggestion",
        filepath: "Interactions/Modals/suggestionModalData",
    }
};