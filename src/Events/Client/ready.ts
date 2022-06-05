import {BernardClient} from "../../Librairie";
import mongoose from "mongoose";
import {update} from '../../Models/guild';
import chalk from "chalk"

const Logger = require("../../Librairie/logger");

export default async function (client: BernardClient) {
    console.log(chalk.grey('--------------------------------'));
    Logger.client(`- Connecté sous le nom de "${client.user!.tag}"`);
    Logger.client(`- Pour ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} utilisateurs, pour ${client.channels.cache.size} salons, pour ${client.guilds.cache.size} serveurs discord !`);

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
        Logger.client(`- Connecté à la base de données`)
    }).catch(err => {
        Logger.error(`${err}`)
    })

    mongoose.Promise = global.Promise;

    console.log(chalk.grey('--------------------------------'));

    for (let guild of client.guilds.cache.map(guild => guild)) {
        await update(guild.id);
            for (const command of client.slashCommands.map(command => command)) await guild.commands.create(command.slash.data);

    }

    client.user!.setPresence({status: "idle", activities: [{name: "Bernard | /help", type: "WATCHING"}]});
}