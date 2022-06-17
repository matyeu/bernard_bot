import {model, Schema} from "mongoose";
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

let Roleplay = model("Roleplay", new Schema({
    guildID: String,
    userID: String,
    createAccount: String,
    uui: Number,
}))

export const def = {
    guildID: "",
    userID: "",
    createAccount: new Date().toLocaleString('en-US', {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        }),
    uui: 0,
}

export async function create(guildID: Snowflake, userID: Snowflake, uui: number) {
    let member = new Roleplay(createMissingProperties(def, {guildID, userID, uui}));
    await member.save();
    Logger.client("Creating a user roleplay in the database");
    return member;
}

export async function find(guildID: Snowflake, userID: Snowflake) {
    let member = await Roleplay.findOne({guildID, userID});
    if (member) return member;
    return null;
};

export async function findServer(guildID: Snowflake) {
    if (!guildID) return null;
    const members = await Roleplay.find({ guildID: guildID });
    if (members) return members;
    return null;
}

export async function edit(guildID: Snowflake, userID: Snowflake, data: object) {
    await find(guildID, userID);
    let member = await Roleplay.findOneAndUpdate({guildID, userID}, data, {new: true});
    Logger.client("Updating a user roleplay in the database");
    return await member!.save();
}


export default Roleplay;