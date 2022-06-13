import {model, Schema} from 'mongoose';
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

let Warning = model("Warning", new Schema({
    guildID: String,
    id: Number,
    memberWarn: String,
    memberStaff: String,
    date: String,
    reason: String,
    reference: String,
}));
export const def = {
    guildID: "",
    id: 0,
    memberWarn: "",
    memberStaff: "",
    date: new Date().toLocaleString('en-US', {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }),
    reason: "",
    reference: "",
}

export async function create(guildId: Snowflake, memberId: Snowflake, id: Snowflake, by: Snowflake, reason: string) {
    let warn = new Warning(createMissingProperties(def, {guildID: guildId, memberWarn: memberId, id, memberStaff: by, reason}));
    await warn.save();
    Logger.client("Creating a warning in the database");
    return warn;
}

export async function findOne(guildId: Snowflake, memberId: Snowflake, id: Snowflake) {
    return Warning.findOne({guildID: guildId, memberWarn: memberId, id});
}

export async function find(guildId: Snowflake, memberId: Snowflake) {
    return Warning.find({guildID: guildId, memberWarn: memberId});
}

export async function findGuild(guildId: Snowflake) {
    return Warning.find({guildID: guildId});
}

export async function edit(guildId: Snowflake, memberId: Snowflake, id: Snowflake, data: object) {
    await findOne(guildId, memberId, id);
    let warn = await Warning.findOneAndUpdate({guildID: guildId, memberWarn: memberId, id}, data, {new: true});
    Logger.client("Updating a warn in the database");
    return await warn!.save();
};


export default Warning;