import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageActionRow, MessageButton} from "discord.js";
import {create, find} from "../../Models/morpion";
import {EMOJIS} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, langue: any) {

    let dbMemberMorpion: any = await find(interaction.guild!.id, interaction.user.id);
    if (!dbMemberMorpion) await create(interaction.guild!.id, interaction.user.id);

    let button = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`acceptMorpion:${interaction.user.id}`)
                .setEmoji('🎮')
                .setLabel(langue("BUTTON"))
                .setStyle("SECONDARY")

        )
    await interaction.reply({content: langue("CONTENT").replace('%user%', interaction.user), components: [button]});
};

export const slash = {
    data: {
        name: "morpion",
        description: "Allows you to play morpion.",
        category: "Fun",
        permissions: ["SEND_MESSAGES"],
        defaultPermission: false
    }
}