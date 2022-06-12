import {BernardClient} from "../../Librairie";
import {CommandInteraction, TextChannel} from "discord.js";
import {EMOJIS} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let channelUnlock = client.getEmoji(EMOJIS.channel),
        channelLock = client.getEmoji(EMOJIS.channelLock);

    let channel = <TextChannel>interaction.channel!;
    let permissions = [...channel.permissionOverwrites.cache.values()];
    let state = interaction.options.getNumber("state");
    let everyone = channel.guild.roles.everyone;

    if (state === 1) {
        await channel.edit({
            permissionOverwrites: [...permissions, {id: everyone.id, deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]}]
        });

        await interaction.replySuccessMessage(client,`The channel is being **locked**.`, true)
        return interaction.channel?.send({content: `${channelLock} The channel is now **locked**.`});

    } else {
        await channel.edit({
            permissionOverwrites: [...permissions, {id: everyone.id, allow: ["SEND_MESSAGES"], deny: ["VIEW_CHANNEL"]}]
        });

        await interaction.replySuccessMessage(client,`The channel is being **unlocked**.`, true)
        return interaction.channel?.send({content: `${channelUnlock} The channel is now **locked**.`});
    }

};

export const slash = {
    data: {
        name: "lock",
        description: "Lock or unlock a channel.",
        category: "Moderation",
        cooldown: 1,
        options: [
            {
                name: "state",
                type: "NUMBER",
                description: "Indicates the new state of the channel",
                required: true,
                choices: [
                    {name: "Lock", value: 1},
                    {name: "Unlock", value: 0}
                ],
            }],
        defaultPermission: false,
    }
}