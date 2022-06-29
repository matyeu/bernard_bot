import {BernardClient} from "../../Librairie";
import {CommandInteraction} from "discord.js";
import {find as findGuild, edit as editGuild} from "../../Models/guild";
import {create as createMember, find as findMember} from "../../Models/roleplay";
import {find as findEconomy, edit as editEconomy} from "../../Models/economy";
import {EMOJIS} from "../../config";

export default async function (client: BernardClient, interaction: CommandInteraction) {

    let member = await interaction.guild!.members.fetch(interaction.user);

    let guildConfig: any = await findGuild(interaction.guild!.id);
    let memberConfig: any = await findMember(interaction.guild!.id, interaction.user!.id);
    let economyConfig: any = await findEconomy(interaction.guild!.id, interaction.user!.id);

    if (memberConfig) return interaction.replyErrorMessage(client, `**You already** have an account on the RPG :\`/connexion\``, true)

    guildConfig.stats.uui += 1;
    await editGuild(interaction.guild!.id, guildConfig);

    economyConfig.money += 500;
    await editEconomy(interaction.guild!.id, interaction.user!.id, economyConfig);

    await createMember(interaction.guild!.id, interaction.user!.id, guildConfig.stats.uui);

    return interaction.replySuccessMessage(client,
`**Welcome to the RPG of ${client.user?.username} ${member.displayName}#${member.user.discriminator}
You have just received the explanations of the RPG in private message but also +500 ${client.getEmoji(EMOJIS.money)} to begin the adventure well!**`, false)

};

export const slash = {
    data: {
        name: "start",
        description: "Allows you to start the RPG adventure.",
        category: "Roleplay",
        permissions: ["SEND_MESSAGES"],
        defaultPermission: false
    }
}