import {BernardClient} from "../../Librairie";
import {MessageEmbed, ModalSubmitInteraction} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../config";
import {find} from "../../Models/client";

async function execute(client: BernardClient, interaction: ModalSubmitInteraction) {

    let titleSuggestion = interaction.fields.getTextInputValue('titleSuggestion');
    let descriptionSuggestion = interaction.fields.getTextInputValue('descriptionSuggestion');

    let clientConfig: any = await find(interaction.guild!.id);
    let channelSuggest = clientConfig.suggestion;

    let error = client.getEmoji(EMOJIS.error),
        thread = client.getEmoji(EMOJIS.thread),
        check = client.getEmoji(EMOJIS.check);

    if (!channelSuggest)
        return interaction.reply({content:`${error} | The channel \`suggestion\` is **not configured** or **cannot be found**.`, ephemeral: true});
    if (descriptionSuggestion?.length < 20)
        return interaction.reply({content: `${error} | Your suggestion must be at least **\`20\` characters long**`, ephemeral: true});

    const member = await interaction.guild!.members.fetch(interaction.user)
    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: `${member.displayName}#${member.user.discriminator}`, iconURL: member.displayAvatarURL({dynamic: true, format: 'png'})})
        .setTitle(`${titleSuggestion}`)
        .setDescription(`${descriptionSuggestion}\n\n*Press the ${thread} reaction to create a thread for discussion!*`)
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: 'png'})});

    channelSuggest = client.channels.cache.find(channelSuggest => channelSuggest.id === `${clientConfig.suggestion}`);

    const msg = await channelSuggest.send({embeds: [embed]});
    await interaction.reply({content: `${check} | Your suggestion **has been sent**!`, ephemeral: true})
    await msg.react(EMOJIS.check)
    await msg.react(EMOJIS.error)
    await msg.react(EMOJIS.thread)

};
exports.execute = execute;
exports.modal = {
    data: {
        name: "suggestion",
    }
};