import {BernardClient} from "../../Librairie";
import mongoose from "mongoose";
import {find as findClient} from "../../Models/client";
import {find as findGuild, update as updateGuild} from "../../Models/guild";
import {update as updateMember} from "../../Models/members";
import {findAll as findAllBan} from "../../Models/bans";
import {findAll as findAllMute} from "../../Models/mutes";
import chalk from "chalk";
import {EMBED_GENERAL, SERVER} from "../../config";
import {MessageEmbed} from "discord.js";

const Logger = require("../../Librairie/logger");

export default async function (client: BernardClient) {
    console.log(chalk.grey('--------------------------------'));
    Logger.client(`Connected as "${client.user!.tag}"`);
    Logger.client(`For ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users, for ${client.channels.cache.size} channels, for ${client.guilds.cache.size} servers discord !`);

    const connectDB = await mongoose.connect(process.env.DBCONNECTION!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false,
        poolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
    }).then(() => {
        Logger.client(`Connected to the database`);
    }).catch(err => {
        Logger.error("Connection failed. Try reconnecting in 5 seconds...");
        setTimeout(() => connectDB, 5000);
        Logger.error(`${err}`)
    })

    mongoose.Promise = global.Promise;

    if (process.env.ENABLED === "ON") require("../../Librairie/dashboard")(client);
    console.log(chalk.grey('--------------------------------'));

    await findClient(SERVER.id);

    for (let guild of client.guilds.cache.map(guild => guild)) {
        await updateGuild(guild.id);

        for (let member of guild.members.cache.map(member => member)) {
            if (member.user.bot) continue;
            await updateMember(guild.id, member.user.id);
        }

        setInterval(async () => {
            let guildConfig: any = await findGuild(guild.id);
            let banConfigs: any = await findAllBan(guild.id);
            let muteConfigs: any = await findAllMute(guild.id);

            let embedMod = new MessageEmbed()
                .setColor(EMBED_GENERAL)
                .setAuthor({name: `${client.user?.tag}`, iconURL: client.user?.displayAvatarURL({dynamic: true})})
                .setTimestamp()
                .setFooter({text: `Case ${guildConfig.stats.sanctionsCase}`})

            banConfigs.forEach(async (banConfig: any) => {
                let timeBan = banConfig.time;
                let dateBan = banConfig.date;
                let memberBan = await guild.members.fetch(banConfig.memberBan);

                if (!memberBan && dateBan === 0 && timeBan - (Date.now() - dateBan) >= 0)
                    return Logger.client(`Update of the sanctions done (0 member unban)`)

                embedMod.setDescription(`
**Member:** \`${memberBan.user.tag}\` (${memberBan.id})
**Action:** Unban
**Reason:** Automatic unban
**Reference:** [#${banConfig.case}](https://discord.com/channels/${guild.id}/${guildConfig.channels.logs.public}/${banConfig.reference})`)

                await guild!.bans.remove(banConfig.memberBan, `Automatic unban`);
                await client.getChannel(guild, guildConfig.channels.logs.public, {embeds: [embedMod]});

                banConfig.delete().then(Logger.client(`Update of the sanction done (${memberBan.user.tag} unban)`));
            });

            muteConfigs.forEach(async (muteConfig: any) => {
                let timeMute = muteConfig.time;
                let dateMute = muteConfig.date;
                let memberMute = await guild.members.fetch(muteConfig.memberBan);

                if (!memberMute && dateMute === 0 && timeMute - (Date.now() - dateMute) >= 0)
                    return Logger.client(`Update of the sanctions done (0 member unmute)`)

                embedMod.setDescription(`
**Member:** \`${memberMute.user.tag}\` (${memberMute.id})
**Action:** Unmute
**Reason:** Automatic unmute
**Reference:** [#${muteConfig.case}](https://discord.com/channels/${guild.id}/${guildConfig.channels.logs.public}/${muteConfig.reference})`)

                await client.getChannel(guild, guildConfig.channels.logs.public, {embeds: [embedMod]});
                muteConfig.delete().then(Logger.client(`Update of the sanction done (${muteConfig.user.tag} unmute)`));
            })

        }, 1.8e+6);

        if (guild.id === SERVER.id) {
            await import("../../Modules/informations").then(exports => exports.default(client, guild));
            await import("../../Modules/autorole").then(exports => exports.default(client, guild));
            await import("../../Modules/tickets").then(exports => exports.default(client, guild));
        }
        ;
        for (const command of client.slashCommands.map(command => command)) await guild.commands.create(command.slash.data);

    }

    client.user!.setPresence({status: "idle", activities: [{name: "Bernard | /help", type: "WATCHING"}]});
}