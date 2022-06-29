import {model, Schema} from 'mongoose';
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

let Levels = model("Levels", new Schema({
    guildID: String,
    userID: String,
    community: {
        level: Number,
        experience: Number,
    },
    roleplay: {
        level: Number,
        experience: Number,
    }
}));

export const def = {
    guildID: "",
    userID: "",
    community: {
        level: 0,
        experience: 0
    },
    roleplay: {
        level: 0,
        experience: 0
    }
};

export async function create(guildID: Snowflake, userID: Snowflake) {
    let level = new Levels(createMissingProperties(def, {guildID, userID}));
    await level.save();
    Logger.client("Creating a user level in the database");
    return level;
};

export async function find(guildID: Snowflake, userID: Snowflake) {
    let level = await Levels.findOne({guildID, userID});
    if(!level) {
        level = await create(guildID, userID);
    }
    return level;
};

export async function edit(guildID: Snowflake, userID: Snowflake, data: object) {
    await find(guildID, userID);
    let level = await Levels.findOneAndUpdate({guildID, userID}, data, {new:true});
    Logger.client("Updating a user level in the database");
    return await level!.save();
};

export async function update(guildID: Snowflake, userID: Snowflake) {
    let level = await find(guildID, userID);
    let data = createMissingProperties(def, level)
    return edit(guildID, userID, data);
};

export default Levels;