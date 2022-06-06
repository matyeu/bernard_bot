import {model, Schema} from 'mongoose';
import {Snowflake} from 'discord.js';
import {createMissingProperties} from "../Librairie";
const Logger = require("../Librairie/logger");

let Guild = model("Guild", new Schema({
    guildID: String,
    category: {
        voice: String,
    },
    channels: {
        logs: {
            server: String,
        },
        home: String,
        rules: String,
        general: String,
        autorole: String,
        configVoice: String,
        voice: String,
    },
    roles: {
        autorole: {
            communications: String,
            news: String,
            bot: String,
            team: String,
            partnerships: String,
        },
        member: String,
        voice: String,
    },
    modules: {
        informations: Boolean,
        autorole: Boolean,
    }
}));


export const def = {
    guildID: "",
    category: {
        voice: "",
    },
    channels: {
        logs: {
            server: "",
        },
        home: "",
        rules: "",
        general: "",
        autorole: "",
        configVoice: "",
        voice: "",
    },
    roles: {
        autorole: {
            communications: "",
            news: "",
            bot: "",
            team: "",
            partnerships: "",
        },
        member: "",
        voice: "",
    },
    modules: {
        informations: false,
        autorole: false,
    }
};

export async function create(id: Snowflake) {
    let guild = new Guild(createMissingProperties(def, {guildID: id}));
    await guild.save();
    Logger.client("Creating a server in the database");
    return guild;
};

export async function find(id: Snowflake) {
    let guild = await Guild.findOne({guildID: id});
    if (!guild) guild = await create(id);
    return guild;
};

export async function edit(id: Snowflake, data: object) {
    await find(id);
    let guild = await Guild.findOneAndUpdate({guildID: id}, data, {new: true});
    Logger.client("Updating a server in the database");
    return await guild!.save();
};

export async function update(id: Snowflake) {
    let guild = await find(id);
    let data = createMissingProperties(def, guild)
    return edit(id, data);
};

export default Guild;