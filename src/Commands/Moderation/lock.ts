import {BernardClient} from "../../Librairie";
import {CommandInteraction, TextChannel} from "discord.js";
import {EMOJIS} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, langue: any) {

    let channelUnlock = client.getEmoji(EMOJIS.channel),
        channelLock = client.getEmoji(EMOJIS.channelLock);

    let channel = <TextChannel>interaction.channel!;
    let state = interaction.options.getNumber("state");
    let everyone = channel.guild.roles.everyone;

    if (state === 1) {
        await channel.permissionOverwrites.edit(everyone.id, {SEND_MESSAGES: false})

        await interaction.replySuccessMessage(client,langue("CHANNEL_BEING").replace('%state%', "locked"), true)
        return interaction.channel?.send({content: langue("CHANNEL_STATE").replace('%emoji%', channelLock).replace('%state%', "locked")})

    } else {
        await channel.permissionOverwrites.edit(everyone.id, {SEND_MESSAGES: null})

        await interaction.replySuccessMessage(client,langue("CHANNEL_BEING").replace('%state%', "unlocked"), true)
        return interaction.channel?.send({content: langue("CHANNEL_STATE").replace('%emoji%', channelUnlock).replace('%state%', "unlocked")});
    }

};

export const slash = {
    data: {
        name: "lock",
        description: "Lock or unlock a channel.",
        category: "Moderation",
        cooldown: 1,
        permissions: ["MANAGE_MESSAGES"],
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