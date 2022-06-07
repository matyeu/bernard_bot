import {BernardClient} from "../../Librairie";
import {ModalSubmitInteraction} from "discord.js";
import {find} from "../../Models/client";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../config";

const {MessageEmbed} = require("discord.js");
const {EMBED_VALIDER} = require("../../config");

async function execute(client: BernardClient, interaction: ModalSubmitInteraction) {

    let titleBug = interaction.fields.getTextInputValue('titleBug');
    let descriptionBug = interaction.fields.getTextInputValue('descriptionBug');

    let clientConfig: any = await find(interaction.guild!.id);
    let channelBug = clientConfig.bug;

    let error = client.getEmoji(EMOJIS.error),
        thread = client.getEmoji(EMOJIS.thread),
        check = client.getEmoji(EMOJIS.check);

    if (!channelBug)
        return interaction.reply({content:`${error} | The channel \`bug\` is **not configured** or **cannot be found**.`, ephemeral: true});
    if (descriptionBug?.length < 20)
        return interaction.reply({content: `${error} | Your bugreport must be at least **\`20\` characters long**`, ephemeral: true});

    const member = await interaction.guild!.members.fetch(interaction.user)
    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: `${member.displayName}#${member.user.discriminator}`, iconURL: member.displayAvatarURL({dynamic: true, format: 'png'})})
        .setTitle(`${titleBug}`)
        .setDescription(`${descriptionBug}\n\n*Press the ${thread} reaction to create a thread for discussion!*`)
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: 'png'})});

    channelBug = client.channels.cache.find(channelSuggest => channelSuggest.id === `${clientConfig.bug}`);

    const msg = await channelBug.send({embeds: [embed]});
    await interaction.reply({content: `${check} | Your bugreport **has been sent**!`, ephemeral: true})
    await msg.react(EMOJIS.check)
    await msg.react(EMOJIS.error)
    await msg.react(EMOJIS.thread)




};
exports.execute = execute;
exports.modal = {
    data: {
        name: "bugReport",
    }
};