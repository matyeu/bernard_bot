import {model, Schema} from 'mongoose';
import {Snowflake} from 'discord.js';
import {createMissingProperties} from "../Librairie";
const Logger = require("../Librairie/logger");

let Guild = model("Guild", new Schema({
    guildID: String,
    channels: {
        home: String,
        rules: String,
        general: String,
    },
    roles: {
        member: String,
    },
    modules: {
        informations: Boolean,
    }
}));


export const def = {
    guildID: "",
    channels: {
        home: "",
        rules: "",
        general: "",
    },
    roles: {
        member: "",
    },
    modules: {
        informations: false,
    }
};

export async function create(id: Snowflake) {
    let guild = new Guild(createMissingProperties(def, {guildID: id}));
    await guild.save();
    Logger.client("Création d'un serveur dans la base de données");
    return guild;
}

export async function find(id: Snowflake) {
    let guild = await Guild.findOne({guildID: id});
    if (!guild) guild = await create(id);
    return guild;
}

export async function edit(id: Snowflake, data: object) {
    await find(id);
    let guild = await Guild.findOneAndUpdate({guildID: id}, data, {new: true});
    Logger.client("Mise à jour d'un serveur dans la base de données");
    return await guild!.save();
}

export async function update(id: Snowflake) {
    let guild = await find(id);
    let data = createMissingProperties(def, guild)
    return edit(id, data);
}

export default Guild;