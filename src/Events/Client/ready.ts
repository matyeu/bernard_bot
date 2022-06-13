import {BernardClient, getSanction} from "../../Librairie";
import mongoose from "mongoose";
import {find as findClient} from "../../Models/client";
import {update as updateGuild} from "../../Models/guild";
import {update as updateMember} from "../../Models/members";
import chalk from "chalk";
import {SERVER} from "../../config";

const Logger = require("../../Librairie/logger");

export default async function (client: BernardClient) {
    console.log(chalk.grey('--------------------------------'));
    Logger.client(`- Connected as "${client.user!.tag}"`);
    Logger.client(`- For ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users, for ${client.channels.cache.size} channels, for ${client.guilds.cache.size} servers discord !`);

    let startTime = Date.now();
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
        let finishTime = Date.now();
        Logger.client(`- Connected to the database ${startTime - finishTime} ms`);
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

        for (let member of guild.members.cache.map(member => member)) {
            if (member.user.bot) continue;
            await updateMember(guild.id, member.user.id);

            setInterval(async () => {
                await getSanction(client, guild, member, "unban")
                await getSanction(client, guild, member, "unmute")
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