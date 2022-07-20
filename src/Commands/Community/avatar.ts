import {CommandInteraction, MessageAttachment} from "discord.js";
import {BernardClient} from "../../Librairie";
const AmeClient = require("amethyste-api");;

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {
    let memberOption = interaction.options.getString("user");
    const argUser = memberOption!.replace("<@!", "").replace(">", "");
    const member = await interaction.guild?.members.cache.get(argUser.replace(/ /g,""));

    if (!member) return interaction.replyErrorMessage(client, language("MEMBER_ERROR"), true);

    let picture = interaction.options.getString("picture");
    const AmeAPI = new AmeClient(process.env.AMETHYSTE);

    if (picture) {
        const buffer = await AmeAPI.generate(`${picture}`, {url: member.displayAvatarURL({size: 512, dynamic: true}),});
        const attachement = new MessageAttachment(buffer, `${picture}.png`);
        await interaction.reply({files: [attachement]});
    }
    else {
        const imgUrl = await member.displayAvatarURL({size: 512, dynamic: true});
        await interaction.reply({files: [imgUrl]});
    }


}

export const slash = {
    data: {
        name: "avatar",
        description: "Displays a user's avatar.",
        category: "Community",
        permissions: ["SEND_MESSAGES"],
        options: [
            {
                name: "user",
                type: "STRING",
                description: "Mention or ID of the user",
                required: true,
            },
            {
                name: "picture",
                description: "Display a background photo with the avatar",
                type: "STRING",
                choices: [
                    {name: "Approved", value: "approved"},
                    {name: "Beautiful", value: "beautiful"},
                    {name: "Crush", value: "Crush"},
                    {name: "Dictator", value: "dictator"},
                    {name: "Fire", value: "fire"},
                    {name: "Glitch", value: "glitch"},
                    {name: "Instagram", value: "instagram"},
                    {name: "Mission", value: "missionpassed"},
                    {name: "Jail", value: "jail"},
                    {name: "Ps4", value: "ps4"},
                    {name: "Rip", value: "rip"},
                    {name: "Scary", value: "scary"},
                    {name: "Tobecontinued", value: "tobecontinued"},
                    {name: "Triggered", value: "triggered"},
                    {name: "Wanted", value: "wanted"},
                    {name: "Wasted", value: "wasted"},
                ],
            }
        ],
        defaultPermission: false
    }
}
