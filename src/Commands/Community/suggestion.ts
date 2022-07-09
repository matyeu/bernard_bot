import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageActionRow, Modal, TextInputComponent} from "discord.js";

export default async function (client: BernardClient, interaction: CommandInteraction, langue: any) {

    let modal = new Modal()
        .setCustomId('suggestion')
        .setTitle(langue("TITLE_MODAL"));

    const titleSuggestion = new TextInputComponent()
        .setCustomId('titleSuggestion')
        .setLabel(langue("TITLE_SUGGESTION"))
        .setRequired(true)
        .setStyle('SHORT');

    const descriptionSuggestion = new TextInputComponent()
        .setCustomId('descriptionSuggestion')
        .setLabel(langue("DESCRIPTION_SUGGESTION"))
        .setRequired(true)
        .setStyle('PARAGRAPH');

    //@ts-ignore
    const titleSuggestionRow = new MessageActionRow().addComponents(titleSuggestion);
    //@ts-ignore
    const descriptionSuggestionRow = new MessageActionRow().addComponents(descriptionSuggestion);

    //@ts-ignore
    await modal.addComponents(titleSuggestionRow, descriptionSuggestionRow);
    await interaction.showModal(modal);

};

export const slash = {
    data: {
        name: "suggestion",
        description: "Send a suggestion to the support server",
        category: "Community",
        defaultPermission: false
    }
}