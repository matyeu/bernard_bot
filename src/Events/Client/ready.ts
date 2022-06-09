import {BernardClient} from "../../Librairie";
import mongoose from "mongoose";
import {find as findClient} from "../../Models/client";
import {update as updateGuild, find as findGuild} from "../../Models/guild";
import {update as updateMember} from "../../Models/members";
import {findAll as findAllBan} from "../../Models/bans";
import chalk from "chalk";
import {MessageEmbed} from "discord.js";
import {SERVER, EMBED_GENERAL} from "../../config";

const Logger = require("../../Librairie/logger");

export default async function (client: BernardClient) {
    console.log(chalk.grey('--------------------------------'));
    Logger.client(`- Connected as "${client.user!.tag}"`);
    Logger.client(`- For ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users, for ${client.channels.cache.size} channels, for ${client.guilds.cache.size} servers discord !`);

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
        Logger.client(`- Connected to the database`)
    }).catch(err => {
        Logger.error("Connection failed. Try reconnecting in 5 seconds...");
        setTimeout(() => connectDB, 5000);
        Logger.error(`${err}`)
    })

    mongoose.Promise = global.Promise;

    console.log(chalk.grey('--------------------------------'));

    await findClient(SERVER.id);

    for (let guild of client.guilds.cache.map(guild => guild)) {
        await updateGuild(guild.id);
        let guildConfig: any = await findGuild(guild.id);

        for (let member of guild.members.cache.map(member => member)) {
            if (member.user.bot) continue;
            await updateMember(guild.id, member.user.id);

            setInterval(async () => {
                let banConfigs: any = await findAllBan(guild.id)

                if (banConfigs.length < 1) return Logger.client(`Update of the bans done (0 member unban)`);

                    banConfigs.forEach(async (banConfig: any) => {
                        let timeBan = banConfig.time;
                        let dateBan = banConfig.date;

                        if (dateBan !== 0 && timeBan - (Date.now() - dateBan) <= 0) {
                            let embedMod = new MessageEmbed()
                                .setColor(EMBED_GENERAL)
                                .setAuthor({
                                    name: `${client.user?.tag}`,
                                    iconURL: client.user?.displayAvatarURL({dynamic: true})
                                })
                                .setDescription(`
**Member:** \`${member.user.tag}\` (${member.id})
**Action:** Unban
**Reason:** Automatic unban
**Reference:** [#${banConfig.case}](https://discord.com/channels/${guild.id}/${guildConfig.channels.logs.public}/${banConfig.reference})`)
                                .setTimestamp()
                                .setFooter({text: `Case ${banConfig.case}`})

                            await guild!.bans.remove(banConfig.memberBan, `Automatic unban`);
                            await client.getChannel(guild, guildConfig.channels.logs.public, {embeds: [embedMod]});
                            banConfig.delete().then(Logger.client(`Update of the ban done (${member.user.tag} unban)`));
                        }
                    })
            }, 1.8e+6);

        }

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