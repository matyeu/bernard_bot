import {Intents} from 'discord.js';
import {BernardClient} from './Librairie';

const {loadCommands, loadEvents, loadButtons, loadSelectMenus, loadModals} = require("./Librairie/loader");
const Logger = require("./Librairie/logger");
require("dotenv").config();

const client = new BernardClient({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

loadCommands(client);
loadEvents(client);
loadButtons(client);
loadSelectMenus(client);
loadModals(client);

process.on('exit', code => {
    return Logger.error(`Le processus s'est arrêté avec le code : ${code}`)
});

process.on('uncaughtException', (err, origin) => {
    return Logger.error(`UNCAUGHT_EXCEPTION : ${err}, \n\nORIGIN : ${origin} `)
});

process.on('unhandledRejection', (reason, promise) => {
    Logger.warn(`UNHANDLED_REJECTION : ${reason}\n----\n`)
    return console.log(promise);
});

process.on('warning', (...args) => {
    return Logger.warn(...args)
})

client.login(process.env.TOKEN).then(_ => '');