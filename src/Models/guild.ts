import {model, Schema} from 'mongoose';
import {Snowflake} from 'discord.js';
import {createMissingProperties} from "../Librairie";
const Logger = require("../Librairie/logger");

let Guild = model("Guild", new Schema({
    guildID: String,
    category: {
        voice: String,
        support: String,
        recruiting: String,
    },
    channels: {
        logs: {
            server: String,
            support: String,
            recruiting: String,
            sanction: String,
            public: String,
            members: String,
        },
        home: String,
        rules: String,
        general: String,
        autorole: String,
        configVoice: String,
        voice: String,
        tickets: String,
        team: String,
        arrival: String,
        departure: String,
    },
    roles: {
        autorole: {
            communications: String,
            news: String,
            bot: String,
            team: String,
            partnerships: String,
            separatorCom: String,
            separatorTag: String

        },
        developer: String,
        moderator: String,
        helper: String,
        staffs: String,
        member: String,
        voice: String,
    },
    modules: {
        autorole: Boolean,
        antibot: Boolean,
        informations: Boolean,
        tickets: Boolean
    },
    stats: {
        sanctionsCase: Number
    },
    support: Number,
    recruitment: Number
}));


export const def = {
    guildID: "",
    category: {
        voice: "",
        support: "",
        recruiting: "",
    },
    channels: {
        logs: {
            server: "",
            support: "",
            recruiting: "",
            sanction: "",
            public: "",
            members: "",
        },
        home: "",
        rules: "",
        general: "",
        autorole: "",
        configVoice: "",
        voice: "",
        tickets: "",
        team: "",
        arrival: "",
        departure: "",
    },
    roles: {
        autorole: {
            communications: "",
            news: "",
            bot: "",
            team: "",
            partnerships: "",
            separatorCom: "",
            separatorTag: ""
        },
        developer: "",
        moderator: "",
        helper: "",
        staffs: "",
        member: "",
        voice: "",
    },
    modules: {
        autorole: false,
        antibot: false,
        informations: false,
        tickets: false,
    },
    stats: {
        sanctionsCase: 0
    },
    support: 0,
    recruitment: 0
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