import {BernardClient} from "../../Librairie";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {EMBED_INFO, FOOTER, } from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction, language: any) {}

export const slash = {
    data: {
        name: "setup",
        description: "Ping ? Pong !",
        category: "Owner",
        defaultPermission: false
    }
}