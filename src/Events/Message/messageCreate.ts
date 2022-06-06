import {BernardClient} from "../../Librairie";
import {Message} from "discord.js";
import {find as finGuild} from "../../Models/guild";

export default async function (client: BernardClient, message: Message) {

    let guildConfig: any = await finGuild(message.guild!.id);
    if (message.channel.id === guildConfig.channels.configVoice && !message.author.bot) await message.delete();
}