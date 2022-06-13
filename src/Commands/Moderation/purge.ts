import {BernardClient} from "../../Librairie";
import {CommandInteraction, TextChannel} from "discord.js";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    switch (interaction.options.getSubcommand()) {
        case "messages":
            const channelTextMessages = interaction.channel! as TextChannel;
            const argsNumberMessages = interaction.options.getNumber("number", true);

            if (isNaN(argsNumberMessages) || argsNumberMessages < 1 || argsNumberMessages > 100)
                return interaction.replyErrorMessage(client, `You must specify a number between **1** and **100**.`, true);

            const messagesToDelete = await channelTextMessages.messages.fetch({
                limit: Math.min(argsNumberMessages, 100), before: interaction.id
            });

            channelTextMessages
                .bulkDelete(messagesToDelete)
                .then(async () => {
                    await interaction.replySuccessMessage(client, `**${messagesToDelete.size} messages** have been deleted`, true);
                })
                .catch((err: Error) => {
                    if (err.message.match("You can only bulk delete messages that are under 14 days old")) {
                        interaction.replyErrorMessage(client, `**You cannot** delete messages older than **14 days**.`, true)
                    } else {
                        console.error(err);
                        interaction.replyErrorMessage(client, `An error occurred while deleting messages.`, true);
                    }
                });
            break;
        case "user":
            const argNumber = interaction.options.getNumber("number", true);
            const channelTextUser = interaction.channel as TextChannel;
            const user = interaction.options.getUser("user", true);
            if (isNaN(argNumber) || argNumber < 1 || argNumber > 100)
                return interaction.replyErrorMessage(client, `You must specify a number between **1** and **100**.`, true);

            const messagesOfUser: any = (
                await interaction.channel!.messages.fetch({limit: 100, before: interaction.id})).filter((a) => a.author.id === user.id);

            messagesOfUser.length = Math.min(argNumber, messagesOfUser.length);
            if (messagesOfUser.length === 0 || !user)
                return interaction.reply({content: `No message to delete`, ephemeral: true});

            if (messagesOfUser.length === 1) await messagesOfUser[1].delete();
            else await channelTextUser.bulkDelete(messagesOfUser);

            return interaction.replySuccessMessage(client,`Messages from **${user.tag}** have been deleted.`, true);

            break;
        default:
            return interaction.replyErrorMessage(client, "This value does **not exist** or **cannot be found**!", true)
    }

}

export const slash = {
    data: {
        name: "purge",
        description: "Purge messages.",
        category: "Moderation",
        permissions: ["MANAGE_MESSAGES"],
        cooldown: 1,
        options: [
            {
                name: "messages",
                description: "Delete messages in a channel.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "number",
                        description: "Number of messages",
                        type: "NUMBER",
                        required: true,
                    },
                ],
            },
            {
                name: "user",
                description: "Purge messages from single user.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "user",
                        description: "User",
                        type: "USER",
                        required: true,
                    },
                    {
                        name: "number",
                        description: "Number of messages",
                        type: "NUMBER",
                        required: true,
                    },
                ],
            },
        ],
        defaultPermission: false
    }
}