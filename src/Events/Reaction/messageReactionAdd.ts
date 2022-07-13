import {BernardClient} from "../../Librairie";
import {MessageEmbed, MessageReaction, User} from "discord.js";
import {EMBED_GENERAL, EMOJIS, FOOTER, SERVER} from "../../config";
import {find} from "../../Models/client";

const Logger = require("../../Librairie/logger");

export default async function (client: BernardClient, messageReaction: MessageReaction, member: User) {

    if (member.bot) return;

    if (messageReaction.partial) {
        try {
            await messageReaction.fetch();
        } catch (error) {
            return Logger.error('Impossible to retrieve messages!');
        }
    }

    const message = messageReaction.message;
    const emoji = messageReaction.emoji.id;

    let clientConfig: any = await find(SERVER.id);
    let guildConfig: any = await find(message.guild!.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/Channel/messageReactionData`);
    let channelSuggest = clientConfig.suggestion;
    let channelBug = clientConfig.bug;

    if (emoji === EMOJIS.thread && (message.channel.id === channelSuggest || message.channel.id === channelBug) ) {

        let threadEmoji = client.getEmoji(EMOJIS.thread),
            quoteS = client.getEmoji(EMOJIS.quoteS),
            quoteE = client.getEmoji(EMOJIS.quoteE);

        let isSuggest = message.channel.id === channelSuggest;

        await message.reactions.cache.get(EMOJIS.thread)?.remove()
        let thread = await message.startThread({
            name: language("THREAD_NAME").replace('%isSuggest%', isSuggest ? "Suggestion" : "Bug-report")
                .replace('%member%', message.embeds[0].author?.name),
            reason: language("THREAD_REASON").replace('%isSuggest%', isSuggest ? "suggestion" : "bug-report")
                .replace('%member%', message.embeds[0].author?.name)
        });

        const embed = new MessageEmbed()
            .setColor(EMBED_GENERAL)
            .setAuthor({name: `${message.embeds[0].author?.name}`, iconURL: message.embeds[0].author?.iconURL})
            .setTitle(`${message.embeds[0].title}`)
            .setDescription(`${message.embeds[0].description?.replace(language("DESCRIPTION").replace('%emoji%', threadEmoji), language("LINK")
                .replace('%quoteS%', quoteS).replace('%link%', `https://discord.com/channels/${message.guild?.id}/${thread.id}`)
                .replace('%quoteE%', quoteE))}`)
            .setTimestamp()
            .setFooter({text: FOOTER, iconURL: message.client.user?.displayAvatarURL({dynamic: true, format: 'png'})});

        await message.edit({embeds: [embed] })
    }
}