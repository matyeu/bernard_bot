import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageActionRow, Modal, TextInputComponent} from "discord.js";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let modal = new Modal()
        .setCustomId('bugReport')
        .setTitle('Report a bug');

    const titleBug = new TextInputComponent()
        .setCustomId('titleBug')
        .setLabel("What is the title of the bug ?")
        .setRequired(true)
        .setStyle('SHORT');

    const descriptionBug = new TextInputComponent()
        .setCustomId('descriptionBug')
        .setLabel("What is the description of the bug ?")
        .setRequired(true)
        .setStyle('PARAGRAPH');


    //@ts-ignore
    const titleBugRow = new MessageActionRow().addComponents(titleBug);
    //@ts-ignore
    const descriptionBugRow = new MessageActionRow().addComponents(descriptionBug);

    //@ts-ignore
    await modal.addComponents(titleBugRow, descriptionBugRow);
    await interaction.showModal(modal);


};

export const slash = {
    data: {
        name: "bugreport",
        description: "Send a bug to the support server.",
        category: "Community",
        defaultPermission: false
    }
}