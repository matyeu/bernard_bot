import {CommandInteraction, MessageEmbed} from "discord.js";
import {BernardClient} from "../../Librairie";
import {CREATOR_ID, EMBED_GENERAL, EMOJIS, FOOTER, GITHUB} from "../../config";
import moment from "moment";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    switch (interaction.options.getSubcommand()) {
        case 'user':
            let memberOption = interaction.options.getString("user");
            const argUser = memberOption!.replace("<@!", "").replace(">", "");
            const member = await interaction.guild?.members.cache.get(argUser.replace(/ /g,""));

            if (!member) return interaction.replyErrorMessage(client, "The user is **not in the server**.", true);

            const userFlags = (await member.user.fetchFlags()).toArray();
            let statusFlags = {
                online: "Online",
                idle: "Idle",
                dnd: "Do Not Disturb",
                offline: "Offline",
            };

            let perkFlags = {
                DISCORD_EMPLOYEE: "Discord Staff",
                DISCORD_PARTNER: `Discord Partner`,
                BUGHUNTER_LEVEL_1: `Bug hunter (Level 1)`,
                BUGHUNTER_LEVEL_2: `Bug hunter (Level 2)`,
                HYPESQUAD_EVENTS: `HypeSquad Events`,
                HOUSE_BRAVERY: `House of Bravery`,
                HOUSE_BRILLIANCE: `House of Brilliance`,
                HOUSE_BALANCE: `House of Balance`,
                EARLY_SUPPORTER: `Early support`,
                TEAM_USER: 'Team user',
                SYSTEM: 'System',
                VERIFIED_BOT: `Certified Bot`,
                VERIFIED_DEVELOPER: `Certified bot developer`,
            };

            let customStatus;
            const activities = [];
            if (member.presence) {
                for (const activity of member.presence.activities.values()) {
                    switch (activity.type) {
                        case 'PLAYING':
                            activities.push(`**Play:** ${activity.name}`);
                            break;
                        case 'LISTENING':
                            if (member.user.bot) activities.push(`**Listen:** ${activity.name}`);
                            else activities.push(`**Listen: ** ${activity.details} by ${activity.state}`);
                            break;
                        case 'WATCHING':
                            activities.push(`**Watch:** ${activity.name}`);
                            break;
                        case 'STREAMING':
                            activities.push(`**Stream:** ${activity.name}`);
                            break;
                        case 'CUSTOM':
                            customStatus = activity.state;
                            break;
                    }
                }
            }

            let joinedTimestamp = parseInt(String(member.joinedTimestamp! / 1000));
            let createdTimestamp = parseInt(String(member.user.createdTimestamp! / 1000));

            const embedUser = new MessageEmbed()
                .setColor(EMBED_GENERAL)
                .setAuthor({
                    name: `Informations de ${member.user.tag}`,
                    iconURL: member.displayAvatarURL({dynamic: true, format: "png"})})
                .setDescription(`
${customStatus ? `**Custom Description:** ${customStatus}` : ""}
                \`\`\`👤 Informations\`\`\`
**» Name & ID:** ${member.user} - ${member.user.id}
**» Joigned:** <t:${joinedTimestamp}:f>
**» Account created:** <t:${createdTimestamp}:f>
**» Statut:** \`${statusFlags[<keyof object>member.presence?.status]}\`
**» Badges:** ${userFlags.length > 0 ? `\`${userFlags.map(flag => perkFlags[<keyof object>flag]).join(', ')}\`` : '`Aucun`' }
**»** ${activities.length > 0 ? activities.join(', ') : "**Activities :** `None`"}`)
                .addFields(
                    {name: "Roles", value: `${member.roles.cache.map(role => role).join(', ').replace(', @everyone', ' ')}`}
                )
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: client.user?.displayAvatarURL({dynamic: true})});
            await interaction.reply({ embeds: [embedUser] });
            break;
        case 'bot':
            const pck = require("../../../package.json");
            const versionBot = pck.version;
            const author = pck.author;

            let heart = client.getEmoji(EMOJIS.heart);

            const d = moment.duration(interaction.client.uptime);
            const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
            const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
            const date = moment().subtract(d, 'ms').format('DD/MM/YYYY');

            const embedBot = new MessageEmbed()
                .setColor(EMBED_GENERAL)
                .setDescription(`
           \`\`\`👤 Informations\`\`\`
**» Name & ID:** ${interaction.client?.user} - ${interaction.client.user?.id}
**» Préfix:** /
**» Creator:** <@${CREATOR_ID}>
**» Version:** \`${versionBot}\`
           
           \`\`\`📊 Statistics\`\`\`
**» Servers:** \`${interaction.client?.guilds.cache.size.toString()}\` servers
**» Last restart:** \`${days}\ and ${hours}\`
 **» Last update:** \`${date}\`
           
           \`\`\`📜 Resources\`\`\`
**» Librairie / Environment:** [Discord.js v13](https://discord.js.org/#/docs/main/stable/general/welcome) | [Node.js v16.11.0](https://nodejs.org/fr/)
**» Database:** [Mongoose](https://mongodb.com)
**» Emojis:** [Favicon](https://www.flaticon.com/search?word=coeur)
**» Github:** [Bernard](${GITHUB})
**» Host:** ubuntu \`21.04\`
           
           **Developed with ${heart} by \`${author}\`**
           `)
                .setTimestamp()
                .setFooter({
                    text: `${interaction.client.user?.username} ${FOOTER}`,
                    iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})
                })
            await interaction.reply({embeds: [embedBot]})
            break;
        case 'server':
            let channelEmoji = client.getEmoji(EMOJIS.channel),
                voiceEmoji = client.getEmoji(EMOJIS.voiceOn),
                categoryEmoji = client.getEmoji(EMOJIS.category);

            const channel_t = interaction.guild!.channels.cache.filter((channel) => channel.type === "GUILD_TEXT").size;
            const channel_v = interaction.guild!.channels.cache.filter((channel) => channel.type === "GUILD_VOICE").size;
            const channel_c = interaction.guild!.channels.cache.filter((channel) => channel.type === "GUILD_CATEGORY").size;

            const boost = interaction.guild!.premiumSubscriptionCount;
            let boostMsg = "";
            if (!boost) boostMsg = "This server no have boost";
            else boostMsg = `Server have ${boost} boost${boost > 1 ? "s" : ""}`;

            const embedServer = new MessageEmbed()
                .setColor(EMBED_GENERAL)
                .setAuthor({name: `${interaction.guild?.name}`, iconURL: `${interaction.guild?.iconURL({dynamic: true})}`})
                .setDescription(`
                 \`\`\`🌐 Informations\`\`\`
**» Name & ID :** ${interaction.guild?.name} - ${interaction.guild?.id}
**» Owner:** <@${interaction.guild?.ownerId}> - ${interaction.guild?.ownerId}
**» Verification level:** \`${interaction.guild!.verificationLevel}\`

                 \`\`\`📊 Statistics\`\`\`
**» Members:** \`${interaction.guild?.memberCount}\`
**» Roles:** \`${interaction.guild?.roles.cache.size}\`
**» Channels (${interaction.guild?.channels.cache.size}):** ${channelEmoji} Text: \`${channel_t}\` | ${voiceEmoji} Voice: \`${channel_v}\` | ${categoryEmoji} Category: \`${channel_c}\`
**» Nitro(s) of server:** ${boostMsg}`)
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: client.user?.displayAvatarURL({dynamic: true})});
            await interaction.reply({embeds: [embedServer]})
            break;
        default:
            return interaction.replyErrorMessage(client, "This value does **not exist** or **cannot be found**!", true)
    }
}

export const slash = {
    data: {
        name: "info",
        description: "Get informations",
        category: "Informations",
        options: [
            {
                name: "user",
                description: "Allows to have information about a user.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "user",
                        description: "User to get infos",
                        type: "STRING",
                        required: true,
                    },
                ],
            },
            {
                name: "bot",
                description: "Allows to have information about bot.",
                type: "SUB_COMMAND",
            },
            {
                name: "server",
                description: "Allows to have information about server.",
                type: "SUB_COMMAND",
            },
        ],
        defaultPermission: false
    }
}
