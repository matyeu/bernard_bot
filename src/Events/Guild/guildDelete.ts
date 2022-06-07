import {BernardClient} from "../../Librairie";
import {Guild, MessageEmbed} from "discord.js";
import {find as findClient} from "../../Models/client";
import {find as findGuild} from "../../Models/guild";
import {find as findMember} from "../../Models/members";
import {EMBED_ERROR, FOOTER, SERVER} from "../../config";
import moment from "moment";

export default async function (client: BernardClient, guild: Guild) {

    let guildConfig = await findGuild(guild.id);
    if (guildConfig) await guildConfig.delete();

    for (let member of guild.members.cache.map(member => member)) {
        if (member.user.bot) continue;
        let memberConfig = await findMember(guild.id, member.user.id);
        if (memberConfig) await memberConfig.delete();
    };

    let ownerGuild = await guild.members.fetch(guild.ownerId)
    let getOwner = client.guilds.cache.get(SERVER.id)?.members.cache.get(guild.ownerId);

    let embed = new MessageEmbed()
        .setColor(EMBED_ERROR)
        .setTitle(`${client.user!.tag} left a server!`)
        .setDescription(`Too bad **${ownerGuild?.user.tag}** just excluded me from his server, I am now in **${client.guilds.cache.size}** servers!`)
    if (guild.iconURL()) {embed.setThumbnail(`${guild.iconURL({ dynamic: true })}`)}
    embed.addFields(
        {name: `Owner (ID)`, value: `${getOwner ? ownerGuild! : ownerGuild?.user.tag}\n(${ownerGuild?.user.id})`, inline: true},
        {name: `Server (ID)`, value: `${guild.name}\n(${guild.id})`, inline: true},
        {name: `Creation`, value: `${moment(guild.createdAt).format('MM/DD/YYYY')}`, inline: true},
        {name: `Members`, value: `${guild.memberCount}`, inline: true},
        {name: `Channels`, value: `${guild.channels.cache.size}`, inline: true},
        {name: `Roles`, value: `${guild.roles.cache.size}`, inline: true},
        {name: `Boosts`, value: `${guild.premiumSubscriptionCount}`, inline: true},)
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: client.user!.displayAvatarURL({dynamic: true})});

    let clientConfig: any = await findClient(SERVER.id);
    return client.getClientChannel(client, clientConfig.server, {embeds: [embed]});

};