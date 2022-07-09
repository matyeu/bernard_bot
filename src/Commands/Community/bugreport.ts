import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageActionRow, Modal, TextInputComponent} from "discord.js";

export default async function (client: BernardClient, interaction: CommandInteraction, langue: any) {

    let modal = new Modal()
        .setCustomId('bugReport')
        .setTitle(langue("TITLE_MODAL"));

    const titleBug = new TextInputComponent()
        .setCustomId('titleBug')
        .setLabel(langue("TITLE_BUG"))
        .setRequired(true)
        .setStyle('SHORT');

    const descriptionBug = new TextInputComponent()
        .setCustomId('descriptionBug')
        .setLabel(langue("DESCRIPTION_BUG"))
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