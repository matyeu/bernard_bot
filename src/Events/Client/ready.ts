import {BernardClient} from "../../Librairie";
import mongoose from "mongoose";
import {update} from '../../Models/guild';
import chalk from "chalk"

const Logger = require("../../Librairie/logger");

export default async function (client: BernardClient) {
    console.log(chalk.grey('--------------------------------'));
    Logger.client(`- Connected as "${client.user!.tag}"`);
    Logger.client(`- For ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users, for ${client.channels.cache.size} channels, for ${client.guilds.cache.size} servers discord !`);

    await mongoose.connect(process.env.DBCONNECTION!, {
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
        Logger.error(`${err}`)
    })

    mongoose.Promise = global.Promise;

    console.log(chalk.grey('--------------------------------'));

    for (let guild of client.guilds.cache.map(guild => guild)) {
        await update(guild.id);
        if (guild.id === "983056621716512910") {
            await import("../../Modules/informations").then(exports => exports.default(client, guild));
            await import("../../Modules/autorole").then(exports => exports.default(client, guild));
        };
            for (const command of client.slashCommands.map(command => command)) await guild.commands.create(command.slash.data);

    }

    client.user!.setPresence({status: "idle", activities: [{name: "Bernard | /help", type: "WATCHING"}]});
}