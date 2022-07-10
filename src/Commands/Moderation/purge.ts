import {BernardClient} from "../../Librairie";
import {CommandInteraction, TextChannel} from "discord.js";

export default async function (client: BernardClient, interaction: CommandInteraction, langue: any) {

    switch (interaction.options.getSubcommand()) {
        case "messages":
            const channelTextMessages = interaction.channel! as TextChannel;
            const argsNumberMessages = interaction.options.getNumber("number", true);

            if (isNaN(argsNumberMessages) || argsNumberMessages < 1 || argsNumberMessages > 100)
                return interaction.replyErrorMessage(client, langue("NUMBER_BETWEEN"), true);

            const messagesToDelete = await channelTextMessages.messages.fetch({
                limit: Math.min(argsNumberMessages, 100), before: interaction.id
            });

            channelTextMessages
                .bulkDelete(messagesToDelete)
                .then(async () => {
                    await interaction.replySuccessMessage(client, langue("MESSAGE_DELETE_SIZE").replace('%messageDelete%', messagesToDelete.size), true);
                })
                .catch((err: Error) => {
                    if (err.message.match("You can only bulk delete messages that are under 14 days old")) {
                        interaction.replyErrorMessage(client, langue("BULK_DELETE"), true)
                    } else {
                        console.error(err);
                        interaction.replyErrorMessage(client, langue("ERROR_DELETE"), true);
                    }
                });
            break;
        case "user":
            const argNumber = interaction.options.getNumber("number", true);
            const channelTextUser = interaction.channel as TextChannel;
            const user = interaction.options.getUser("user", true);
            if (isNaN(argNumber) || argNumber < 1 || argNumber > 100)
                return interaction.replyErrorMessage(client, langue("NUMBER_BETWEEN"), true);

            const messagesOfUser: any = (
                await interaction.channel!.messages.fetch({limit: 100, before: interaction.id})).filter((a) => a.author.id === user.id);

            messagesOfUser.length = Math.min(argNumber, messagesOfUser.length);
            if (messagesOfUser.length === 0 || !user)
                return interaction.reply({content: langue("NO_MESSAGE_DELETE"), ephemeral: true});

            if (messagesOfUser.length === 1) await messagesOfUser[1].delete();
            else await channelTextUser.bulkDelete(messagesOfUser).then(async () => {
                await interaction.replySuccessMessage(client,langue("MESSAGE_DELETE_USER").replace('%user%', user.tag), true);
            })
                .catch((err: Error) => {
                    if (err.message.match("You can only bulk delete messages that are under 14 days old")) {
                        interaction.replyErrorMessage(client, langue("BULK_DELETE"), true)
                    } else {
                        console.error(err);
                        interaction.replyErrorMessage(client, langue("ERROR_DELETE"), true);
                    }
                });
            break;
        default:
            return interaction.replyErrorMessage(client, langue("DEFAULT").replace('%subcommand%', interaction.options.getSubcommand()), true)
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